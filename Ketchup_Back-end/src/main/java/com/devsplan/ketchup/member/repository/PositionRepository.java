package com.devsplan.ketchup.member.repository;


import com.devsplan.ketchup.member.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {
    Position findPositionByPositionNo(int rPositionNo);



    List<Position> findByPositionStatus(char y);


}
