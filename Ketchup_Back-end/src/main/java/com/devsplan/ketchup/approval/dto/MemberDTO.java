package com.devsplan.ketchup.approval.dto;

import com.devsplan.ketchup.member.dto.DepDTO;
import com.devsplan.ketchup.member.dto.PositionDTO;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MemberDTO {
    private String memberNo;
    private String memberName;
    private DepDTO department;
    private PositionDTO position;
}
