package com.devsplan.ketchup.approval.service;

import com.devsplan.ketchup.approval.dto.*;
import com.devsplan.ketchup.approval.entity.*;
import com.devsplan.ketchup.approval.repository.*;
import com.devsplan.ketchup.common.Criteria;
import com.devsplan.ketchup.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final AppLineRepository appLineRepository;
    private final RefLineRepository refLineRepository;
    private final AppFileRepository appFileRepository;
    private final FormRepository formRepository;
    private final ApprovalSelectRepository approvalSelectRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public ApprovalService(ApprovalRepository approvalRepository,
                           AppLineRepository appLineRepository,
                           RefLineRepository refLineRepository,
                           AppFileRepository appFileRepository,
                           FormRepository formRepository,
                           ApprovalSelectRepository approvalSelectRepository,
                           ModelMapper modelMapper) {

        this.approvalRepository = approvalRepository;
        this.appLineRepository = appLineRepository;
        this.refLineRepository = refLineRepository;
        this.appFileRepository = appFileRepository;
        this.formRepository = formRepository;
        this.approvalSelectRepository = approvalSelectRepository;
        this.modelMapper = modelMapper;
    }

    //기안 상신
    @Transactional
    public Object insertApproval(AppInputDTO appInputDTO,
                                 List<MultipartFile> multipartFileList) {
        int result = 0;
        String newFileURL = IMAGE_DIR + "/approvals";

        ApprovalDTO approvalDTO = appInputDTO.getApproval();
        List<AppLineDTO> appLineDTOList = appInputDTO.getAppLineDTOList();
        List<RefLineDTO> refLineDTOList = appInputDTO.getRefLineDTOList();

        //기안 count + 1 => 현재 등록하려는 기안 번호 세팅
        int approvalNo = (int) approvalRepository.count() + 1;
        List<AppFileDTO> fileDTOList = new ArrayList<>();

            List<AppLine> appLineList = new ArrayList<>();
            List<RefLine> refLineList = new ArrayList<>();

            //결재선
            appLineDTOList.forEach(al -> {
                al.setApprovalNo(approvalNo);
                AppLine appLine = modelMapper.map(al, AppLine.class);
                appLineList.add(appLine);
            });

            //참조선
            refLineDTOList.forEach(rl -> {
                rl.setApprovalNo(approvalNo);
                RefLine refLine = modelMapper.map(rl, RefLine.class);
                refLineList.add(refLine);
            });

            approvalDTO.setApprovalNo(approvalNo);

            java.util.Date now = new java.util.Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String appDate = sdf.format(now);

            approvalDTO.setAppDate(appDate);    //등록일자
            approvalDTO.setAppStatus("대기");    //상태 대기
            approvalDTO.setSequence(1);         //순서 1로

            Approval approval = modelMapper.map(approvalDTO, Approval.class);

            approvalRepository.save(approval);
            appLineRepository.saveAll(appLineList);
            refLineRepository.saveAll(refLineList);

        //파일 저장
        try {
            if (multipartFileList != null && !multipartFileList.isEmpty()) {

                for (MultipartFile multipartFile : multipartFileList) {
                    String fileName = UUID.randomUUID().toString().replace("-", "");
                    String replaceFileName = null;

                    replaceFileName = FileUtils.saveFile(newFileURL, fileName, multipartFile);

                    AppFileDTO appFileDTO = new AppFileDTO(approvalNo, replaceFileName);
                    fileDTOList.add(appFileDTO);
                }
                List<AppFile> appFileList = new ArrayList<>();
                //파일
                fileDTOList.forEach(file -> {
                    AppFile appFile = modelMapper.map(file, AppFile.class);
                    appFileList.add(appFile);
                });
                appFileRepository.saveAll(appFileList);
            }

            result = 1;

        } catch (IOException e) {
            fileDTOList.forEach(file -> FileUtils.deleteFile(newFileURL, file.getFileUrl()));
            throw new RuntimeException(e);
        }

        return (result > 0) ? "성공" : "실패";
    }

    //내가 작성한 기안 조회
    @Transactional
    public Page<ApprovalSelectDTO> selectMyApproval(String memberNo, List<String> status, String searchValue, Criteria cri) {

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("approvalNo").descending());

        Page<ApprovalSelect> approvalSelectList = null;

        if(searchValue == null){
            approvalSelectList = approvalSelectRepository.findMyApproval(memberNo, status, paging);
        }else{
            approvalSelectList = approvalSelectRepository.findMyApprovalWithSearch(memberNo, status, searchValue, paging);
        }

        Page<ApprovalSelectDTO> approvalSelectDTOList = approvalSelectList.map(approval -> modelMapper.map(approval, ApprovalSelectDTO.class));

        return approvalSelectDTOList;
    }



    //받은 기안 조회
    @Transactional
    public Page<ApprovalSelectDTO> selectReceiveApp(String memberNo, List<String> status, String searchValue, Criteria cri){
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("approvalNo").descending());

        Page<ApprovalSelect> approvalSelectList = null;

        if(searchValue == null){
            approvalSelectList = approvalSelectRepository.findReceiveApp(memberNo, status, paging);
        }else{
            approvalSelectList = approvalSelectRepository.findReceiveAppWithSearch(memberNo, status, searchValue, paging);
        }
        Page<ApprovalSelectDTO> approvalSelectDTOList = approvalSelectList.map(approvalAnd ->
                        modelMapper.map(approvalAnd, ApprovalSelectDTO.class));

        return approvalSelectDTOList;
    }

    //참조선으로 등록된 기안 조회
    @Transactional
    public Page<ApprovalSelectDTO> selectRefApp(String memberNo, List<String> status, String searchValue, Criteria cri) {
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("approvalNo").descending());
        Page<ApprovalSelect> approvalSelectList = null;

        List<Integer> appNo = refLineRepository.findAppNoByMemberNo(memberNo); //사원번호로 참조선에 등록된 기안번호를 조회

        if(searchValue == null){
            approvalSelectList = approvalSelectRepository.findRefApp(status, appNo, paging);
        }else{
            approvalSelectList = approvalSelectRepository.findRefAppWithSearch(status, searchValue, appNo, paging);
        }

        Page<ApprovalSelectDTO> approvalSelectDTOList = approvalSelectList.map(approvalAnd ->
                        modelMapper.map(approvalAnd, ApprovalSelectDTO.class));

        return approvalSelectDTOList;
    }


    //기안 상세 조회
    @Transactional
    public ApprovalSelectDTO selectApproval(int appNo) {
        ApprovalSelect approvalSelect = approvalSelectRepository.findById(appNo).get();
        ApprovalSelectDTO approvalSelectDTO = modelMapper.map(approvalSelect, ApprovalSelectDTO.class);

        return approvalSelectDTO;
    }

    //기안 회수
    @Transactional
    public String updateApproval(int approvalNo) {
        int result = 0;

        Approval approval = approvalRepository.findById(approvalNo).get();

        if(approval.getAppStatus().equals("대기")){
            approval = approval.appStatus("회수").build();
            result = 1;
        }
        return (result > 0) ? "성공" : "실패";
    }

    //기안 처리 (결재, 반려)
    @Transactional
    public String updateApproval2(AppUpdateDTO appUpdateDTO, String memberNo, int approvalNo){
        int result = 0;
        Approval approval = approvalRepository.findById(approvalNo).get();
        AppLine appLine = appLineRepository.findByMemberNoAndApprovalNo(memberNo, approvalNo);

        java.util.Date now = new java.util.Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String appDate = sdf.format(now);

        switch(appUpdateDTO.getAction()){
            case "결재" :
                int count = appLineRepository.countSequence(approvalNo);
                if(appLine.getAlSequence() == count){
                    approval.appStatus("완료").appFinalDate(appDate).build();
                    appLine = appLine.alDate(appDate).build();
                    result = 1;
                }else{
                    approval.appStatus("진행").appFinalDate(appDate).sequence(approval.getSequence() + 1).build();
                    appLine = appLine.alDate(appDate).build();
                    result = 1;
                }
                break;
            case "반려" :
                approval = approval.appStatus("반려").appFinalDate(appDate).refusal(appUpdateDTO.getRefusal()).build();
                appLine = appLine.alDate(appDate).build();
                result = 1;
                break;
            case "전결" :
                approval = approval.appStatus("완료").appFinalDate(appDate).build();
                appLine = appLine.alDate(appDate).build();
                result = 1;
                break;
            default :
                break;
        }

        return (result > 0) ? "성공" : "실패";
    }


    //양식 선택 조회
    public FormDTO selectForm(int formNo) {
        Form form = formRepository.findById(formNo).get();
        FormDTO formDTO = modelMapper.map(form, FormDTO.class);

        return formDTO;
    }

    //카테고리별 기안 개수 조회
    public Object selectApprovalCount(String memberNo) {
        int myApp = 0;
        int doneApp = 0;
        int receiveApp = 0;
        int refApp = 0;

        List<String> status1 = Arrays.asList("대기", "진행");
        List<String> status2 = Arrays.asList("완료", "회수", "반려");
        List<String> status3 = Arrays.asList("대기", "진행");
        String status4 = "완료";

        myApp = approvalRepository.countApprovalByMemberNoAndAppStatusIn(memberNo, status1);
        doneApp = approvalRepository.countApprovalByMemberNoAndAppStatusIn(memberNo, status2);
        receiveApp = approvalRepository.countReceiveAppByMemberNoAndStatusIn(memberNo, status3);
        refApp = approvalRepository.countRefAppByMemberNoAndAppStatusIn(memberNo, status4);

        ApprovalCountDTO approvalCountDTO = new ApprovalCountDTO(myApp, doneApp, receiveApp, refApp);

        return approvalCountDTO;
    }
}
