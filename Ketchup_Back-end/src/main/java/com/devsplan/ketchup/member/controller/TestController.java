package com.devsplan.ketchup.member.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


import static com.devsplan.ketchup.util.TokenUtils.decryptToken;


@RestController
@PreAuthorize("hasAuthority('LV1')")
public class TestController {

    @GetMapping("/test")
    public String test(@RequestHeader("Authorization") String token){


        int depNo = decryptToken(token).get("depNo", Integer.class);

        String memNo = decryptToken(token).get("memberNo", String.class);

        return "test GET: 로그인사원의 부서: " + depNo +"로그인사원의 사번: " + memNo;
    }



    @PostMapping("/test2")
    public String test2(){

        return "test POST";
    }


}
