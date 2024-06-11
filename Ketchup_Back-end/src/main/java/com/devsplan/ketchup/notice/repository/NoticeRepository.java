package com.devsplan.ketchup.notice.repository;

import com.devsplan.ketchup.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository <Notice, Integer> {
    Notice findTopByNoticeNoLessThanOrderByNoticeNoDesc(int noticeNo);

    Notice findTopByNoticeNoGreaterThanOrderByNoticeNoAsc(int noticeNo);
}
