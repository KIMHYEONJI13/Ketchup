package com.devsplan.ketchup.approval.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RefLineDTO {
    private int approvalNo;     //기안번호
    private String refMemberNo;    //참조자 사원번호

    public RefLineDTO(String refMemberNo) {
        this.refMemberNo = refMemberNo;
    }
}
