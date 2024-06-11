package com.devsplan.ketchup.reserve.dto;

import com.devsplan.ketchup.rsc.dto.ResourceDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
@ToString
public class ReserveDTO {

    private int rsvNo;
    private String rsvDescr;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime rsvStartDttm;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime rsvEndDttm;
    private String reserverId;
    private String reserverName;

    private ResourceDTO resources;

    public ReserveDTO() {
    }

    public ReserveDTO(int rsvNo, String rsvDescr, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, String reserverId, String reserverName, ResourceDTO resources) {
        this.rsvNo = rsvNo;
        this.rsvDescr = rsvDescr;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.reserverId = reserverId;
        this.reserverName = reserverName;
        this.resources = resources;
    }

    public ReserveDTO(String rsvDescr, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, String reserverId, String reserverName, ResourceDTO resourceDTO) {
        this.rsvDescr = rsvDescr;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
        this.reserverId = reserverId;
        this.reserverName = reserverName;
        this.resources = resourceDTO;
    }

    public ReserveDTO(int rsvNo, String rsvDescr, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm) {
        this.rsvNo = rsvNo;
        this.rsvDescr = rsvDescr;
        this.rsvStartDttm = rsvStartDttm;
        this.rsvEndDttm = rsvEndDttm;
    }

    public ReserveDTO(int rsvNo, String updatedDescr, LocalDateTime updatedStartDttm, LocalDateTime updatedEndDttm, ResourceDTO resourceDTO) {
        this.rsvNo = rsvNo;
        this.rsvDescr = updatedDescr;
        this.rsvStartDttm = updatedStartDttm;
        this.rsvEndDttm = updatedEndDttm;
        this.resources = resourceDTO;
    }
}