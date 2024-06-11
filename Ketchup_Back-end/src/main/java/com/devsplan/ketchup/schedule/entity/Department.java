package com.devsplan.ketchup.schedule.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "TBL_DEPARTMENT")
@AllArgsConstructor
@Getter
@ToString
public class Department {
    @Id
    @Column(name = "DPT_NO")
    private int dptNo;

    protected Department() {}
}
