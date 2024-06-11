package com.devsplan.ketchup.mail.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "tbl_mail_file")
@Getter
@ToString
public class MailFile {
    @Id
    @Column(name = "MAIL_FILE_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mailFileNo;

    @Column(name = "MAIL_NO", nullable = false)
    private int mailNo;

    @Column(name = "MAIL_FILE_PATH", nullable = false)
    private String mailFilePath;

    @Column(name = "MAIL_FILE_NAME", nullable = false)
    private String mailFileName;

    @Column(name = "MAIL_FILE_ORI_NAME", nullable = false)
    private String mailFileOriName;

    protected MailFile() {}

    public MailFile(int mailNo, String mailFilePath, String mailFileName, String mailFileOriName) {
        this.mailNo = mailNo;
        this.mailFilePath = mailFilePath;
        this.mailFileName = mailFileName;
        this.mailFileOriName = mailFileOriName;
    }
}
