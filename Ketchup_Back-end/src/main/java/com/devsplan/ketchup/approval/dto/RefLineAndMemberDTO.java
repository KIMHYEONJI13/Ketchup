package com.devsplan.ketchup.approval.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RefLineAndMemberDTO {
    private int approvalNo;     //기안번호
    private MemberDTO refMember;    //참조자 사원번호
}
