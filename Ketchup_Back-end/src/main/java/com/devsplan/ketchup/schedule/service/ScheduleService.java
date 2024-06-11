package com.devsplan.ketchup.schedule.service;

import com.devsplan.ketchup.schedule.dto.DepartmentDTO;
import com.devsplan.ketchup.schedule.dto.ParticipantDTO;
import com.devsplan.ketchup.schedule.dto.ScheduleDTO;
import com.devsplan.ketchup.schedule.entity.Department;
import com.devsplan.ketchup.schedule.entity.Participant;
import com.devsplan.ketchup.schedule.entity.Schedule;
import com.devsplan.ketchup.schedule.repository.DepartmentRepository;
import com.devsplan.ketchup.schedule.repository.ParticipantRepository;
import com.devsplan.ketchup.schedule.repository.ScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DepartmentRepository departmentRepository;
    private final ParticipantRepository participantRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, DepartmentRepository departmentRepository, ParticipantRepository participantRepository) {
        this.scheduleRepository = scheduleRepository;
        this.departmentRepository = departmentRepository;
        this.participantRepository = participantRepository;
    }

    public List<ScheduleDTO> selectScheduleListByDepartment(int dptNo) {
        Department department = departmentRepository.findById(dptNo)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 부서를 찾을 수 없습니다: " + dptNo));
        List<Schedule> scheduleList = scheduleRepository.findByDepartment(department);
        return scheduleList.stream()
                .map(schedule -> {
                    ScheduleDTO scheduleDTO = new ScheduleDTO();
                    scheduleDTO.setSkdNo(schedule.getSkdNo());
                    scheduleDTO.setDptNo(new DepartmentDTO(schedule.getDepartment().getDptNo()));
                    scheduleDTO.setSkdName(schedule.getSkdName());
                    scheduleDTO.setSkdStartDttm(schedule.getSkdStartDttm());
                    scheduleDTO.setSkdEndDttm(schedule.getSkdEndDttm());
                    scheduleDTO.setSkdLocation(schedule.getSkdLocation());
                    scheduleDTO.setSkdMemo(schedule.getSkdMemo());
                    scheduleDTO.setAuthorId(schedule.getAuthorId());
                    scheduleDTO.setAuthorName(schedule.getAuthorName());
                    scheduleDTO.setParticipants(schedule.getParticipants().stream()
                            .map(participant -> new ParticipantDTO(participant.getParticipantNo(), participant.getParticipantName(), participant.getParticipantMemberNo()))
                            .collect(Collectors.toList()));
                    scheduleDTO.setSkdStatus(schedule.getSkdStatus());
                    return scheduleDTO;
                }).collect(Collectors.toList());
    }

    @Transactional
    public void insertSchedule(ScheduleDTO newSchedule) {
        DepartmentDTO departmentDTO = newSchedule.getDptNo();
        Department department = departmentRepository.findById(departmentDTO.getDptNo())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 부서를 찾을 수 없습니다: " + departmentDTO.getDptNo()));

        Schedule schedule = Schedule.builder()
                .department(department)
                .skdName(newSchedule.getSkdName())
                .skdStartDttm(newSchedule.getSkdStartDttm())
                .skdEndDttm(newSchedule.getSkdEndDttm())
                .skdLocation(newSchedule.getSkdLocation())
                .skdMemo(newSchedule.getSkdMemo())
                .authorName(newSchedule.getAuthorName())
                .authorId(newSchedule.getAuthorId())
                .skdStatus(newSchedule.getSkdStatus())
                .build();

        System.out.println("schedule = " + schedule);

        scheduleRepository.save(schedule);

        List<Participant> participants = newSchedule.getParticipants().stream()
                .map(dto -> Participant.builder()
                        .participantName(dto.getParticipantName())
                        .participantMemberNo(dto.getParticipantMemberNo())
                        .schedule(schedule)
                        .build())
                .collect(Collectors.toList());

        participantRepository.saveAll(participants);
    }

    @Transactional
    public void updateSchedule(int skdNo, ScheduleDTO updateSchedule) {
        Schedule foundSchedule = scheduleRepository.findById((long) skdNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정을 찾을 수 없습니다: " + skdNo));

        List<Participant> existingParticipants = participantRepository.findBySchedule(foundSchedule);
        participantRepository.deleteAll(existingParticipants);

        Schedule updatedSchedule = Schedule.builder()
                .skdNo(foundSchedule.getSkdNo())
                .department(foundSchedule.getDepartment())
                .skdName(updateSchedule.getSkdName() != null ? updateSchedule.getSkdName() : foundSchedule.getSkdName())
                .skdStartDttm(updateSchedule.getSkdStartDttm() != null ? updateSchedule.getSkdStartDttm() : foundSchedule.getSkdStartDttm())
                .skdEndDttm(updateSchedule.getSkdEndDttm() != null ? updateSchedule.getSkdEndDttm() : foundSchedule.getSkdEndDttm())
                .skdLocation(updateSchedule.getSkdLocation() != null ? updateSchedule.getSkdLocation() : foundSchedule.getSkdLocation())
                .skdMemo(updateSchedule.getSkdMemo() != null ? updateSchedule.getSkdMemo() : foundSchedule.getSkdMemo())
                .authorName(updateSchedule.getAuthorName())
                .authorId(updateSchedule.getAuthorId())
                .skdStatus(updateSchedule.getSkdStatus())
                .build();

        scheduleRepository.save(updatedSchedule);

        List<Participant> participants = updateSchedule.getParticipants().stream()
                .map(dto -> Participant.builder()
                        .participantName(dto.getParticipantName())
                        .participantMemberNo(dto.getParticipantMemberNo())
                        .schedule(updatedSchedule)
                        .build())
                .collect(Collectors.toList());

        participantRepository.saveAll(participants);
    }

    @Transactional
    public void deleteById(int skdNo) {
        Schedule foundSchedule = scheduleRepository.findById((long) skdNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정을 찾을 수 없습니다: " + skdNo));
        participantRepository.deleteBySchedule(foundSchedule);
        scheduleRepository.delete(foundSchedule);
    }
}
