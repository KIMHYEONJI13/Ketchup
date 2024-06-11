package com.devsplan.ketchup.approval.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FormDTO {
    private int formNo;             //양식번호
    private String formName;        //양식이름
    private String formContents;    //양식내용
}
