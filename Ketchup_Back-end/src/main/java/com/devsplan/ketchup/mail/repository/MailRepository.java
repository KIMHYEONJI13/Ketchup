package com.devsplan.ketchup.mail.repository;

import com.devsplan.ketchup.mail.entity.Mail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MailRepository extends JpaRepository<Mail, Integer> {
    Page<Mail> findBySenderMemAndSendDelStatusAndMailTitleContaining(String senderMem, char delStatus, String searchValue, Pageable paging);
    Mail findByMailNo(int mailNo);
    List<Mail> findByMailTitleContaining(String searchValue);
    Page<Mail> findBySenderMemAndSendDelStatus(String senderMem, char delStatus, Pageable paging);
    List<Mail> findBySenderMemContaining(String searchValue);
    Page<Mail> findBySenderMemAndSendDelStatusContaining(String senderMem, char n, String searchValue, Pageable paging);
}