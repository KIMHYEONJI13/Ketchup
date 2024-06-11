package com.devsplan.ketchup.schedule.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "TBL_SCHEDULE")
@Getter
@ToString
@NoArgsConstructor
public class Schedule {
    @Id
    @Column(name = "SKD_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skdNo;

    @ManyToOne
    @JoinColumn(name = "DPT_NO")
    private Department department;

    @Column(name = "SKD_NAME")
    private String skdName;

    @Column(name = "SKD_START_DTTM")
    private String skdStartDttm;

    @Column(name = "SKD_END_DTTM")
    private String skdEndDttm;

    @Column(name = "SKD_LOCATION")
    private String skdLocation;

    @Column(name = "SKD_MEMO")
    private String skdMemo;

    @Column(name = "AUTHOR_NAME")
    private String authorName;

    @Column(name = "AUTHOR_ID")
    private String authorId;

    @OneToMany(mappedBy = "schedule")
    private List<Participant> participants;

    @Column(name= "SKD_STATUS")
    private String skdStatus;

    @Builder
    public Schedule(int skdNo, Department department, String skdName, String skdStartDttm, String skdEndDttm, String skdLocation, String skdMemo, String authorName, String authorId, List<Participant> participants, String skdStatus) {
        this.skdNo = skdNo;
        this.department = department;
        this.skdName = skdName;
        this.skdStartDttm = skdStartDttm;
        this.skdEndDttm = skdEndDttm;
        this.skdLocation = skdLocation;
        this.skdMemo = skdMemo;
        this.authorName = authorName;
        this.authorId = authorId;
        this.participants = participants;
        this.skdStatus = skdStatus;
    }
}

