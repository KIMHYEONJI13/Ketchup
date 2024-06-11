package com.devsplan.ketchup.approval.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AppLineAndMemberDTO {
    private int appLineNo;         //결재선 번호
    private int approvalNo;        //기안번호
    private MemberDTO alMember;   //결재자
    private int alSequence;       //순서
    private String alType;        //구분(전결 or 일반)
    private String alDate;        //결재일시

}
