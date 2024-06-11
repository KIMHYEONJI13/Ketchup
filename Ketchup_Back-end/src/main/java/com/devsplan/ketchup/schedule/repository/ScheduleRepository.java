package com.devsplan.ketchup.schedule.repository;

import com.devsplan.ketchup.schedule.entity.Department;
import com.devsplan.ketchup.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByDepartment(Department department);

    Schedule findByDepartmentAndSkdNo(Department department, int skdNo);

}
