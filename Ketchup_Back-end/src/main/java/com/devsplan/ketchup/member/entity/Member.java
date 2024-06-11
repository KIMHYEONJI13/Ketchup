package com.devsplan.ketchup.member.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TBL_MEMBER")
public class Member {
    @Id
    @Column(name="MEMBER_NO")
    private String memberNo;
    @Column(name="MEMBER_NAME")
    private String memberName;
    @Column(name="MEMBER_PW")
    private String memberPW;
    @Column(name="MEMBER_PHONE")
    private String phone;
    @Column(name="MEMBER_BIRTHDATE")
    private String birthDate;
    @Column(name="MEMBER_GENDER")
    private char gender;
    @Column(name="MEMBER_ADDRESS")
    private String address;
    @Column(name="MEMBER_PRIVATEEMAIL")
    private String privateEmail;
    @Column(name="MEMBER_COMPANYEMAIL")
    private String companyEmail;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name= "DEP_NO")
    private Dep department;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name= "POSITION_NO")
    private Position position;
    @Column(name="MEMBER_ACCOUNT")
    private String account;
    @Column(name="MEMBER_STATUS")
    private String status;
    @Column(name="MEMBER_IMGURL")
    private String imgUrl;

    @Column(name = "MEMBER_RESIGNDATETIME")
    private LocalDateTime resignDateTime;

    @Column(name = "MEMBER_VERIFYCODE")
    private String verifyCode;

    @Column(name = "MEMBER_ISFIRSTLOGIN")
    private String isFirstLogin;

    protected Member() {
    }

    public Member(String memberNo, String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, Dep department, Position position, String account, String status, String imgUrl, LocalDateTime resignDateTime) {
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

    public Member(String memberNo, String memberName, String memberPW, String phone, String birthDate, char gender, String address, String privateEmail, String companyEmail, Dep department, Position position, String account, String status, String imgUrl, LocalDateTime resignDateTime, String verifyCode,String isFirstLogin) {
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
        this.verifyCode = verifyCode;
        this.isFirstLogin = isFirstLogin;

    }

    public Member memberNo(String memberNo){
        this.memberNo = memberNo;
        return this;
    }

    public Member memberName(String memberName){
        this.memberName = memberName;
        return this;
    }

    public Member phone(String phone){
        this.phone = phone;
        return this;

    }
    public Member memberPW(String memberPW){
        this.memberPW = memberPW;
        return this;

    }
    public Member birthDate(String birthDate){
        this.birthDate = birthDate;
        return this;

    }
    public Member gender(char gender){
        this.gender = gender;
        return this;

    }
    public Member address(String address){
        this.address = address;
        return this;

    }
    public Member privateEmail(String privateEmail){
        this.privateEmail = privateEmail;
        return this;

    }
    public Member companyEmail(String companyEmail){
        this.companyEmail = companyEmail;
        return this;

    }
    public Member department(Dep department){
        this.department = department;
        return this;

    }
    public Member position(Position position){
        this.position = position;
        return this;

    }
    public Member account(String account){
        this.account = account;
        return this;

    }
    public Member status(String status){
        this.status = status;
        return this;

    }
    public Member imgUrl(String imgUrl){
        this.imgUrl = imgUrl;
        return this;

    }
    public Member resignDateTime(LocalDateTime resignDateTime){
        this.resignDateTime = resignDateTime;
        return this;

    }

    public Member verifyCode(String verifyCode){
        this.verifyCode = verifyCode;
        return this;
    }

    public Member isFirstLogin(String isFirstLogin){
        this.isFirstLogin = isFirstLogin;
        return this;
    }

    public Member build() {
        return new Member(memberNo,memberName,memberPW,phone,birthDate,gender,address,privateEmail,companyEmail,department,position,account,status,imgUrl,resignDateTime,verifyCode,isFirstLogin);
    }

    public String getMemberNo() {
        return memberNo;
    }

    public String getMemberName() {
        return memberName;
    }

    public String getMemberPW() {
        return memberPW;
    }

    public String getPhone() {
        return phone;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public char getGender() {
        return gender;
    }

    public String getAddress() {
        return address;
    }

    public String getPrivateEmail() {
        return privateEmail;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public Dep getDepartment() {
        return department;
    }

    public Position getPosition() {
        return position;
    }

    public String getAccount() {
        return account;
    }

    public String getStatus() {
        return status;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public LocalDateTime getResignDateTime() {
        return resignDateTime;
    }



    @Override
    public String toString() {
        return "Member{" +
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
                ", resignDateTime=" + resignDateTime +
                ", verifyCode='" + verifyCode + '\'' +
                '}';
    }
}