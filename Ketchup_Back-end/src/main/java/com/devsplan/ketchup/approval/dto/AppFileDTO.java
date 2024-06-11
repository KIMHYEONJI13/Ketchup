package com.devsplan.ketchup.approval.dto;

import com.devsplan.ketchup.approval.entity.AppFile;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AppFileDTO {
    private int appFileNo;
    private int approvalNo;
    private String fileUrl;

    public AppFileDTO(int approvalNo, String fileUrl){
        this.approvalNo = approvalNo;
        this.fileUrl = fileUrl;
    }

}
