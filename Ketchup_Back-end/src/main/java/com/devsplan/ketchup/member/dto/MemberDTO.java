package com.devsplan.ketchup.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public class MemberDTO {

    private String memberNo;
    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String memberName;
    private String memberPW;
    private String phone;
    private String birthDate;
    private char gender;
    private String address;

    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    private String privateEmail;
    private String companyEmail;
    private DepDTO department;
    private PositionDTO position;
    private String account;
    private String status;
    private String imgUrl;

    private String verifyCode;

    private LocalDateTime resignDateTime;

    private String isFirstLogin;



    public MemberDTO() {

    }

    public MemberDTO(String memberNo, String memberName, String phone, String address, String privateEmail, String companyEmail, DepDTO department, PositionDTO position, String account) {
        this.memberNo = memberNo;
        this.memberName = memberName;
        this.phone = phone;
        this.address = address;
        this.privateEmail = privateEmail;
        this.companyEmail = companyEmail;
        this.department = department;
        this.position = position;
        this.account = account;
    }

    public MemberDTO(String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, DepDTO department, PositionDTO position, String account, String status, String imgUrl) {
        this.memberName = memberName;
        this.memberPW = memberPW;
        this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.privateEmail = privateEmail;
        this.companyEmail = companyEmail;
        this.department = department;
        this.position = position;
        this.account = account;
        this.status = status;
        this.imgUrl = imgUrl;
    }

    public MemberDTO(String memberNo, String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, DepDTO department, PositionDTO position, String account, String status, String imgUrl) {
        this.memberNo = memberNo;
        this.memberName = memberName;
        this.memberPW = memberPW;
        this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.privateEmail = privateEmail;
        this.companyEmail = companyEmail;
        this.department = department;
        this.position = position;
        this.account = account;
        this.status = status;
        this.imgUrl = imgUrl;
    }

    public MemberDTO(String memberNo, String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, DepDTO department, PositionDTO position, String account, String status, String imgUrl, LocalDateTime resignDateTime) {
        this.memberNo = memberNo;
        this.memberName = memberName;
        this.memberPW = memberPW;
        this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.privateEmail = privateEmail;
        this.companyEmail = companyEmail;
        this.department = department;
        this.position = position;
        this.account = account;
        this.status = status;
        this.imgUrl = imgUrl;
        this.resignDateTime = resignDateTime;
    }

    public MemberDTO(String memberNo, String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, DepDTO department, PositionDTO position, String account, String status, String imgUrl, String verifyCode, LocalDateTime resignDateTime, String isFirstLogin) {
        this.memberNo = memberNo;
        this.memberName = memberName;
        this.memberPW = memberPW;
        this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.privateEmail = privateEmail;
        this.companyEmail = companyEmail;
        this.department = department;
        this.position = position;
        this.account = account;
        this.status = status;
        this.imgUrl = imgUrl;
        this.verifyCode = verifyCode;
        this.resignDateTime = resignDateTime;
        this.isFirstLogin = isFirstLogin;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public LocalDateTime getResignDateTime() {
        return resignDateTime;
    }

    public void setResignDateTime(LocalDateTime resignDateTime) {
        this.resignDateTime = resignDateTime;
    }

    public String getMemberNo() {
        return memberNo;
    }

    public void setMemberNo(String memberNo) {
        this.memberNo = memberNo;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPW() {
        return memberPW;
    }

    public void setMemberPW(String memberPW) {
        this.memberPW = memberPW;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrivateEmail() {
        return privateEmail;
    }

    public void setPrivateEmail(String privateEmail) {
        this.privateEmail = privateEmail;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public DepDTO getDepartment() {
        return department;
    }

    public void setDepartment(DepDTO department) {
        this.department = department;
    }

    public PositionDTO getPosition() {
        return position;
    }

    public void setPosition(PositionDTO position) {
        this.position = position;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getIsFirstLogin() {
        return isFirstLogin;
    }

    public void setFirstLogin(String firstLogin) {
        isFirstLogin = firstLogin;
    }


    @Override
    public String toString() {
        return "MemberDTO{" +
                "memberNo='" + memberNo + '\'' +
                ", memberName='" + memberName + '\'' +
                ", memberPW='" + memberPW + '\'' +
                ", phone='" + phone + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", gender=" + gender +
                ", address='" + address + '\'' +
                ", privateEmail='" + privateEmail + '\'' +
                ", companyEmail='" + companyEmail + '\'' +
                ", department=" + department +
                ", position=" + position +
                ", account='" + account + '\'' +
                ", status='" + status + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", verifyCode='" + verifyCode + '\'' +
                ", resignDateTime=" + resignDateTime +
                ", isFirstLogin=" + isFirstLogin +
                '}';
    }
}