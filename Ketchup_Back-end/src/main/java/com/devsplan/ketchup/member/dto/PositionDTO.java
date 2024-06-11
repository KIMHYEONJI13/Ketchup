package com.devsplan.ketchup.member.dto;


import com.devsplan.ketchup.common.Authority;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PositionDTO {
    private int positionNo;
    private String positionName;
    private int positionLevel;
    private Authority authority;
    private char positionStatus;

    public PositionDTO() {
    }

    public PositionDTO(int positionNo) {
        this.positionNo = positionNo;
    }

    public PositionDTO(String positionName, int positionLevel, Authority authority, char positionStatus) {
        this.positionName = positionName;
        this.positionLevel = positionLevel;
        this.authority = authority;
        this.positionStatus = positionStatus;
    }

    public PositionDTO(int positionNo, String positionName, int positionLevel, Authority authority, char positionStatus) {
        this.positionNo = positionNo;
        this.positionName = positionName;
        this.positionLevel = positionLevel;
        this.authority = authority;
        this.positionStatus = positionStatus;
    }

    public int getPositionNo() {
        return positionNo;
    }

    public void setPositionNo(int positionNo) {
        this.positionNo = positionNo;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public int getPositionLevel() {
        return positionLevel;
    }

    public void setPositionLevel(int positionLevel) {
        this.positionLevel = positionLevel;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public char getPositionStatus() {
        return positionStatus;
    }

    public void setPositionStatus(char positionStatus) {
        this.positionStatus = positionStatus;
    }

    public List<String> getRoleList(){
        if(this.authority.getRole().length() > 0){
            return Arrays.asList(this.authority.getRole().split(","));
        }
        return new ArrayList<>();
    }

    @Override
    public String toString() {
        return "PositionDTO{" +
                "positionNo=" + positionNo +
                ", positionName='" + positionName + '\'' +
                ", positionLevel=" + positionLevel +
                ", authority=" + authority +
                ", positionStatus=" + positionStatus +
                '}';
    }
}