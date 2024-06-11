package com.devsplan.ketchup.auth.model;



import com.devsplan.ketchup.member.dto.MemberDTO;
import com.devsplan.ketchup.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

public class DetailsMember implements UserDetails {

    private MemberDTO memberDTO;

    public DetailsMember() {
    }

    public DetailsMember(Optional<MemberDTO> memberDTO) {
        this.memberDTO = memberDTO.get();
    }

    public MemberDTO getMember() {
        return memberDTO;
    }

    public void setMember(MemberDTO memberDTO) {
        this.memberDTO = memberDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        memberDTO.getPosition().getRoleList().forEach(role -> authorities.add(() -> role));
        return authorities;
    }


    @Override
    public String getPassword() {
        return memberDTO.getMemberPW();
    }

    @Override
    public String getUsername() {
        return ""+memberDTO.getMemberNo();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}