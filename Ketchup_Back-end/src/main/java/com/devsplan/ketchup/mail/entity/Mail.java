package com.devsplan.ketchup.mail.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tbl_mail")
@Getter
@ToString
public class Mail {
    @Id
    @Column(name = "MAIL_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mailNo;

    @Column(name = "SENDER_MEM", length = 50, nullable = false)
    private String senderMem;

    @Column(name = "MAIL_TITLE", length = 200, nullable = false)
    private String mailTitle;

    @Column(name = "MAIL_CONTENT", length = 3000, nullable = false)
    private String mailContent;

    @CreationTimestamp
    @Column(name = "SEND_MAIL_TIME", nullable = false)
    private Timestamp sendMailTime;

    @Column(name = "SEND_CANCEL_STATUS", nullable = false)
    private char sendCancelStatus;

    @Column(name = "SEND_DEL_STATUS", nullable = false)
    private char sendDelStatus;

    @Column(name = "REPLY_MAIL_NO")
    private int replyMailNo;
    
    protected Mail() {}

    public Mail mailNo(int val) {
        this.mailNo = val;
        return this;
    }
    
    public Mail sendCancelStatus(char val) {
        this.sendCancelStatus = val;
        return this;
    } 
    
    public Mail sendDelStatus(char val) {
        this.sendDelStatus = val;
        return this;
    }

    public Mail(String senderMem, String mailTitle, String mailContent, char sendCancelStatus, char sendDelStatus) {
        this.senderMem = senderMem;
        this.mailTitle = mailTitle;
        this.mailContent = mailContent;
        this.sendCancelStatus = sendCancelStatus;
        this.sendDelStatus = sendDelStatus;
    }

    public Mail(String senderMem, String mailTitle, String mailContent, char sendCancelStatus, char sendDelStatus, int replyMailNo) {
        this.senderMem = senderMem;
        this.mailTitle = mailTitle;
        this.mailContent = mailContent;
        this.sendCancelStatus = sendCancelStatus;
        this.sendDelStatus = sendDelStatus;
        this.replyMailNo = replyMailNo;
    }
}