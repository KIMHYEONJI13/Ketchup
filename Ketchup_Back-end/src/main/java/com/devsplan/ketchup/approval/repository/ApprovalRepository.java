package com.devsplan.ketchup.approval.repository;

import com.devsplan.ketchup.approval.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Integer> {

    int countApprovalByMemberNoAndAppStatusIn(String memberNo, List<String> Status);

    @Query("SELECT COUNT (a.approvalNo) from AppSelect a join AppLine b on (a.approvalNo = b.approvalNo) where b.memberNo = :memberNo AND a.sequence = b.alSequence AND a.appStatus IN :status")
    int countReceiveAppByMemberNoAndStatusIn(String memberNo, List<String> status);

    @Query("SELECT COUNT (a.approvalNo) FROM AppSelect a join RefLine b on (a.approvalNo = b.approvalNo) where b.memberNo = :memberNo AND a.appStatus LIKE %:status%")
    int countRefAppByMemberNoAndAppStatusIn(String memberNo, String status);


}
