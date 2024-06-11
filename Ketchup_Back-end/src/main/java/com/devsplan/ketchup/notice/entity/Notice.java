package com.devsplan.ketchup.notice.entity;

import jakarta.persistence.*;
import lombok.Builder;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_notice")
@Builder(toBuilder = true)
public class Notice {

    @Id
    @Column(name = "notice_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeNo;                        // 공지 번호

    @Column(name = "member_no", nullable = false)
    private String memberNo;                     // 사번

    @Column(name = "notice_fix")
    private char noticeFix;                      // 고정 공지

    @Column(name = "notice_title", nullable = false)
    private String noticeTitle;                  // 공지 제목

    @Column(name = "notice_content", nullable = false)
    private String noticeContent;                // 공지 내용

    @Column(name = "notice_create_dttm", nullable = false)
    private Timestamp noticeCreateDttm;          // 공지 등록일시

    @Column(name = "notice_update_dttm")
    private Timestamp noticeUpdateDttm;          // 공지 수정일시

//    @Column(name = "notice_imgurl")
//    private String noticeImgUrl;               // 공지 파일 경로

    protected Notice() {}

    public Notice noticeFix(char val) {
        this.noticeFix = val;
        return this;
    }

    public Notice noticeTitle(String val) {
        this.noticeTitle = val;
        return this;
    }

    public Notice noticeContent(String val) {
        this.noticeContent = val;
        return this;
    }

    public Notice noticeCreateDttm(Timestamp val) {
        this.noticeCreateDttm = val;
        return this;
    }

    public Notice noticeUpdateDttm(Timestamp val) {
        this.noticeUpdateDttm = val;
        return this;
    }

//    public Notice noticeImgUrl(String val) {
//        this.noticeImgUrl = val;
//        return this;
//    }

    public Notice(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, Timestamp noticeCreateDttm, Timestamp noticeUpdateDttm/*, String noticeImgUrl*/) {
        this.noticeNo = noticeNo;
        this.memberNo = memberNo;
        this.noticeFix = noticeFix;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeCreateDttm = noticeCreateDttm;
        this.noticeUpdateDttm = noticeUpdateDttm;
//        this.noticeImgUrl = noticeImgUrl;
    }

    public int getNoticeNo() {
        return noticeNo;
    }

    public String getMemberNo() {
        return memberNo;
    }

    public char getNoticeFix() {
        return noticeFix;
    }

    public String getNoticeTitle() {
        return noticeTitle;
    }
}
