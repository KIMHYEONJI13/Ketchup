package com.devsplan.ketchup.board.controller;
import com.devsplan.ketchup.board.dto.BoardDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BoardControllerTests {


    @Autowired
    private MockMvc mockMvc;

    @DisplayName("자료실 게시물 등록")
    @Test
    void insertBoard() throws Exception {
        // given
        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setMemberNo("4");
        boardInfo.setDepartmentNo(3);
        boardInfo.setBoardTitle("title1");
        boardInfo.setBoardContent("content7");

        // 파일 업로드
        String json = new ObjectMapper().writeValueAsString(boardInfo);
        MockMultipartFile jsonFile = new MockMultipartFile("boardInfo", "", MediaType.APPLICATION_JSON_VALUE, json.getBytes());

        MockMultipartFile files = new MockMultipartFile("files", "text.txt", MediaType.TEXT_PLAIN_VALUE, "test file content".getBytes());
        //when
        //then
        mockMvc.perform(multipart("/boards")
                        .file(jsonFile)
                        .file(files)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                        .andExpect(status().isOk());

    }

    @DisplayName("자료실 게시물 목록조회 & 페이징 & 목록 제목검색 조회")
    @Test
    void selectBoardList() throws Exception {
        //given
        int departmentNo = 1;
        int page = 0;
        int size = 10;
        String title = "게시물1";

        //when
        //then
        mockMvc.perform(get("/boards")
                .contentType(MediaType.APPLICATION_JSON)
                .param("departmentNo", String.valueOf(departmentNo))
                .param("title", title)
                .param("page", String.valueOf(page))
                .param("size", String.valueOf(size)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("목록 조회 성공"))
                .andExpect(jsonPath("$.data").exists())
                .andReturn();
    }

    @DisplayName("자료실 게시물 상세조회")
    @Test
    void selectBoardDetail() throws Exception {
        //given
        int boardNo = 9;
        //when
        //then
        mockMvc.perform(get("/boards")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("boardNo", String.valueOf(boardNo)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.status").value(200))
                        .andExpect(jsonPath("$.message").value("상세 조회 성공"))
                        .andExpect(jsonPath("$.data").exists())
                        .andReturn();
    }


    @DisplayName("자료실 게시물 수정")
    @Test
    void updateBoard() throws Exception {
        //given
        int boardNo = 8;
        int memberNo = 3;
        BoardDTO boardInfo = new BoardDTO();
        boardInfo.setBoardTitle("Updated Title8.1");
        boardInfo.setBoardContent("Updated Content8.1");
        String json = new ObjectMapper().writeValueAsString(boardInfo);

        MockMultipartFile jsonFile = new MockMultipartFile("boardInfo", "", MediaType.APPLICATION_JSON_VALUE, json.getBytes());

          // case 1: 파일이 있는 경우
//        MockMultipartFile filesExists = new MockMultipartFile("files", "text.txt", MediaType.TEXT_PLAIN_VALUE, "test updatefile content".getBytes());
//
//        // when
//        mockMvc.perform(multipart("/boards/{boardNo}", boardNo)
//                        .file(jsonFile)
//                        .file(filesExists)
//                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                // then
//                .andExpect(status().isOk());


//        // case 2: 파일을 추가하지 않은 경우
//        // when
//        MockMultipartFile filesNotExists = new MockMultipartFile("files", "filename.txt", MediaType.TEXT_PLAIN_VALUE, new byte[0]);
//
//        // When & Then
//        mockMvc.perform(multipart("/boards/{boardNo}", boardNo)
//                        .file(jsonFile)
//                        .file(filesNotExists)
//                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                .andExpect(status().isOk());

        // case 3: 파일을 삭제하는 경우
        MockMultipartFile emptyFile = new MockMultipartFile("files", "".getBytes());

        // when
        mockMvc.perform(multipart("/boards/{boardNo}", boardNo)
                        .file(jsonFile)
                        .file(emptyFile)
                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                        // then
                        .andExpect(status().isOk());
    }

    @DisplayName("자료실 게시물 삭제")
    @Test
    void deleteBoard() throws Exception {
        //given
        int boardNo = 6;
        int memberNo = 3;
        //when
        //then
        mockMvc.perform(delete("/boards/{boardNo}", boardNo)
                        .param("memberNo", String.valueOf(memberNo))
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.status").value(200))
                        .andExpect(jsonPath("$.message").value("삭제 성공"))
                        .andExpect(jsonPath("$.data").exists())
                        .andReturn();
    }

}
