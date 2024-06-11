package com.devsplan.ketchup.notice.service;

import com.devsplan.ketchup.board.dto.BoardDTO;
import com.devsplan.ketchup.common.Criteria;
import com.devsplan.ketchup.notice.dto.NoticeDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.NoSuchFileException;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class NoticeServiceTests {

    @Autowired
    private NoticeService noticeService;

    @DisplayName("공지 목록조회 & 페이징 & 목록 제목검색 조회")
    @Test
    void selectNoticeList() {
        // given
        Criteria cri = new Criteria(Integer.valueOf(1),10);
        String title = "공지제목1";

        // when
//        Page<NoticeDTO> noticeList = noticeService.selectNoticeList(cri, title);

        // then
//        Assertions.assertNotNull(noticeList);

    }

    @DisplayName("공지 상세 조회(첨부파일 다운)")
    @Test
    void selectNoticeDetail() {
        // given
        int noticeNo = 1;

        // when
        NoticeDTO foundNotice = noticeService.selectNoticeDetail(noticeNo);

        // then
        Assertions.assertNotNull(foundNotice);
    }

    @DisplayName("공지 등록")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void insertNotice() {
        // given
        String memberNo = "5";
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setNoticeTitle("공지 제목5");
        noticeDTO.setNoticeContent("공지 내용5");
        noticeDTO.setNoticeFix('N');

        // when
        // then
        Assertions.assertDoesNotThrow(
                () -> noticeService.insertNotice(noticeDTO, memberNo)
        );
    }

    @DisplayName("공지 등록(첨부파일)")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void insertNoticeWithFile() throws IOException {
        // given
        InputStream inputStream = getClass().getResourceAsStream("/test3.text");
        MultipartFile multipartFile = new MockMultipartFile("test3", "test3-text.text", "text/text", inputStream);

        String memberNo = "5";
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setNoticeTitle("공지 제목8");
        noticeDTO.setNoticeContent("공지 내용8");
        noticeDTO.setNoticeFix('N');

        // when
        List<MultipartFile> files = new ArrayList<>();
        files.add(multipartFile);

        // then
        Assertions.assertDoesNotThrow(
                () -> noticeService.insertNoticeWithFile(noticeDTO, files, memberNo)
        );
    }

    @DisplayName("공지 수정")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void updateNotice() {
        // given
        int noticeNo = 3;
        String memberNo = "5";

        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setNoticeTitle("공지 제목 수정");
        noticeDTO.setNoticeContent("공지 내용 수정");
        noticeDTO.setNoticeFix('Y');

        // when
//        String result = noticeService.updateNotice(noticeNo, noticeDTO, memberNo);

        // then
//        Assertions.assertEquals(result, "공지 수정 성공");
    }

    @DisplayName("공지 수정(첨부파일)")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void updateNoticeWithFile() throws IOException {
        // given
        int noticeNo = 1;
        String memberNo = "5";

        InputStream inputStream1 = getClass().getResourceAsStream("/test-img1.png");
        InputStream inputStream2 = getClass().getResourceAsStream("/test-img2.png");

        MultipartFile multipartFile1 = new MockMultipartFile("test1", "test-img1.png", "image/png", inputStream1);
        MultipartFile multipartFile2 = new MockMultipartFile("test2", "test-img2.png", "image/png", inputStream2);

        List<MultipartFile> files = Arrays.asList(multipartFile1, multipartFile2);

        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setNoticeTitle("공지 제목 수정2");
        noticeDTO.setNoticeContent("공지 내용 수정2");
        noticeDTO.setNoticeFix('Y');

        // when
//        String result = noticeService.updateNoticeWithFile(noticeNo, noticeDTO, files, memberNo);

        // then
//        Assertions.assertEquals(result, "공지 수정 성공");
    }

    @DisplayName("공지 삭제")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void deleteNotice() throws NoSuchFileException {
        // given
        int noticeNo = 3;
        String memberNo = "5";

        // when
        noticeService.deleteNotice(noticeNo, memberNo);

        // then
        assertThrows(ChangeSetPersister.NotFoundException.class, () -> noticeService.getNoticeById(noticeNo));
    }
}
