package com.devsplan.ketchup.board.service;

import com.devsplan.ketchup.board.dto.BoardDTO;
import com.devsplan.ketchup.board.repository.BoardRepository;
import com.devsplan.ketchup.common.Criteria;
import com.devsplan.ketchup.common.PageDTO;
import com.devsplan.ketchup.common.PagingResponseDTO;
import com.devsplan.ketchup.util.FileUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertFalse;


@SpringBootTest
@AutoConfigureMockMvc
public class BoardServiceTests {

    @Autowired
    private BoardService boardService;

    @Autowired
    private BoardRepository boardRepository;

    @DisplayName("자료실 게시물 등록")
    @Test
    void insertBoard() throws IOException {
        // given
        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setMemberNo("2");
        boardInfo.setDepartmentNo(1);
        boardInfo.setBoardTitle("title1");
        boardInfo.setBoardContent("content1");
        boardInfo.setBoardCreateDttm(new Timestamp(System.currentTimeMillis()));
        //when
//        String result = boardService.insertBoard(boardInfo);

        //then
//        Assertions.assertEquals(result, "성공");
    }

    @DisplayName("자료실 게시물 등록(파일첨부)")
    @Test
    void insertBoardWithFile() throws IOException {
        // given
        // 이미지 파일 가져오기
        InputStream inputStream = getClass().getResourceAsStream("/test.png");
        MultipartFile multipartFile = new MockMultipartFile("test.png", "test-img.png", "image/png", inputStream);

        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setMemberNo("8");
        boardInfo.setDepartmentNo(3);
        boardInfo.setBoardTitle("title6");
        boardInfo.setBoardContent("content6");
        boardInfo.setBoardCreateDttm(new Timestamp(System.currentTimeMillis()));

        System.out.println("boardInfo : " + boardInfo);

        // when
        Map<String, Object> result = new HashMap<>();

        try {
            List<MultipartFile> files = new ArrayList<>();
            files.add(multipartFile);
            boardService.insertBoardWithFile(boardInfo, files);
            result.put("result", true);
        } catch (Exception e) {
            result.put("result", false);
        }

        // then
        Assertions.assertTrue((Boolean) result.get("result"));
    }


    @DisplayName("자료실 게시물 목록조회 & 페이징 & 목록 제목검색 조회")
    @Test
    void selectBoardList() {
        //given
        int departmentNo = 1;

        Criteria cri = new Criteria(Integer.valueOf(1),10);
        String title = "";
        //when
        Page<BoardDTO> boardList = boardService.selectBoardList(departmentNo, cri, title);

        //then
//        Assertions.assertNotNull(boardList);
//        boardList.forEach(System.out::println);
    }

    @DisplayName("자료실 게시물 상세조회")
    @Test
    void selectBoardDetail() {
        //given
        int boardNo = 1;

        //when
        BoardDTO foundBoard = boardService.selectBoardDetail(boardNo);

        //then
        Assertions.assertNotNull(foundBoard);
    }


    @DisplayName("자료실 게시물 수정")
    @Test
    void updateBoard() {
        // given
        int boardNo = 2;
        String memberNo = "2";

        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setBoardTitle("title1");
        boardInfo.setBoardContent("content content");
        boardInfo.setBoardUpdateDttm(new Timestamp(System.currentTimeMillis()));

        //when
//        String result = boardService.updateBoard(boardNo, boardInfo, memberNo);

        //then
//        Assertions.assertEquals(result, "성공");
    }

    @DisplayName("자료실 게시물 수정(첨부파일)")
    @Test
    void updateBoardWithFile() throws IOException {
        // given
        int boardNo = 15;
        String memberNo = "5";
        InputStream inputStream1 = getClass().getResourceAsStream("/test-img1.png");
        InputStream inputStream2 = getClass().getResourceAsStream("/test-img2.png");

        MultipartFile multipartFile1 = new MockMultipartFile("test1.png", "test-img1.png", "image/png", inputStream1);
        MultipartFile multipartFile2 = new MockMultipartFile("test2.png", "test-img2.png", "image/png", inputStream2);

        List<MultipartFile> files = Arrays.asList(multipartFile1, multipartFile2);

        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setBoardNo(7);
        boardInfo.setMemberNo("3");
        boardInfo.setBoardTitle("Updated Title");
        boardInfo.setBoardContent("Updated Content");
        boardInfo.setBoardUpdateDttm(new Timestamp(System.currentTimeMillis()));

        // when
//        String result = boardService.updateBoardWithFile(boardNo, boardInfo, files, memberNo);

        // then
//        Assertions.assertEquals(result, "게시물 수정 성공");
    }

    @DisplayName("자료실 게시물 삭제")
    @Test
    void deleteBoard() {
        // given
        int boardNo = 7;
        String memberNo = "3";

        // when
        boardService.deleteBoard(boardNo, memberNo);

        // then
        assertFalse(boardRepository.existsById(boardNo));
    }
}


