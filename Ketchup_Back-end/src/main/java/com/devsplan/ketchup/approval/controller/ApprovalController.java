package com.devsplan.ketchup.approval.controller;

import com.devsplan.ketchup.approval.dto.*;
import com.devsplan.ketchup.approval.service.ApprovalService;
import com.devsplan.ketchup.common.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.devsplan.ketchup.util.TokenUtils.decryptToken;

@RestController
@RequestMapping
@Slf4j
public class ApprovalController {

    private final ApprovalService approvalService;

    @Autowired
    public ApprovalController(ApprovalService approvalService){
        this.approvalService = approvalService;
    }

    //기안 등록
    @PostMapping("/approvals")
    public ResponseEntity<ResponseDTO> insertApproval(@ModelAttribute AppInputDTO appInputDTO,
                                                      List<MultipartFile> multipartFileList){
        if (multipartFileList == null) {
            multipartFileList = Collections.emptyList();
        }

        if (appInputDTO.getRefLineDTOList() == null){
            appInputDTO.setRefLineDTOList(Collections.emptyList());
        }

        return ResponseEntity.ok().body(
                new ResponseDTO(HttpStatus.OK, "기안상신 완료",
                        approvalService.insertApproval(appInputDTO, multipartFileList))
        );
    }

    //기안 상세 조회
    @GetMapping("/approvals/{approvalNo}")
    public ResponseEntity<ResponseDTO> selectApprovalDetail(@PathVariable int approvalNo){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공", approvalService.selectApproval(approvalNo)));
    }


    //기안 목록 조회
    @GetMapping("/approvals")
    public ResponseEntity<ResponseDTO> selectApprovalList(@RequestParam String memberNo,
                                                          @RequestParam(defaultValue = "1") int category,
                                                          @RequestParam(defaultValue = "전체") String status,
                                                          @RequestParam(defaultValue = "") String search,
                                                          @RequestParam(name = "page", defaultValue = "1")String offset){

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        Page<ApprovalSelectDTO> appList = null;

//        String memberNo = decryptToken(token).get("memberNo", String.class); //사원 번호

        List<String> statusList = new ArrayList<>();

        // 검색 결과
        switch (category){
            case 1:
                if(status.equals("전체")){
                    statusList.add("대기");
                    statusList.add("진행");
                }else {
                    statusList.add(status);
                }
                appList = approvalService.selectMyApproval(memberNo, statusList, search, cri);
                break;
            case 2:
                if(status.equals("전체")){
                    statusList.add("완료");
                    statusList.add("반려");
                    statusList.add("회수");
                }else {
                    statusList.add(status);
                }
                appList = approvalService.selectMyApproval(memberNo, statusList, search, cri);
                break;
            case 3:
                if(status.equals("전체")){
                    statusList.add("대기");
                    statusList.add("진행");
                }else{
                    statusList.add(status);
                }
                appList = approvalService.selectReceiveApp(memberNo, statusList, search, cri);
                break;
            case 4:
//                status = "완료";
                if(status.equals("전체")){
                    statusList.add("대기");
                    statusList.add("진행");
                    statusList.add("완료");
                    statusList.add("반려");
                }else{
                    statusList.add(status);
                }
                appList = approvalService.selectRefApp(memberNo, statusList, search, cri);
                break;
        }

        pagingResponseDTO.setData(appList);
        pagingResponseDTO.setPageInfo(new PageDTO(cri, (int) appList.getTotalElements()));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }

    //양식 조회
    @GetMapping("/forms/{formNo}")
    public ResponseEntity<ResponseDTO> selectForm(@PathVariable int formNo){

        return ResponseEntity.ok().body(
                new ResponseDTO(HttpStatus.OK, "양식조회 성공",
                        approvalService.selectForm(formNo))
        );
    }

    //기안 상태 수정
    @PutMapping("/approvals/{approvalNo}")
    public ResponseEntity<ResponseDTO> updateApprovals(@PathVariable int approvalNo,
                                                       @RequestBody AppUpdateDTO appUpdateDTO,
                                                       @RequestHeader("Authorization") String token){
        String result = "";
        String memberNo = decryptToken(token).get("memberNo", String.class); //사원 번호 받아옮

        if(appUpdateDTO.getAction().equals("회수")){
            result = approvalService.updateApproval(approvalNo);
        }else{
            result = approvalService.updateApproval2(appUpdateDTO, memberNo, approvalNo);
        }
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공", result));
    }

    //기안 카테고리 개수 조회
    @GetMapping("/approvals/count")
    public ResponseEntity<ResponseDTO> selectApprovalsCount(@RequestParam String memberNo){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공", approvalService.selectApprovalCount(memberNo)));
    }

}
