package com.devsplan.ketchup.approval;

import com.devsplan.ketchup.approval.dto.*;

import com.devsplan.ketchup.approval.service.ApprovalService;
import com.devsplan.ketchup.common.Criteria;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class ApprovalServiceTests {
    @Autowired
    private ApprovalService service;
    private static final Logger logger = LoggerFactory.getLogger(ApprovalServiceTests.class);

    @DisplayName("기안 상신")
    @Test
    public void insertApprovalTest(){
        //given
        ApprovalDTO approvalDTO = new ApprovalDTO("1", 1, "제목", "내용");
        AppLineDTO appLineDTO = new AppLineDTO("2", 1, "일반");
        AppLineDTO appLineDTO2 = new AppLineDTO("4", 2, "전결");
        RefLineDTO refLineDTO = new RefLineDTO("3");

        List<AppLineDTO> appLineDTOList = new ArrayList<>();
        appLineDTOList.add(appLineDTO);
        appLineDTOList.add(appLineDTO2);

        List<RefLineDTO> refLineDTOList = new ArrayList<>();
        refLineDTOList.add(refLineDTO);

        List<MultipartFile> appFileList = new ArrayList<>();
        MockMultipartFile multipartFile = new MockMultipartFile("image", "image.png", MediaType.IMAGE_PNG_VALUE, "image".getBytes());
        appFileList.add(multipartFile);

        AppInputDTO appInputDTO = new AppInputDTO(approvalDTO, appLineDTOList, refLineDTOList);

        //when
        String result = (String) service.insertApproval(appInputDTO, appFileList);

        //then
        Assertions.assertEquals(result, "성공");

    }


    @DisplayName("내 기안 목록조회")
    @Test
    public void selectMyApprovalTest(){
        //given
        String memberNo = "4";
        String status1 = "대기";
        String status2 = "진행";
        String searchValue = "제목";

        List<String> status = new ArrayList<>();
        status.add(status1);
        status.add(status2);

        Criteria cri = new Criteria(Integer.valueOf(1), 10);

        //when
        Page<ApprovalSelectDTO> approvalSelectDTOList = service.selectMyApproval(memberNo, status, searchValue, cri);

        //then
        Assertions.assertNotNull(approvalSelectDTOList);
    }

    @DisplayName("결재대기중인 기안 목록조회")
    @Test
    public void selectReceiveAppTest(){
        //given
        String memberNo = "2";
        String status1 = "대기";
        String status2 = "진행";
        String searchValue = "제";

        List<String> status = new ArrayList<>();
        status.add(status1);
        status.add(status2);

        Criteria cri = new Criteria(Integer.valueOf(1), 10);

        //then
        Page<ApprovalSelectDTO> approvalSelectDTOList = service.selectReceiveApp(memberNo, status, searchValue, cri);
        logger.info(approvalSelectDTOList.toString());

        //when
        Assertions.assertNotNull(approvalSelectDTOList);
    }

    @DisplayName("참조자 기안 목록조회")
    @Test
    public void selectRefAppTest(){
        //given
        String memberNo = "2";
        String status1 = "대기";
        String searchValue = "제";

        List<String> status = new ArrayList<>();
        status.add(status1);

        Criteria cri = new Criteria(Integer.valueOf(1), 10);

        //then
        Page<ApprovalSelectDTO> approvalSelectDTOList = service.selectRefApp(memberNo, status, searchValue, cri);
        logger.info(approvalSelectDTOList.toString());

        //when
        Assertions.assertNotNull(approvalSelectDTOList);
    }

    @DisplayName("기안상세 조회")
    @Test
    public void selectApproval(){
        int appNo = 1;
        ApprovalSelectDTO approvalSelectDTO = service.selectApproval(appNo);
        Assertions.assertTrue(approvalSelectDTO.getApprovalNo() == 1);
    }

    @DisplayName("기안 회수")
    @Test
    public void updateApproval() {
        int appNo = 1;
        String action = "회수";

        AppUpdateDTO appUpdateDTO = new AppUpdateDTO();
        appUpdateDTO.setAction(action);

        String result = service.updateApproval(appNo);

        Assertions.assertTrue(result == "성공");
    }

    @DisplayName("기안 처리")
    @Test
    public void updateApprovaltest(){
        int appNo = 2;
        String action = "반려";
        String memberNo = "4";
        String refusal = "그냥";

        AppUpdateDTO appUpdateDTO = new AppUpdateDTO(action, refusal);

        String result = service.updateApproval2(appUpdateDTO, memberNo, appNo);

        Assertions.assertTrue(result == "성공");
    }

    @DisplayName("양식 조회")
    @Test
    public void selectFormTest(){
        int formNo = 1;

        Assertions.assertNotNull(service.selectForm(formNo));
    }

    @DisplayName("기안개수 조회")
    @Test
    public void selectApprovalCount(){
        String memberNo = "3";
        Assertions.assertNotNull(service.selectApprovalCount(memberNo));
    }





}
