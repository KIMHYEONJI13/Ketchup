package com.devsplan.ketchup.util;



import com.devsplan.ketchup.member.dto.MemberDTO;
import com.devsplan.ketchup.member.entity.Member;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*
 * 토큰을 관리하기 위한 utils 모음 클래스
 * */
@Component
public class TokenUtils {

    private static String jwtSecretKey; //시크릿키
    private static Long tokenValidateTime; //토큰만료 시간
    //토큰을 만들때 쓸 필드값들

    @Value("${jwt.key}")
    public void setJwtSecretKey(String jwtSecretKey) {
        TokenUtils.jwtSecretKey = jwtSecretKey;
    }

    @Value("${jwt.time}")
    public void setTokenValidateTime(Long tokenValidateTime) {
        TokenUtils.tokenValidateTime = tokenValidateTime;
    }

    /**
     * description. header의 token을 분리하는 메소드
     *
     * @param header (Authrization의 header값)
     * @return String (Authrization의 token 부분)
     */
    public static String splitHeader(String header) {
        if (!header.equals("")) {
            return header.split(" ")[1]; //빈값이 아닐때
        } else {
            return null; //빈값이면
        }
    }

    /**
     * description. 토큰이 유효한지 확인하는 메소드
     *
     * @param token
     * @return boolean : 유효 판단 여부
     */
    public static boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return true;

        } catch (ExpiredJwtException e) {
            e.printStackTrace();  //만료된 토큰인 경우
            return false;

        } catch (JwtException e) {
            e.printStackTrace(); //토큰 자체에대한 예외 발생경우
            return false;

        } catch (NullPointerException e) {
            e.printStackTrace(); //토큰이 null인 경우 같은 예외 발생경우
            return false;
        }
    }


    /**
     * description. 토큰을 복호화 하는 메소드
     *
     * @param token
     * @return Claims
     */
    public static Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(token)
                .getBody();
    }  //토큰을 복호화 시켜서 페이로드 내용을 가져오게한다.(claims 로 받는다.) // 위조되지 않았고

    /**
     * description. 토큰을 생성하는 메소드
     *
     * @param memberDTO
     * @return token (String)
     */
    public static String generateJwtToken(MemberDTO memberDTO) {
        Date expireTime = new Date(System.currentTimeMillis() + tokenValidateTime);

        JwtBuilder builder = Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(memberDTO))
                .setSubject("ketchup token : " + memberDTO.getMemberNo())
                .signWith(SignatureAlgorithm.HS256, createSignature())
                .setExpiration(expireTime);

        return builder.compact();
    }

    /**
     * description. 토큰의 header를 설정하는 메소드
     *
     * @return Map<String, Object> (header의 설정 정보)
     */
    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("type", "jwt");
        header.put("alg", "HS256");
        header.put("date", System.currentTimeMillis());

        return header;
    }

    /**
     * description. 사용자 정보를 기반으로 claim을 생성하는 메소드
     *
     * @param member (사용자 정보)
     * @return Map<String, Object> (claims 정보)
     */
    private static Map<String, Object> createClaims(MemberDTO member) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("memberNo", member.getMemberNo());
        claims.put("memberName",member.getMemberName());
        claims.put("positionNo", member.getPosition().getPositionNo());
        claims.put("positionName", member.getPosition().getPositionName());
        claims.put("positionLevel", member.getPosition().getPositionLevel());
        claims.put("positionStatus", member.getPosition().getPositionStatus());
        claims.put("role", member.getPosition().getAuthority().getRole()); // 역할 가져오기
        claims.put("depNo", member.getDepartment().getDepNo());
        claims.put("depName", member.getDepartment().getDepName());
        claims.put("imgUrl", member.getImgUrl());
        claims.put("isFirstLogin", member.getIsFirstLogin());


        return claims;
    }

    /**
     * description. JWT 서명을 발급하는 메소드
     *
     * @return Key : SecretKeySpec
     */
    private static Key createSignature() {
        byte[] secretBytes = DatatypeConverter.parseBase64Binary(jwtSecretKey);
        return new SecretKeySpec(secretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public static Claims decryptToken(String token){


        String jwtToken = token.substring(7);

        Claims claims = Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(jwtToken).getBody();


        return claims;

    }



}
