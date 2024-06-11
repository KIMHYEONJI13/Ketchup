package com.devsplan.ketchup.mail.repository;

import com.devsplan.ketchup.mail.entity.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;
import java.sql.Timestamp;
import java.util.List;

public interface ReceiverRepository  extends JpaRepository<Receiver, Integer> {
    List<Receiver> findByReceiverMemAndReceiverDelStatus(String receiverMem, char delStatus);
    List<Receiver> findByMailNo(int mailNo);
    Receiver findByMailNoAndReceiverMem(int mailNo, String memberNo);
    List<Receiver> findByReceiverMemAndReadTimeAndReceiverDelStatus(String memberNo, Timestamp readTime, char delStatus);
}