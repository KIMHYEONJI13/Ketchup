package com.devsplan.ketchup.member.controller;

import com.devsplan.ketchup.member.dto.MemberDTO;
import com.devsplan.ketchup.member.dto.PositionDTO;
import com.devsplan.ketchup.member.service.MemberService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }


    @PutMapping("/resign/{memberNo}")
    public String resignMember(@PathVariable String memberNo, @RequestBody MemberDTO resignMemberDTO){
        System.out.println("퇴사처리 시작 =========" + memberNo + resignMemberDTO.toString());

       memberService.resignMember(memberNo,resignMemberDTO);


        return "Resign Member Complete!";


    }








}