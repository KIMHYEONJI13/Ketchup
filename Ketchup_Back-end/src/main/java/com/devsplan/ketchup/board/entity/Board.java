package com.devsplan.ketchup.board.entity;

import com.devsplan.ketchup.comment.entity.Comment;
import jakarta.persistence.*;
import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_board")
@Builder(toBuilder = true)
public class Board {

    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNo;

    @Column(name = "board_title", nullable = false,  length = 150)
    private String boardTitle;

    @Column(name = "board_content", nullable = false)
    private String boardContent;

    @Column(name = "member_no")
    private String memberNo;

    @Column(name = "department_no")
    private int departmentNo;

    @Column(name = "board_create_dttm", nullable = false)
    @CreatedDate
    private Timestamp boardCreateDttm;

    @Column(name = "board_update_dttm")
    @LastModifiedDate
    private Timestamp boardUpdateDttm;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public Board boardTitle(String val) {
        this.boardTitle = val;
        return this;
    }

    public Board boardContent(String val) {
        this.boardContent = val;
        return this;
    }

    public Board boardCreateDttm(Timestamp val) {
        this.boardCreateDttm = val;
        return this;
    }

    public Board boardUpdateDttm(Timestamp val) {
        this.boardUpdateDttm = val;
        return this;
    }

    public Board(int boardNo, String boardTitle, String boardContent, String memberNo, int departmentNo, Timestamp boardCreateDttm, Timestamp boardUpdateDttm, List<Comment> comments) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.memberNo = memberNo;
        this.departmentNo = departmentNo;
        this.boardCreateDttm = boardCreateDttm;
        this.boardUpdateDttm = boardUpdateDttm;
        this.comments = comments;
    }

    public Board(int boardNo, String boardTitle, String boardContent, String memberNo, int departmentNo, Timestamp boardCreateDttm, Timestamp boardUpdateDttm) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.memberNo = memberNo;
        this.departmentNo = departmentNo;
        this.boardCreateDttm = boardCreateDttm;
        this.boardUpdateDttm = boardUpdateDttm;
    }

    protected Board() {}

    public int getBoardNo() {
        return boardNo;
    }

    public String getBoardTitle() {
        return boardTitle;
    }

    public String getBoardContent() {
        return boardContent;
    }

    public Timestamp getBoardCreateDttm() {
        return boardCreateDttm;
    }

    public String getMemberNo() {
        return memberNo;
    }

    public int getDepartmentNo() {
        return departmentNo;
    }

    public Timestamp getBoardUpdateDttm() {
        return boardUpdateDttm;
    }

    @Override
    public String toString() {
        return "Board{" +
                "boardNo=" + boardNo +
                ", boardTitle='" + boardTitle + '\'' +
                ", boardContent='" + boardContent + '\'' +
                ", memberNo=" + memberNo +
                ", departmentNo=" + departmentNo +
                ", boardCreateDttm=" + boardCreateDttm +
                ", boardUpdateDttm=" + boardUpdateDttm +
                '}';
    }
}
