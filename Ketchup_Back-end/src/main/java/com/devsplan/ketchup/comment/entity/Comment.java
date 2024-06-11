package com.devsplan.ketchup.comment.entity;

import com.devsplan.ketchup.board.entity.Board;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_comment")
@Builder(toBuilder = true)
public class Comment {

    @Id
    @Column(name = "comment_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNo;                  //댓글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_no", nullable = false)
    private Board board;                    // 게시물 번호

    @Column(name = "member_no", nullable = false)
    private String memberNo;                //사번 (댓글 작성자)

    @Column(name = "member_name", nullable = false)
    private String memberName;              //이름

    @Column(name = "position_name", nullable = false)
    private String positionName;            //직급이름

    @Column(name = "comment_content", nullable = false)
    private String commentContent;          //댓글 내용

    @Column(name = "comment_create_dt", nullable = false)
    private Date commentCreateDt;           //생성 시간

    @Column(name = "comment_update_dt")
    private Date commentUpdateDt;           //업데이트 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_no")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies = new ArrayList<>();

    @Column(name = "delete_comment")
    private boolean deleteComment;

    protected Comment() {}

    public Comment(int commentNo, Board board, String memberNo, String memberName
                    , String positionName, String commentContent
                    , Date commentCreateDt, Date commentUpdateDt, Comment parentComment
                    , List<Comment> replies, boolean deleteComment) {
        this.commentNo = commentNo;
        this.board = board;
        this.memberNo = memberNo;
        this.memberName = memberName;
        this.positionName = positionName;
        this.commentContent = commentContent;
        this.commentCreateDt = commentCreateDt;
        this.commentUpdateDt = commentUpdateDt;
        this.parentComment = parentComment;
        this.replies = replies;
        this.deleteComment = deleteComment;
    }

    public int getCommentNo() {
        return commentNo;
    }

    public Board getBoard() {
        return board;
    }

    public Comment getParentComment() {
        return parentComment;
    }

    public String getMemberNo() {
        return memberNo;
    }


    public boolean getDeleteComment() {
        return deleteComment;
    }

    public List<Comment> getReplies() {
        return replies;
    }

    public Comment board(Board val) {
        this.board = val;
        return this;
    }

    public Comment memberName(String val) {
        this.memberName = val;
        return this;
    }

    public Comment positionName(String val) {
        this.positionName = val;
        return this;
    }

    public Comment commentContent(String val) {
        this.commentContent = val;
        return this;
    }

    public Comment parentComment(Comment val) {
        this.parentComment = val;
        return this;
    }

    public Comment commentUpdateDt(Date val) {
        this.commentUpdateDt = val;
        return this;
    }

    public Comment deleteComment(boolean val) {
        this.deleteComment = val;
        return this;
    }

    // ModelMapper에서 명시적인 매핑을 위해 추가된 메서드들
    public Integer  getBoardNo() {
        return this.board != null ? this.board.getBoardNo() : null;
    }

    public Integer getParentCommentNo() {
        if (this.parentComment != null) {
            return this.parentComment.getCommentNo();
        } else {
            // 댓글에 부모 댓글이 없는 경우 null 반환
            return null;
        }
    }
}
