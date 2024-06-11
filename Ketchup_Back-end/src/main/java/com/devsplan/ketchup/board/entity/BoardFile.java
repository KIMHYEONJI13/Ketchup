package com.devsplan.ketchup.board.entity;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "tbl_board_file")
@Builder(toBuilder = true)
public class BoardFile {

    @Id
    @Column(name = "board_file_No")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardFileNo;             // 게시물 파일 번호

    @Column(name = "board_no", nullable = false)
    private int boardNo;                 // 게시물 번호

    @Column(name = "board_file_path", nullable = false)
    private String boardFilePath;        // 게시물 파일 경로

    @Column(name = "board_file_name", nullable = false)
    private String boardFileName;        // 게시물 파일 이름

    @Column(name = "board_file_ori_name", nullable = false)
    private String boardFileOriName;     // 게시물 원본 파일 이름

    protected BoardFile() {}

    public BoardFile(int boardFileNo, int boardNo, String boardFilePath, String boardFileName, String boardFileOriName) {
        this.boardFileNo = boardFileNo;
        this.boardNo = boardNo;
        this.boardFilePath = boardFilePath;
        this.boardFileName = boardFileName;
        this.boardFileOriName = boardFileOriName;
    }

    public BoardFile boardFileNo(int val) {
        this.boardFileNo = val;
        return this;
    }

    public BoardFile boardNo(int val) {
        this.boardNo = val;
        return this;
    }

    public String getBoardFileName() {
        return boardFileName;
    }

    public String getBoardFilePath() {
        return boardFilePath;
    }
}
