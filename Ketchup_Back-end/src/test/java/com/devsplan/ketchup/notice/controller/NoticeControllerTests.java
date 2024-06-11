package com.devsplan.ketchup.notice.controller;

import com.devsplan.ketchup.notice.dto.NoticeDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class NoticeControllerTests {

    // 공지 push 전달용
    // test 코드

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("공지 등록")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void insertNotice() throws Exception {
        // given
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setMemberNo("5");
        noticeDTO.setNoticeTitle("공지 제목5");
        noticeDTO.setNoticeContent("공지 내용5");
        noticeDTO.setNoticeFix('N');

        String json = new ObjectMapper().writeValueAsString(noticeDTO);
        MockMultipartFile jsonFile = new MockMultipartFile("noticeDTO", "", MediaType.APPLICATION_JSON_VALUE, json.getBytes());

        MockMultipartFile files = new MockMultipartFile("files", "text.txt", MediaType.TEXT_PLAIN_VALUE, "test file content".getBytes());
        //when
        //then
        mockMvc.perform(multipart("/notices")
                        .file(jsonFile)
                        .file(files)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }

    @DisplayName("공지 수정")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void updateNotice() throws Exception {
        // given
        int noticeNo = 4;
        String memberNo = "5";

        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setNoticeTitle("공지 제목 수정");
        noticeDTO.setNoticeContent("공지 내용 수정");
        noticeDTO.setNoticeFix('Y');

        String json = new ObjectMapper().writeValueAsString(noticeDTO);

        MockMultipartFile jsonFile = new MockMultipartFile("noticeDTO", "", MediaType.APPLICATION_JSON_VALUE, json.getBytes());

        // case 1: 파일이 있는 경우
//        MockMultipartFile filesExists = new MockMultipartFile("files", "text.txt", MediaType.TEXT_PLAIN_VALUE, "test updatefile content".getBytes());
//
//        // when
//        mockMvc.perform(multipart("/notices/{noticeNo}", noticeNo)
//                        .file(jsonFile)
//                        .file(filesExists)
//                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                // then
//                .andExpect(status().isOk());


        // case 2: 파일을 추가하지 않은 경우
        // when
        MockMultipartFile filesNotExists = new MockMultipartFile("files", "filename.txt", MediaType.TEXT_PLAIN_VALUE, new byte[0]);

        // When & Then
        mockMvc.perform(multipart("/notices/{noticeNo}", noticeNo)
                        .file(jsonFile)
                        .file(filesNotExists)
                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());

        // case 3: 파일을 삭제하는 경우
//        MockMultipartFile emptyFile = new MockMultipartFile("files", "".getBytes());
//
//        // when
//        mockMvc.perform(multipart("/notices/{noticeNo}", noticeNo)
//                        .file(jsonFile)
//                        .file(emptyFile)
//                        .param("memberNo", String.valueOf(memberNo)) // memberNo 전달
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                // then
//                .andExpect(status().isOk());

    }

    @DisplayName("공지 삭제")
    @Test
    @WithMockUser(username="김현지", authorities={"LV2"})
    void deleteNotice() throws Exception {
        // given
        int noticeNo = 4;
        String memberNo = "5";

        // when
        // then
        mockMvc.perform(delete("/notices/{noticeNo}", noticeNo)
                        .param("memberNo", String.valueOf(memberNo))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("삭제 성공"))
                .andExpect(jsonPath("$.data").exists())
                .andReturn();

    }

}
