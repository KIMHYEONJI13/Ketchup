package com.devsplan.ketchup.approval.repository;

import com.devsplan.ketchup.approval.entity.AppFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppFileRepository extends JpaRepository<AppFile, Integer> {
}
