package com.devsplan.ketchup.rsc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

@Entity
@ToString
@Table(name = "tbl_resource")
@Getter
public class Resource {
    @Id
    @Column(name = "RSC_NO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rscNo;

    @Column(name = "RSC_CATEGORY", nullable = false)
    private String rscCategory;

    @Column(name = "RSC_NAME", nullable = false)
    private String rscName;

    @Column(name = "RSC_INFO", nullable = false)
    private String rscInfo;

    @Column(name = "RSC_CAP", nullable = false)
    private int rscCap;

    @Column(name = "RSC_IS_AVAILABLE", nullable = false)
    private boolean rscIsAvailable;

    @Column(name = "RSC_DESCR")
    private String rscDescr;

    protected Resource() {}

    public Resource rscIsAvailable(boolean val) {
        this.rscIsAvailable = val;
        return this;
    }

    public Resource rscDescr(String val) {
        this.rscDescr = val;
        return this;
    }

    public Resource(String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        this.rscCategory = rscCategory;
        this.rscName = rscName;
        this.rscInfo = rscInfo;
        this.rscCap = rscCap;
        this.rscIsAvailable = rscIsAvailable;
        this.rscDescr = rscDescr;
    }

    public Resource(int rscNo, String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        this.rscNo = rscNo;
        this.rscCategory = rscCategory;
        this.rscName = rscName;
        this.rscInfo = rscInfo;
        this.rscCap = rscCap;
        this.rscIsAvailable = rscIsAvailable;
        this.rscDescr = rscDescr;
    }
}