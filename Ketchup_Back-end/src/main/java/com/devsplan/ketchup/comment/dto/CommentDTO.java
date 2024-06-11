package com.devsplan.ketchup.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class CommentDTO {

    private int commentNo;                  //댓글 번호
    private int boardNo;                    //게시물번호
    private String memberNo;                //사번 (댓글 작성자)
    private String memberName;              //이름
    private String positionName;            //직급이름
    private String commentContent;          //댓글 내용
    private Date commentCreateDt;           //생성 시간
    private Date commentUpdateDt;           //업데이트 시간
    private Integer parentCommentNo;        // 부모 댓글 번호 (null이면 최상위 댓글)
    private String parentMemberNo;          // 부모 댓글의 작성자 사번
    private List<CommentDTO> replies;       // 답글 리스트
    private boolean deleteComment;          // 댓글 삭제 여부

    public void setCommentCreateDt(Date commentCreateDt) {
        this.commentCreateDt = commentCreateDt;
    }

    public void setCommentUpdateDt(Date commentUpdateDt) {
        this.commentUpdateDt = commentUpdateDt;
    }
}
