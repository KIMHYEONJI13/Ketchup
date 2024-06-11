package com.devsplan.ketchup.auth.model.service;
import com.devsplan.ketchup.member.service.MemberService;


import com.devsplan.ketchup.auth.model.DetailsMember;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DetailsService implements UserDetailsService {

    private final MemberService memberService;

    public DetailsService(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * description. 로그인 요청 시 사용자의 id를 받아 DB에서 사용자 정보를 가져오는 메소드
     *
     * @param memberNo the username identifying the user whose data is required.
     * @return UserDetails
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String memberNo) throws UsernameNotFoundException {
        if (memberNo == null || memberNo.equals("")) {
            throw new AuthenticationServiceException(memberNo + " is Empty!");

        } else {
            return memberService.findMember(memberNo)
                            .map(data -> new DetailsMember(Optional.of(data)))  //널이아닌값을 가지는 객체를 반환한다. 그 정보로 DetailsUser 만들자
                            .orElseThrow(() -> new AuthenticationServiceException(memberNo)); // 그과정에서 에러 발생하면 저 예외 던지고 메세지는 username으로 설정
        }


    }


}
