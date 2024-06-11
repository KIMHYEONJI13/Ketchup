package com.devsplan.ketchup.mail.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.sql.Timestamp;

@Entity
@Table(name = "tbl_receiver")
@Getter
@ToString
public class Receiver {
    @Id
    @Column(name = "RECEIVER_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int receiverNo;

    @Column(name = "MAIL_NO")
    private int mailNo;

    @Column(name = "RECEIVER_MEM", nullable = false)
    private String receiverMem;

    @Column(name = "READ_TIME")
    private Timestamp readTime;

    @Column(name = "RECEIVER_DEL_STATUS", nullable = false)
    private char receiverDelStatus;

    protected Receiver() {}

    public Receiver mailNo(int val) {
        this.mailNo = val;
        return this;
    }

    public Receiver readTime(Timestamp val) {
        this.readTime = val;
        return this;
    }

    public Receiver receiverDelStatus(char val) {
        this.receiverDelStatus = val;
        return this;
    }

    public Receiver(int mailNo, String receiverMem, char receiverDelStatus) {
        this.mailNo = mailNo;
        this.receiverMem = receiverMem;
        this.receiverDelStatus = receiverDelStatus;
    }
}