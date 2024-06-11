package com.devsplan.ketchup.approval.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ApprovalCountDTO {

    private int myApp;
    private int doneApp;
    private int receiveApp;
    private int refApp;
}
