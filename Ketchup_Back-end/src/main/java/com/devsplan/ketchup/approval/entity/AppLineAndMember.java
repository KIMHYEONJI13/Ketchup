package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity(name = "alAndMember")
@Table(name = "TBL_APPLINE")
public class AppLineAndMember {
    @Id
    @Column(name = "APP_LINE_NO")
    private int appLineNo;
    @Column(name = "APPROVAL_NO")
    private int approvalNo; //기안 번호
    @OneToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member alMember; //사원 번호
    @Column(name = "AL_SEQUENCE")
    private int alSequence; //순서
    @Column(name = "AL_TYPE")
    private String alType; //구분 (일반, 전결)
    @Column(name = "AL_DATE")
    private String alDate; //결재일자

    protected AppLineAndMember(){}

}
