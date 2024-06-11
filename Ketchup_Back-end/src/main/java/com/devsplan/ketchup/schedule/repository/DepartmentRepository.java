package com.devsplan.ketchup.schedule.repository;

import com.devsplan.ketchup.schedule.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
