package com.devsplan.ketchup.approval.entity;

import com.devsplan.ketchup.member.entity.Dep;
import com.devsplan.ketchup.member.entity.Position;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity(name = "appMember")
@Table(name = "TBL_MEMBER")
public class Member {
    @Id
    @Column(name = "MEMBER_NO")
    private String memberNo;
    @Column(name = "MEMBER_NAME")
    private String memberName;
    @ManyToOne
    @JoinColumn(name= "DEP_NO")
    private Dep department;
    @ManyToOne
    @JoinColumn(name= "POSITION_NO")
    private Position position;
    protected Member() {}


}
