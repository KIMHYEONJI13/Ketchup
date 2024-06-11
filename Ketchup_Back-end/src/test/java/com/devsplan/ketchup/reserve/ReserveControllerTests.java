package com.devsplan.ketchup.reserve;

import com.devsplan.ketchup.reserve.controller.ReserveController;
import com.devsplan.ketchup.reserve.service.ReserveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.time.LocalDate;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ReserveControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ReserveService reserveService;

    private final String token = "Bearer eyJkYXRlIjoxNzE2Mjg4NTU0MjcwLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6NSwiaW1nVXJsIjoiNzY1NWY5YzkxYjYyNDMxZjg4OTYyYmMxYjY4ZjIzZTUucG5nIiwibWVtYmVyTm8iOiI1IiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDUiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwibWVtYmVyTmFtZSI6Iuq5gO2YhOyngCIsInBvc2l0aW9uTm8iOjIsImV4cCI6MTcxNjM3NDk1NCwiZGVwTmFtZSI6IuuyleustO2MgCJ9.nSobZzOER9U775YF6bwb5zUbyS2y80BoWMHBkTKJIqI";

    private RequestBuilder request;

    @DisplayName("자원 예약 목록 조회 컨트롤러 테스트")
    @Test
    void selectReserveList() throws Exception {
        // given
        String rscCategory = "회의실";
        LocalDate rsvDate = LocalDate.of(2024, 5, 10);
        String formattedDate = rsvDate.toString();

        // when & then
        mvc.perform(MockMvcRequestBuilders.get("/reserves")
                        .param("category", rscCategory)
                        .param("date", formattedDate)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    //        // when
    //        request = get("/reserves/" + rsvNo).header("Authorization", token);
    //
    //        // then
    //        mvc.perform(request)
    //                .andExpect(status().isOk())
    //                .andDo(print());

//    @DisplayName("자원 예약 목록 조회 컨트롤러 테스트")
//    @Test
//    void selectReserveListControllerTest() throws Exception {
//        // given
//        String rscCategory = "회의실";
//        LocalDate rsvDate = LocalDate.of(2024, 5, 10);
//        String formattedDate = rsvDate.toString();
//
//        // 모의 데이터 생성
//        ResourceDTO resourceDTO1 = new ResourceDTO();
//        resourceDTO1.setRscNo(1);
//        ResourceDTO resourceDTO2 = new ResourceDTO();
//        resourceDTO2.setRscNo(2);
//
//        List<Object[]> foundReserve = new ArrayList<>();
//        Object[] reserve1 = new Object[]{resourceDTO1, "User1", 1, "Description1", LocalDateTime.now(), LocalDateTime.now()};
//        Object[] reserve2 = new Object[]{resourceDTO2, "User2", 2, "Description2", LocalDateTime.now(), LocalDateTime.now()};
//        foundReserve.add(reserve1);
//        foundReserve.add(reserve2);
//
//        // ReserveService를 직접 호출하여 반환 값 설정
//        Mockito.when(reserveService.selectReserveList(eq(rscCategory), eq(rsvDate))).thenReturn(foundReserve);
//
//        // when
//        RequestBuilder request = MockMvcRequestBuilders.get("/reserves")
//                .param("category", rscCategory)
//                .param("date", formattedDate)
//                .header("Authorization", token);
//
//        // then
//        mvc.perform(request)
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andExpect(jsonPath("$.code").value(200))
//                .andExpect(jsonPath("$.message").value("조회 성공"))
//                .andExpect(jsonPath("$.data.reserve", hasSize(2)))
//                .andExpect(jsonPath("$.data.reserve[0].resources").isMap())
//                .andExpect(jsonPath("$.data.reserve[0].reserver").value("User1"))
//                .andExpect(jsonPath("$.data.reserve[0].rsvNo").value(1))
//                .andExpect(jsonPath("$.data.reserve[0].rsvDescr").value("Description1"))
//                .andExpect(jsonPath("$.data.reserve[0].rsvStartDttm").exists())
//                .andExpect(jsonPath("$.data.reserve[0].rsvEndDttm").exists())
//                .andExpect(jsonPath("$.data.reserve[1].resources").isMap())
//                .andExpect(jsonPath("$.data.reserve[1].reserver").value("User2"))
//                .andExpect(jsonPath("$.data.reserve[1].rsvNo").value(2))
//                .andExpect(jsonPath("$.data.reserve[1].rsvDescr").value("Description2"))
//                .andExpect(jsonPath("$.data.reserve[1].rsvStartDttm").exists())
//                .andExpect(jsonPath("$.data.reserve[1].rsvEndDttm").exists())
//                .andDo(print());
//    }


    @DisplayName("자원 예약 상세 조회 컨트롤러 테스트")
    @Test
    void selectReserveDetail() throws Exception {
        // given
        int rsvNo = 23;

        // when
        request = get("/reserves/" + rsvNo).header("Authorization", token);

        // then
        mvc.perform(request)
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("자원 예약 등록 컨트롤러 테스트")
    @Test
    void insertReserve() throws Exception {
        // given
        String jsonbody = "{ " +
                "\"rsvStartDttm\": \"2024-05-10 오후 3시 0분\", " +
                "\"rsvEndDttm\": \"2024-05-10 오후 4시 30분\", " +
                "\"rsvDescr\": \"ReserveControllerTests에서 등록한 예약건\", " +
                "\"reserver\": \"5\", " +
                "\"resources\": { " +
                "\"rscNo\": 2, " +
                "\"rscCategory\": \"법인차량\", " +
                "\"rscName\": \"황금마티즈\", " +
                "\"rscInfo\": \"본관 지하 1층 주차장 B20 영역\", " +
                "\"rscCap\": 4, " +
                "\"rscIsAvailable\": true, " +
                "\"rscDescr\": \"4인용 소형 차량\" " +
                "}" +
                "}";

        // when
        request = MockMvcRequestBuilders.post("/reserves")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonbody)
                .header("Authorization", token);

        // then
        mvc.perform(request)
                .andExpect(status().isCreated());
    }

//    @DisplayName("자원 예약 수정 컨트롤러 테스트")
//    @Test
//    void updateReserve() throws Exception {
//        // given
//        int rsvNo = 6;
//        String updatedDescr = "rsvNo 6 예약건 수정의 건";
//        LocalDateTime updatedStartDttm = LocalDateTime.of(2024, 5, 8, 13, 0);
//        LocalDateTime updatedEndDttm = LocalDateTime.of(2024, 5, 8, 13, 30);
//
//        String jsonbody = "{" +
//                "\"rsvDescr\": \"" + updatedDescr + "\"," +
//                "\"rsvStartDttm\": \"" + updatedStartDttm.format(DateTimeFormatter.ofPattern("yyyy-MM-dd a h시 m분")) + "\"," +
//                "\"rsvEndDttm\": \"" + updatedEndDttm.format(DateTimeFormatter.ofPattern("yyyy-MM-dd a h시 m분")) + "\"" +
//                "}";
//
//        // when
//        MvcResult result = mvc.perform(MockMvcRequestBuilders.put("/reserves/" + rsvNo)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonbody)
//                        .header("Authorization", token))
//                        .andReturn();
//
//        // then
//        int status = result.getResponse().getStatus();
//        Assertions.assertEquals(200, status);
//
//        // 수정된 예약 정보를 다시 조회하여 검증
//        ReserveDTO updatedReserve = reserveService.selectReserveDetail(rsvNo);
//        Assertions.assertNotNull(updatedReserve);
//        Assertions.assertEquals(updatedDescr, updatedReserve.getRsvDescr());
//        Assertions.assertEquals(updatedStartDttm, updatedReserve.getRsvStartDttm());
//        Assertions.assertEquals(updatedEndDttm, updatedReserve.getRsvEndDttm());
//    }

    @DisplayName("자원 예약 삭제 컨트롤러 테스트")
    @Test
    void deleteReserve() throws Exception {
        // given
        int rsvNo = 12;

        // when
         MvcResult result = mvc.perform(MockMvcRequestBuilders.delete("/reserves/" + rsvNo)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", token))
                                .andReturn();

        // then
        int status = result.getResponse().getStatus();
        Assertions.assertEquals(204, status);
    }

    }
