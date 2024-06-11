package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity
@Table(name = "TBL_APPLINE")
public class AppLine {
    @Id
    @Column(name = "APP_LINE_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appLineNo;
    @Column(name = "APPROVAL_NO", nullable = false)
    private int approvalNo; //기안 번호
    @Column(name = "MEMBER_NO", nullable = false)
    private String memberNo; //사원 번호
    @Column(name = "AL_SEQUENCE", nullable = false)
    private int alSequence; //순서
    @Column(name = "AL_TYPE", nullable = false)
    private String alType; //구분 (일반, 전결)
    @Column(name = "AL_DATE")
    private String alDate; //결재일자

    protected AppLine(){}

    public AppLine appLineNo(int appLineNo){
        this.appLineNo = appLineNo;
        return this;
    }

    public AppLine approvalNo(int approvalNo){
        this.approvalNo = approvalNo;
        return this;
    }

    public AppLine memberNo(String memberNo){
        this.memberNo = memberNo;
        return this;
    }

    public AppLine alSequence(int alSequence){
        this.alSequence = alSequence;
        return this;
    }

    public AppLine alType(String alType){
        this.alType = alType;
        return this;
    }

    public AppLine alDate(String alDate){
        this.alDate = alDate;
        return this;
    }
    public AppLine build(){
        return new AppLine(appLineNo, approvalNo, memberNo, alSequence, alType, alDate);
    }
}
