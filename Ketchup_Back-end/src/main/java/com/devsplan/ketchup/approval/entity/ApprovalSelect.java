package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@AllArgsConstructor
@Entity(name = "AppSelect")
@Table(name = "TBL_APPROVAL")
public class ApprovalSelect {
    @Id
    @Column(name = "APPROVAL_NO")
    private int approvalNo;
    @ManyToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "FORM_NO")
    private Form form;
    @Column(name = "APP_TITLE")
    private String appTitle;
    @Column(name = "APP_CONTENTS")
    private String appContents;
    @Column(name = "APP_DATE")
    private String appDate;
    @Column(name = "APP_FINAL_DATE")
    private String appFinalDate;
    @Column(name = "APP_STATUS")
    private String appStatus;
    @Column(name = "APP_REFUSAL")
    private String refusal;
    @Column(name = "APP_SEQUENCE")
    private int sequence;
    @OneToMany
    @JoinColumn(name = "APPROVAL_NO")
    private List<AppFile> appFileList;
    @OneToMany
    @JoinColumn(name = "APPROVAL_NO")
    private List<AppLineAndMember> appLineList;
    @OneToMany
    @JoinColumn(name = "APPROVAL_NO")
    private List<RefLineAndMember> refLineList;

    protected ApprovalSelect(){}

    public ApprovalSelect approvalNo(int approvalNo){
        this.approvalNo = approvalNo;
        return this;
    }

    public ApprovalSelect member(Member member){
        this.member = member;
        return this;
    }

    public ApprovalSelect form(Form form){
        this.form = form;
        return this;
    }

    public ApprovalSelect appTitle(String appTitle){
        this.appTitle = appTitle;
        return this;
    }
    public ApprovalSelect appContents(String appContents){
        this.appContents = appContents;
        return this;
    }
    public ApprovalSelect appDate(String appDate){
        this.appDate = appDate;
        return this;
    }
    public ApprovalSelect appFinalDate(String appFinalDate){
        this.appFinalDate = appFinalDate;
        return this;
    }
    public ApprovalSelect appStatus(String appStatus){
        this.appStatus = appStatus;
        return this;
    }
    public ApprovalSelect refusal(String refusal){
        this.refusal = refusal;
        return this;
    }
    public ApprovalSelect sequence(int sequence){
        this.sequence = sequence;
        return this;
    }
    public ApprovalSelect appFileList(List<AppFile> appFileList){
        this.appFileList = appFileList;
        return this;
    }
    public ApprovalSelect appLineList(List<AppLineAndMember> appLineList){
        this.appLineList = appLineList;
        return this;
    }
    public ApprovalSelect refLineList(List<RefLineAndMember> refLineList){
        this.refLineList = refLineList;
        return this;
    }
    public ApprovalSelect build(){
        return new ApprovalSelect(approvalNo, member, form, appTitle, appContents, appDate, appFinalDate, appStatus, refusal, sequence, appFileList, appLineList, refLineList );
    }
}
