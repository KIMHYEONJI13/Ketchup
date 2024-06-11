package com.devsplan.ketchup.board.repository;

import com.devsplan.ketchup.board.entity.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoardFileRepository extends JpaRepository<BoardFile, Integer> {
    List<BoardFile> findByBoardNo(int boardNo);

}
