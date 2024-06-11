package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity
@Table(name = "TBL_APPROVAL")
public class Approval {

    @Id
    @Column(name = "APPROVAL_NO", nullable = false, unique = true)
    private int approvalNo;
    @Column(name = "MEMBER_NO")
    private String memberNo;
    @Column(name = "FORM_NO", nullable = false)
    private int formNo;
    @Column(name = "APP_TITLE", nullable = false)
    private String appTitle;
    @Column(name = "APP_CONTENTS",columnDefinition = "LONGTEXT", nullable = false)
    private String appContents;
    @Column(name = "APP_DATE", nullable = false)
    private String appDate;
    @Column(name = "APP_FINAL_DATE")
    private String appFinalDate;
    @Column(name = "APP_STATUS", nullable = false)
    private String appStatus;
    @Column(name = "APP_REFUSAL")
    private String refusal;
    @Column(name = "APP_SEQUENCE")
    private int sequence;

    //대기 진행 회수 반려 완료

    protected Approval(){}

    public Approval approvalNo(int approvalNo){
        this.approvalNo = approvalNo;
        return this;
    }

    public Approval memberNo(String memberNo){
        this.memberNo = memberNo;
        return this;
    }

    public Approval formNo(int formNo){
        this.formNo = formNo;
        return this;
    }

    public Approval appTitle(String appTitle){
        this.appTitle = appTitle;
        return this;
    }

    public Approval appContents(String appContents){
        this.appContents = appContents;
        return this;
    }

    public Approval appDate(String appDate){
        this.appDate = appDate;
        return this;
    }

    public Approval appFinalDate(String appFinalDate){
        this.appFinalDate = appFinalDate;
        return this;
    }

    public Approval appStatus(String appStatus){
        this.appStatus = appStatus;
        return this;
    }
    public Approval refusal(String refusal){
        this.refusal = refusal;
        return this;
    }

    public Approval sequence(int sequence){
        this.sequence = sequence;
        return this;
    }

    public Approval build(){
        return new Approval(approvalNo, memberNo, formNo, appTitle, appContents, appDate, appFinalDate, appStatus, refusal, sequence);
    }


}
