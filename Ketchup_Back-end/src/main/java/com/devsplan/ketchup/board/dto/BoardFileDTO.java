package com.devsplan.ketchup.board.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class BoardFileDTO {
    private int boardNo;                // 게시물 번호
//    private String boardFileImgUrl;     // 게시물 경로
    private int boardFileNo;            // 게시물 파일 번호
    private String boardFilePath;       // 공지 파일 경로
    private String boardFileName;       // 공지 파일 이름
    private String boardFileOriName;    // 공지 원본 파일 이름
//    private String downloadLink;


//    public BoardFileDTO(int boardNo, String boardFileImgUrl) {
//        this.boardNo = boardNo;
//        this.boardFileImgUrl = boardFileImgUrl;
//    }

//    public BoardFileDTO(int boardNo, String boardFileImgUrl, int boardFileNo) {
//        this.boardNo = boardNo;
//        this.boardFileImgUrl = boardFileImgUrl;
//        this.boardFileNo = boardFileNo;
//    }
}
