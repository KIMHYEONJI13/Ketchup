package com.devsplan.ketchup.notice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class NoticeFileDTO {

    private int noticeNo;                // 공지 번호
    private int noticeFileNo;            // 공지 파일 번호
    private String noticeFilePath;        // 공지 파일 경로
    private String noticeFileName;        // 공지 파일 이름
    private String noticeFileOriName;     // 공지 원본 파일 이름

}
