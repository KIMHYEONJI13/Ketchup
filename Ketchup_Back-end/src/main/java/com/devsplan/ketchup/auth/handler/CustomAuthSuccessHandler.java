package com.devsplan.ketchup.auth.handler;


import com.devsplan.ketchup.auth.model.DetailsMember;
import com.devsplan.ketchup.common.AuthConstants;
import com.devsplan.ketchup.common.utils.ConvertUtil;

import com.devsplan.ketchup.member.dto.MemberDTO;
import com.devsplan.ketchup.member.entity.Member;
import com.devsplan.ketchup.util.TokenUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

public class CustomAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        MemberDTO memberDTO = ((DetailsMember) authentication.getPrincipal()).getMember();
        JSONObject jsonValue = (JSONObject) ConvertUtil.converObjectToJsonObject(memberDTO);
        HashMap<String, Object> responseMap = new HashMap<>();

        JSONObject jsonObject;
        if(memberDTO.getStatus().equals("N")) {
            responseMap.put("userInfo", jsonValue);
            responseMap.put("message", "휴면 상태의 계정입니다.");
        } else {
            String token = TokenUtils.generateJwtToken(memberDTO);
            responseMap.put("userInfo", jsonValue);
            responseMap.put("message", "Log in!!.");
            responseMap.put("token", token);
            responseMap.put("status", 200);
            response.addHeader(AuthConstants.AUTH_HEADER, AuthConstants.TOKEN_TYPE + " " + token);

        }

        jsonObject = new JSONObject(responseMap);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        printWriter.print(jsonObject);
        printWriter.flush();
        printWriter.close();
    }
}