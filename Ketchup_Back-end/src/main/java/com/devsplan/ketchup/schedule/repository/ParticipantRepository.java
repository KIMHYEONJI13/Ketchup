package com.devsplan.ketchup.schedule.repository;

import com.devsplan.ketchup.schedule.entity.Participant;
import com.devsplan.ketchup.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findBySchedule(Schedule schedule);

    void deleteBySchedule(Schedule foundSchedule);
}
