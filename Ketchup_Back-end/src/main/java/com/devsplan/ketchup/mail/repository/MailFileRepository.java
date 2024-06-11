package com.devsplan.ketchup.mail.repository;

import com.devsplan.ketchup.mail.entity.MailFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MailFileRepository extends JpaRepository<MailFile, Integer> {
    List<MailFile> findByMailNo(int mailNo);
}
