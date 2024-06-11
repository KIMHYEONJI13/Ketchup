package com.devsplan.ketchup.approval.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ApprovalDTO {
    private int approvalNo; //기안번호
    private String appMemberNo;   //기안자 사원번호
    private int formNo; //양식번호
    private String appTitle; //제목
    private String appContents; //내용
    private String appDate; //기안날짜
    private String appFinalDate; //완료날짜
    private String appStatus;  //상태 (대기, 진행, 완료, 반려, 회수)
    private String refusal; //반려 사유
    private int sequence; //결재순서

    public ApprovalDTO(String appMemberNo, int formNo, String appTitle, String appContents) {
        this.appMemberNo = appMemberNo;
        this.formNo = formNo;
        this.appTitle = appTitle;
        this.appContents = appContents;
    }
}
