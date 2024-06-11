package com.devsplan.ketchup.reserve.repository;

import com.devsplan.ketchup.rsc.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

}