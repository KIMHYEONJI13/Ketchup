package com.devsplan.ketchup.approval.repository;

import com.devsplan.ketchup.approval.entity.AppLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppLineRepository extends JpaRepository<AppLine, Integer> {

    AppLine findByMemberNoAndApprovalNo(String memberNo, int appNo);

    @Query("select count(a.alSequence) from AppLine a where a.approvalNo = :approvalNo")
    int countSequence(int approvalNo);

}
