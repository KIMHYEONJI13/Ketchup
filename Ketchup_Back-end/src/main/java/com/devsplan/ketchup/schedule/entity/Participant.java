package com.devsplan.ketchup.schedule.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TBL_PARTICIPANT")
@Getter
@ToString
@NoArgsConstructor
public class Participant {
    @Id
    @Column(name = "PARTICIPANT_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantNo;

    @Column(name = "PARTICIPANT_NAME")
    private String participantName;

    @Column(name = "PARTICIPANT_MEMBER_NO")
    private String participantMemberNo;

    @ManyToOne
    @JoinColumn(name = "SKD_NO")
    private Schedule schedule;

    @Builder
    public Participant(Long participantNo, String participantName, String participantMemberNo, Schedule schedule) {
        this.participantNo = participantNo;
        this.participantName = participantName;
        this.participantMemberNo = participantMemberNo;
        this.schedule = schedule;
    }
}