package com.devsplan.ketchup.auth.handler;


;
import com.devsplan.ketchup.auth.model.DetailsMember;
import com.devsplan.ketchup.auth.model.service.DetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CustomAuthenticationProvider implements AuthenticationProvider {

    //실제 인증을 진행해주는애// 비밀번호 매칭을하여 실제인증 진행

    @Autowired
    private DetailsService detailsService;  //db에서 유저정보 가져오는 서비스 의존성 주입

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken loginToken = (UsernamePasswordAuthenticationToken) authentication;

        String memberNo = loginToken.getName();  //로그인 토근에서 이름을 꺼낸다
        String memberPW = (String) loginToken.getCredentials(); //로그인 토큰에서 비밀번호를 꺼내는데 object 타입이라 다운캐스팅 필요.



        DetailsMember detailsMember = (DetailsMember) detailsService.loadUserByUsername(memberNo); // 아이디로 해당 유저가있는지 찾아오고
        //그정보를 유저정보로 저장

        if(!passwordEncoder.matches(memberPW, detailsMember.getPassword())) {
            throw new BadCredentialsException(memberPW + "는 틀린 비밀번호입니다.");
        }
        //문제없으니 로그인 토큰 주자 ,유저정보,비밀번호 정보,권한정보를 이용해 토큰을 만들어주자.
        return new UsernamePasswordAuthenticationToken(detailsMember, memberPW, detailsMember.getAuthorities());

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
