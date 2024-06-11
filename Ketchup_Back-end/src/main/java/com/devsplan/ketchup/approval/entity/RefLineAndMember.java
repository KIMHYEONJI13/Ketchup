package com.devsplan.ketchup.approval.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Entity(name = "refAndMember")
@Table(name = "TBL_REFLINE")
public class RefLineAndMember {
    @Id
    @Column(name = "REF_LINE_NO" )
    private int refLineNo;
    @Column(name = "APPROVAL_NO")
    private int approvalNo;
    @OneToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member refMember;

    protected RefLineAndMember(){}

}
