package com.devsplan.ketchup.auth.model.dto;

public class LoginDTO {

    private String memberNo;
    private String memberPW;

    public LoginDTO() {
    }

    public LoginDTO(String memberNo, String memberPW) {
        this.memberNo = memberNo;
        this.memberPW = memberPW;
    }

    public String getMemberNo() {
        return memberNo;
    }

    public void setMemberNo(String memberNo) {
        this.memberNo = memberNo;
    }

    public String getMemberPW() {
        return memberPW;
    }

    public void setMemberPW(String memberPW) {
        this.memberPW = memberPW;
    }

    @Override
    public String toString() {
        return "LoginDTO{" +
                "memberNo='" + memberNo + '\'' +
                ", memberPW='" + memberPW + '\'' +
                '}';
    }
}
