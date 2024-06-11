package com.devsplan.ketchup.mail;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class MailControllerTests {
    @Autowired
    MockMvc mockMvc;
    private final String token = "Bearer eyJkYXRlIjoxNzE0OTg4MTk4MTQ4LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6MiwibWVtYmVyTm8iOiIyIiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDIiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwicG9zaXRpb25ObyI6MiwiZXhwIjoxNzE1MDc0NTk4fQ.psCM1hN3eR7NSGwSJvOyStF7j1xOWuYyC7-JAJ75Q1c";

//    @DisplayName("메일 등록")
//    @Test
//    void insertMail() throws Exception {
//        String jjson = "{" +
//                "\"senderMem\" : \"2\"," +
//                "\"mailTitle\" : \"테스트 메일 제목\"," +
//                "\"mailContent\" : \"테스트 메일 내용\"," +
//                "\"sendCancelStatus\" : 'N'," +
//                "\"sendDelStatus\" : 'N'," +
//                "\"receiverMem\" : \"1\"" +
//                "}";
//
//        MockMultipartFile multipartFile = new MockMultipartFile("multipartFileList", "image.png", MediaType.IMAGE_PNG_VALUE, "image".getBytes());
//
//        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.POST, "/mails")
//                        .file(multipartFile)
//                        .param("mail.senderMem", "2")
//                        .param("mail.mailTitle", "테스트 메일")
//                        .param("mail.mailContent", "테스트 메일 내용")
//                        .param("mail.sendCancelStatus", "N")
//                        .param("mail.sendDelStatus", "N")
//                        .param("receiver.receiverMem", "3")
//                        .param("receiverDelStatus", "N")
//                        .header("Authorization", token)
//                )
//                .andExpect(status().isOk())
//                .andDo(print());
//
//        mockMvc.perform(
//                multipart(HttpMethod.POST, "/mails")
//                        .file(multipartFile)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jjson))
//                .andExpect(status().isOk())
//                .andDo(print());
//    }

    @DisplayName("보낸 메일 조회")
    @Test
    void selectSendMail() throws Exception {
        // given
        String search = "메일 제목";
        String searchValue = "검색어1";

        // when

        //then
        mockMvc.perform(get("/mails?part=send" + "&search=" + search + "&searchValue=" + searchValue)
                        .header("Authorization", token)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("받은 메일 조회")
    @Test
    void selectReceiverMail() throws Exception {
        // given
        String search = "메일 작성";
        String searchValue = "홍길동";

        mockMvc.perform(get("/mails?pat=receiver" + "&search=" + search + "&searchValue=" + searchValue)
                        .header("Authorization", token)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("메일 상세 조회")
    @Test
    void selectMailDetail() throws Exception {
        // given
        int mailNo = 1;

        // when

        // then
        mockMvc.perform(get("/mails/" + mailNo)
                        .header("Authorization", token)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("메일 발송 취소")
    @Test
    void cancelSendMail() {
        // given
        int mailNo = 1;

        // when

        // then

    }

    @DisplayName("메일 삭제")
    @Test
    void deleteSendMail() throws Exception {
        // given
        int delMailNo = 1;

        // when

        // then
        mockMvc.perform(delete("/mails")
                        .param("mailNo", "1")
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("답장")
    @Test
    void replyMail() throws Exception {
        // given
        int prevMail = 1;

        // when

        // then
        mockMvc.perform(post("/mails/" + prevMail + "/reply")
                        .param("mail.senderMem", "3")
                        .param("mail.mailTitle", "RE:메일 답장")
                        .param("mail.mailContent", "메일 답장 내용")
                        .param("mail.sendCancelStatus", "N")
                        .param("mail.sendDelStatus", "N")
                        .param("receiver.receiverMem", "2")
                        .param("receiverDelStatus", "N")
                        .header("Authorization", token)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }
}