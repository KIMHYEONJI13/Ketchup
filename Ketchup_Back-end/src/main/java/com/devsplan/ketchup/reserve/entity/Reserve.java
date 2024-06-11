package com.devsplan.ketchup.reserve.entity;

import com.devsplan.ketchup.rsc.entity.Resource;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;


@Getter
@ToString
@Entity
@Table(name = "TBL_RESERVE")
public class Reserve {

    @Id
    @Column(name = "RSV_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rsvNo;                  // 예약 번호

    @Column(name = "RSV_START_DTTM")
    private LocalDateTime rsvStartDttm; // 시작 일정

    @Column(name = "RSV_END_DTTM")
    private LocalDateTime rsvEndDttm;   // 종료 일정

    @Column(name = "RSV_DESCR")
    private String rsvDescr;            // 사용 목적

    @Column(name = "RESERVER_ID")
    private String memberNo;            // 예약자 아이디

    @Column(name = "RESERVER_NAME")
    private String memberName;          // 예약자 이름

    @ManyToOne
    @JoinColumn(name = "RESOURCES")
    private Resource resources;         // 자원

    public Reserve() {
    }

    public Reserve(int rsvNo, String rsvDescr, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, Resource resource) {
        this.rsvNo = rsvNo;
        this.rsvDescr = rsvDescr;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.resources = resource;
    }

    public Reserve(int rsvNo, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, String rsvDescr, String memberNo, Resource resources) {
        this.rsvNo = rsvNo;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.rsvDescr = rsvDescr;
        this.memberNo = memberNo;
        this.resources = resources;
    }

    public Reserve(int rsvNo, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, String rsvDescr) {
        this.rsvNo = rsvNo;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.rsvDescr = rsvDescr;
    }

    public Reserve(int rsvNo, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, String rsvDescr, String reserverId, String reserverName, Resource resource) {
        this.rsvNo = rsvNo;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.rsvDescr = rsvDescr;
        this.memberNo = reserverId;
        this.memberName = reserverName;
        this.resources = resource;
    }

    public Reserve rsvNo(int val) {
        this.rsvNo = val;
        return this;
    }

    public Reserve rsvStartDttm(LocalDateTime val) {
        this.rsvStartDttm = val;
        return this;
    }

    public Reserve rsvEndDttm(LocalDateTime val) {
        this.rsvEndDttm = val;
        return this;
    }

    public Reserve rsvDescr(String val) {
        this.rsvDescr = val;
        return this;
    }

    public Reserve memberNo(String val) {
        this.memberNo = val;
        return this;
    }

    public Reserve memberName(String val) {
        this.memberName = val;
        return this;
    }

    public Reserve builder() {
        return new Reserve(rsvNo, rsvStartDttm, rsvEndDttm, rsvDescr, memberNo, memberName, resources);
    }


}