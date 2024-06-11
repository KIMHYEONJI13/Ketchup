package com.devsplan.ketchup.rsc.repository;

import com.devsplan.ketchup.rsc.entity.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RscRepository extends JpaRepository<Resource, Integer> {
    Page<Resource> findByRscCategory(String part, Pageable paging);
    Resource findByRscNo(int rscNo);
    int deleteByRscNo(int rscNo);
}
