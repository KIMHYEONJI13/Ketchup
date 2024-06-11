package com.devsplan.ketchup.auth.filter;



import com.devsplan.ketchup.auth.model.DetailsMember;
import com.devsplan.ketchup.common.AuthConstants;
import com.devsplan.ketchup.common.Authority;

import com.devsplan.ketchup.member.dto.MemberDTO;
import com.devsplan.ketchup.member.dto.PositionDTO;
import com.devsplan.ketchup.member.entity.Member;
import com.devsplan.ketchup.member.entity.Position;
import com.devsplan.ketchup.util.TokenUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    //프로바이더 인증이 완료되면 사용자정보를 토큰에 셋팅해주자

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);


    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        List<String> roleLessList = Arrays.asList("/signup","/signupPosition","/signupDep");


        if (roleLessList.contains(request.getRequestURI()) ||
                request.getRequestURI().contains("verifyEmail") ||
                request.getRequestURI().contains("email")  ||
                request.getRequestURI().contains("PW")) {
            chain.doFilter(request, response);
            return;
        }



        String header = request.getHeader(AuthConstants.AUTH_HEADER);

        try {
            if (header != null && !header.equalsIgnoreCase("")) {
                String token = TokenUtils.splitHeader(header);
                //토큰에서 해더 부분 때고 보자

                if (TokenUtils.isValidToken(token)) {
                    Claims claims = TokenUtils.getClaimsFromToken(token);
                    DetailsMember authentication = new DetailsMember();
                    Authority authority = Authority.valueOf(claims.get("role").toString());


                    MemberDTO tMember = new MemberDTO();
                    PositionDTO tPosition = new PositionDTO();
                    tPosition.setAuthority(authority);

                    tMember.setPosition(tPosition);

                    tMember.setMemberNo(claims.get("memberNo").toString());
                    //토큰에 사원설정시 부서번호 추가

                    tPosition.setPositionNo( Integer.parseInt( ( claims.get("positionNo").toString() ) ) );
//                  tPosition.setPositionName(claims.get("positionName").toString());


                    // Role을 설정합니다.

                    authentication.setMember(tMember);


                    // 나머지 코드는 동일합니다.
                    AbstractAuthenticationToken authenticationToken
                            = UsernamePasswordAuthenticationToken
                            .authenticated(authentication, token, authentication.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    chain.doFilter(request, response);

                } else {
                    throw new RuntimeException("token이 유효하지 않습니다.");
                }
            } else {
                throw new RuntimeException("token이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            JSONObject jsonObject = jsonResponseWrapper(e);
            printWriter.print(jsonObject);
            printWriter.flush();
            printWriter.close();
        }
    }

    /**
     * description. 토큰 관련 Exception 발생 시 예외 내용을 담은 객체 반환하는 메소드
     *
     * @param e : Exception
     * @return JSONObject
     */
    private JSONObject jsonResponseWrapper(Exception e) {
        String resultMsg = "";

        if (e instanceof ExpiredJwtException) {
            resultMsg = "Token Expired";
        } else if (e instanceof SignatureException) {
            resultMsg = "Token SignatureException";
        } else if (e instanceof JwtException) {
            resultMsg = "Token Parsing JwtException";
        } else {
            resultMsg = "other Token error";
        }

        HashMap<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("status", 401);
        jsonMap.put("message", resultMsg);
        jsonMap.put("reason", e.getMessage());

        return new JSONObject(jsonMap);
    }
}
