package com.devsplan.ketchup.rsc;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class RscControllerTests {
    @Autowired
    MockMvc mockMvc;
    private final String token = "Bearer eyJkYXRlIjoxNzE0OTg4MTk4MTQ4LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6MiwibWVtYmVyTm8iOiIyIiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDIiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwicG9zaXRpb25ObyI6MiwiZXhwIjoxNzE1MDc0NTk4fQ.psCM1hN3eR7NSGwSJvOyStF7j1xOWuYyC7-JAJ75Q1c";

    @DisplayName("자원 등록")
    @Test
    void insertResource() throws Exception {
        // given
        String resourcePart = "회의실";

        String jjson = "{" +
                " \"rscCategory\" : \"회의실\", " +
                " \"rscName\" : \"회의실A\", " +
                " \"rscInfo\" : \"3층 303호\", " +
                " \"rscCap\" : 8, " +
                " \"rscIsAvailable\" : false " +
                "}";

        // then
        mockMvc.perform(post("/resources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jjson)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("자원 조회 - 회의실")
    @Test
    void selectResource() throws Exception {
        mockMvc.perform(get("/resources?part=conferences")
                    .header("Authorization", token)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("자원 상세 조회")
    @Test
    void selectResourceDetail() throws Exception {
        int rscNo = 1;
        mockMvc.perform(get("/resources/" + rscNo))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("자원 수정")
    @Test
    void updateResource() throws Exception {
        int rscNo = 1;
        String jjson = "{" +
                "\"rscIsAvailable\" : true,"  +
                "\"rscDescr\" : \"비고 수정입니다.\"" +
                "}";

        mockMvc.perform(put("/resources/" + rscNo)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jjson)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("자원 삭제")
    @Test
    void deleteResource() throws Exception {
        int rscNo = 1;

        mockMvc.perform(delete("/resource/" + rscNo))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
