package com.devsplan.ketchup.approval.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AppInputDTO {
    //기안 상신을 위해 받을 데이터
    private ApprovalDTO approval;
    private List<AppLineDTO> appLineDTOList;
    private List<RefLineDTO> refLineDTOList;
}
