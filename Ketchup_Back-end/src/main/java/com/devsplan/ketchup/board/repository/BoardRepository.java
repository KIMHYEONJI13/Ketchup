package com.devsplan.ketchup.board.repository;

import com.devsplan.ketchup.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface BoardRepository extends JpaRepository <Board, Integer> {
    Page<Board> findByDepartmentNo(int departmentNo, Pageable pageable);
    Page<Board> findByDepartmentNoAndBoardTitleContainingIgnoreCase(int departmentNo, Pageable paging, String title);
    Board findTopByDepartmentNoAndBoardNoLessThanOrderByBoardNoDesc(int departmentNo, int boardNo);
    Board findTopByDepartmentNoAndBoardNoGreaterThanOrderByBoardNoAsc(int departmentNo, int boardNo);
}
