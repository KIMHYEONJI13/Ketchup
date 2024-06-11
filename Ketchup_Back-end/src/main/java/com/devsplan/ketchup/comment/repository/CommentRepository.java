package com.devsplan.ketchup.comment.repository;

import com.devsplan.ketchup.board.entity.Board;
import com.devsplan.ketchup.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBoard(Board board);
    Comment findByBoardBoardNoAndCommentNo(int boardNo, int commentNo);
}
