package com.devsplan.ketchup.member.dto;

public class DepDTO {
    private int depNo;
    private String depName;
    private char status;
    private long memberCount;

    private String leader;
    public DepDTO() {
    }

    public DepDTO(int depNo) {
        this.depNo = depNo;
    }

    public DepDTO(String depName, char status) {
        this.depName = depName;
        this.status = status;
    }

    public DepDTO(int depNo, String depName, char status) {
        this.depNo = depNo;
        this.depName = depName;
        this.status = status;
    }

    public DepDTO(int depNo, String depName, char status, long memberCount) {
        this.depNo = depNo;
        this.depName = depName;
        this.status = status;
        this.memberCount=memberCount;
    }

    public DepDTO(int depNo, String depName, char status, long memberCount, String leader) {
        this.depNo = depNo;
        this.depName = depName;
        this.status = status;
        this.memberCount = memberCount;
        this.leader = leader;
    }

    public long getMemberCount() {
        return memberCount;
    }

    public int getDepNo() {
        return depNo;
    }

    public void setMemberCount(long memberCount) {
        this.memberCount = memberCount;
    }

    public void setDepNo(int depNo) {
        this.depNo = depNo;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }


    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }


    @Override
    public String toString() {
        return "DepDTO{" +
                "depNo=" + depNo +
                ", depName='" + depName + '\'' +
                ", status=" + status +
                ", memberCount=" + memberCount +
                ", leader='" + leader + '\'' +
                '}';
    }
}