package com.devsplan.ketchup.notice.entity;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "tbl_notice_file")
@Builder(toBuilder = true)
public class NoticeFile {

    @Id
    @Column(name = "notice_file_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeFileNo;                // 공지 파일 번호

    @Column(name = "notice_no", nullable = false)
    private int noticeNo;            // 공지 번호

    @Column(name = "notice_file_path", nullable = false)
    private String noticeFilePath;        // 공지 파일 경로

    @Column(name = "notice_file_name", nullable = false)
    private String noticeFileName;        // 공지 파일 이름

    @Column(name = "notice_file_ori_name", nullable = false)
    private String noticeFileOriName;     // 공지 원본 파일 이름

    protected NoticeFile(){}

    public NoticeFile(int noticeFileNo, int noticeNo, String noticeFilePath, String noticeFileName, String noticeFileOriName) {
        this.noticeFileNo = noticeFileNo;
        this.noticeNo = noticeNo;
        this.noticeFilePath = noticeFilePath;
        this.noticeFileName = noticeFileName;
        this.noticeFileOriName = noticeFileOriName;
    }

    public NoticeFile noticeNo(int val) {
        this.noticeNo = val;
        return this;
    }

    public String getNoticeFileName() {
        return noticeFileName;
    }

    public String getNoticeFilePath() {
        return noticeFilePath;
    }
}
