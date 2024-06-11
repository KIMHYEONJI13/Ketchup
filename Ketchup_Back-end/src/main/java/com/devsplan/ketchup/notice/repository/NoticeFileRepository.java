package com.devsplan.ketchup.notice.repository;

import com.devsplan.ketchup.notice.entity.NoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeFileRepository extends JpaRepository <NoticeFile, Integer> {
    List<NoticeFile> findByNoticeNo(int noticeNo);
}
