package com.devsplan.ketchup.board.dto;


import com.devsplan.ketchup.comment.dto.CommentDTO;
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
public class BoardDTO {

    private int boardNo;                        // 게시물 번호
    private String memberNo;                    // 사번
    private int departmentNo;                   // 부서번호
    private String boardTitle;                  // 게시물 제목
    private String boardContent;                // 게시물 내용
    private Timestamp boardCreateDttm;          // 게시글 등록일시
    private Timestamp boardUpdateDttm;          // 게시글 수정일시
    private List<BoardFileDTO> boardFileList;   // 공지 파일
    private List<CommentDTO> comments;          // 댓글 리스트


    public void setBoardCreateDttm(Timestamp timestamp) {
        this.boardCreateDttm = timestamp;
    }

    public void setBoardUpdateDttm(Timestamp timestamp) {
        this.boardUpdateDttm = timestamp;
    }


}
