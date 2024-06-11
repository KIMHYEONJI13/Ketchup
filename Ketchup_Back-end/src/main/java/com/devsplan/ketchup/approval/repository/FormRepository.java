package com.devsplan.ketchup.approval.repository;

import com.devsplan.ketchup.approval.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<Form, Integer> {
}
