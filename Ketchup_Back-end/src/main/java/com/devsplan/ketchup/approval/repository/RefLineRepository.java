package com.devsplan.ketchup.approval.repository;

import com.devsplan.ketchup.approval.entity.RefLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RefLineRepository extends JpaRepository<RefLine, Integer> {
    @Query("select a.approvalNo from RefLine a where a.memberNo = :memberNo" )
    List<Integer> findAppNoByMemberNo(String memberNo);
}
