package com.devsplan.ketchup.notice.dto;

import com.devsplan.ketchup.board.dto.BoardFileDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class NoticeDTO {

    private int noticeNo;                        // 공지 번호
    private String memberNo;                     // 사번
    private char noticeFix;                      // 고정 공지
    private String noticeTitle;                  // 공지 제목
    private String noticeContent;                // 공지 내용
    private Timestamp noticeCreateDttm;          // 공지 등록일시
    private Timestamp noticeUpdateDttm;          // 공지 수정일시
//    private String noticeImgUrl;               // 공지 파일 경로
    private List<NoticeFileDTO> noticeFileList;  // 공지 파일

    public NoticeDTO(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, Timestamp noticeCreateDttm, List<NoticeFileDTO> noticeFileList) {
        this.noticeNo = noticeNo;
        this.memberNo = memberNo;
        this.noticeFix = noticeFix;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeCreateDttm = noticeCreateDttm;
        this.noticeFileList = noticeFileList;
    }

    public NoticeDTO(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, List<NoticeFileDTO> noticeFileList) {
        this.noticeNo = noticeNo;
        this.memberNo = memberNo;
        this.noticeFix = noticeFix;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeFileList = noticeFileList;
    }
//    public NoticeDTO(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, Timestamp noticeCreateDttm, String noticeImgUrl) {
//        this.noticeNo = noticeNo;
//        this.memberNo = memberNo;
//        this.noticeFix = noticeFix;
//        this.noticeTitle = noticeTitle;
//        this.noticeContent = noticeContent;
//        this.noticeCreateDttm = noticeCreateDttm;
//        this.noticeImgUrl = noticeImgUrl;
//    }

//    public NoticeDTO(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, String noticeImgUrl) {
//        this.noticeNo = noticeNo;
//        this.memberNo = memberNo;
//        this.noticeFix = noticeFix;
//        this.noticeTitle = noticeTitle;
//        this.noticeContent = noticeContent;
//        this.noticeImgUrl = noticeImgUrl;
//    }

    public NoticeDTO(int noticeNo, String memberNo, char noticeFix, String noticeTitle, String noticeContent, Timestamp noticeCreateDttm) {
        this.noticeNo = noticeNo;
        this.memberNo = memberNo;
        this.noticeFix = noticeFix;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeCreateDttm = noticeCreateDttm;
    }
}
