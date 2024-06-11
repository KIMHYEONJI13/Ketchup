package com.devsplan.ketchup.approval.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AppLineDTO {
    private int appLineNo;         //결재선 번호
    private int approvalNo;        //기안번호
    private String alMemberNo;       //결재자 사원번호
    private int alSequence;       //순서
    private String alType;        //구분(전결 or 일반)
    private String alDate;        //결재일시

    public AppLineDTO(String alMemberNo, int alSequence, String alType) {
        this.alMemberNo = alMemberNo;
        this.alSequence = alSequence;
        this.alType = alType;
    }
}
