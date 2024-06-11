package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity
@Table(name = "TBL_APPFILE")
public class AppFile {
    @Id
    @Column(name = "APPFILE_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appFileNo;
    @Column(name = "APPROVAL_NO", nullable = false)
    private int approvalNo;
    @Column(name = "APPFILE_URL", nullable = false)
    private String fileUrl;

    protected AppFile(){}

    public AppFile appFileNo(int appFileNo){
        this.appFileNo = appFileNo;
        return this;
    }
    public AppFile approvalNo(int approvalNo){
        this.approvalNo = approvalNo;
        return this;
    }
    public AppFile fileUrl(String fileUrl){
        this.fileUrl = fileUrl;
        return this;
    }

    public AppFile build(){
        return new AppFile(appFileNo, approvalNo, fileUrl);
    }
}
