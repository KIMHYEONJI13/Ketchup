package com.devsplan.ketchup.member.repository;


import com.devsplan.ketchup.member.entity.Dep;
import com.devsplan.ketchup.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepRepository extends JpaRepository<Dep, Integer> {
  

    Dep findDepByDepNo(int rDepNo);

    List<Dep> findByStatus(char y);


//    @Query("SELECT new com.devsplan.ketchup.member.entity.Dep(d.depNo, d.depName, d.status, COUNT(m.memberNo)) " +
//            "FROM Member m " +
//            "LEFT JOIN m.department d " +
//            "GROUP BY d.depNo, d.depName")
//    List<Dep> findAllDepWithMemberCount();



    @Query("SELECT new com.devsplan.ketchup.member.entity.Dep(d.depNo, d.depName, d.status, d.leader, " +
            "COUNT(CASE WHEN m.status = '재직중' THEN 1 ELSE null END)) " +
            "FROM Dep d " +
            "LEFT JOIN d.members m " +
            "GROUP BY d.depNo, d.depName, d.status")
    List<Dep> findAllDepWithMemberCount();










}
