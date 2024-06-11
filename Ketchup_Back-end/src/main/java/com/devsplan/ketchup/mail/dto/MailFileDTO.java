package com.devsplan.ketchup.mail.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class MailFileDTO {
    private int mailFileNo;             // 메일 파일 번호
    private int mailNo;                 // 메일 번호
    private String mailFilePath;        // 메일 파일 경로
    private String mailFileName;        // 메일 파일 이름
    private String mailFileOriName;     // 메일 원본 파일 이름

    public MailFileDTO(int mailNo, String mailFilePath, String mailFileName, String mailFileOriName) {
        this.mailNo = mailNo;
        this.mailFilePath = mailFilePath;
        this.mailFileName = mailFileName;
        this.mailFileOriName = mailFileOriName;
    }
}
