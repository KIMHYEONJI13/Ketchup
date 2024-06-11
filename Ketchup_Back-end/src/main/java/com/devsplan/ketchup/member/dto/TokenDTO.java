package com.devsplan.ketchup.member.dto;

public class TokenDTO {
    private String grantType;       // 토큰 타입
    private String memberName;      // 인증받은 회원 이름
    private String accessToken;     // 엑세스 토큰

    public TokenDTO() {
    }

    public TokenDTO(String grantType, String memberName, String accessToken) {
        this.grantType = grantType;
        this.memberName = memberName;
        this.accessToken = accessToken;
    }

    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "TokenDTO{" +
                "grantType='" + grantType + '\'' +
                ", memberName='" + memberName + '\'' +
                ", accessToken='" + accessToken + '\'' +
                '}';
    }
}
