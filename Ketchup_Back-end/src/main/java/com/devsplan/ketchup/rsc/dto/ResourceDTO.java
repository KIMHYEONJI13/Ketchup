package com.devsplan.ketchup.rsc.dto;

import com.devsplan.ketchup.rsc.entity.Resource;
import lombok.*;

public class ResourceDTO {
    private int rscNo;                  // 자원 번호
    private String rscCategory;         // 자원 카테고리 (회의실 / 차량)
    private String rscName;             // 자원 이름 (회의실 이름 / 차종)
    private String rscInfo;             // 자원 정보 (회의실 위치 / 차량 번호)
    private int rscCap;                 // 인원 (수용 가능 인원 / 탑승 가능 인원)
    private boolean rscIsAvailable;     // 사용 가능 여부
    private String rscDescr;            // 비고

    public ResourceDTO() {}

    public ResourceDTO(boolean rscIsAvailable, String rscDescr) {
        this.rscIsAvailable = rscIsAvailable;
        this.rscDescr = rscDescr;
    }

    public ResourceDTO(String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        this.rscCategory = rscCategory;
        this.rscName = rscName;
        this.rscInfo = rscInfo;
        this.rscCap = rscCap;
        this.rscIsAvailable = rscIsAvailable;
        this.rscDescr = rscDescr;
    }

    public ResourceDTO(int rscNo, String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        this.rscNo = rscNo;
        this.rscCategory = rscCategory;
        this.rscName = rscName;
        this.rscInfo = rscInfo;
        this.rscCap = rscCap;
        this.rscIsAvailable = rscIsAvailable;
        this.rscDescr = rscDescr;
    }

    public ResourceDTO(Resource resource) {
        this.rscNo = resource.getRscNo();
        this.rscName = resource.getRscName();
    }

    public int getRscNo() {
        return rscNo;
    }

    public void setRscNo(int rscNo) {
        this.rscNo = rscNo;
    }

    public String getRscCategory() {
        return rscCategory;
    }

    public void setRscCategory(String rscCategory) {
        this.rscCategory = rscCategory;
    }

    public String getRscName() {
        return rscName;
    }

    public void setRscName(String rscName) {
        this.rscName = rscName;
    }

    public String getRscInfo() {
        return rscInfo;
    }

    public void setRscInfo(String rscInfo) {
        this.rscInfo = rscInfo;
    }

    public int getRscCap() {
        return rscCap;
    }

    public void setRscCap(int rscCap) {
        this.rscCap = rscCap;
    }

    public boolean isRscIsAvailable() {
        return rscIsAvailable;
    }

    public void setRscIsAvailable(boolean rscIsAvailable) {
        this.rscIsAvailable = rscIsAvailable;
    }

    public String getRscDescr() {
        return rscDescr;
    }

    public void setRscDescr(String rscDescr) {
        this.rscDescr = rscDescr;
    }
}