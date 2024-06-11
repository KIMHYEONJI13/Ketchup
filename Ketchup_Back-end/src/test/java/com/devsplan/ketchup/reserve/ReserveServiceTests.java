package com.devsplan.ketchup.reserve;

import com.devsplan.ketchup.reserve.dto.ReserveDTO;
import com.devsplan.ketchup.reserve.entity.Reserve;
import com.devsplan.ketchup.reserve.repository.ReserveRepository;
import com.devsplan.ketchup.reserve.service.ReserveService;
import com.devsplan.ketchup.rsc.dto.ResourceDTO;
import com.devsplan.ketchup.rsc.entity.Resource;
import com.devsplan.ketchup.rsc.repository.RscRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Stream;

@SpringBootTest
public class ReserveServiceTests {

    @Autowired
    private ReserveService reserveService;

    @Autowired
    private ReserveRepository reserveRepository;

    @Autowired
    private RscRepository resourceRepository;

    @PersistenceContext
    private EntityManager manager;

    @DisplayName("자원 예약 목록 조회")
    @Test
    void selectReserveList() {
        // given
        String rscCategory = "회의실";
        LocalDateTime startOfDay = LocalDateTime.of(2024, 5, 10, 0, 0);
        LocalDateTime endOfDay = LocalDateTime.of(2024, 5, 10, 23, 59);

        // when
        List<ReserveDTO> foundReserve = reserveService.getReserveWithResources(rscCategory, startOfDay, endOfDay);

        // then
        Assertions.assertNotNull(foundReserve);
        System.out.println("자원 예약 목록 조회 = " + foundReserve);
    }



    private static Stream<Arguments> getResourceInfo() {
        return Stream.of(
                Arguments.of(
                        1,
                        "회의실",
                        "회의실 A",
                        "별관 3층 301호",
                        10,
                        true,
                        "Smart TV, 빔프로젝터, 책상, 의자 비치"
                ),
                Arguments.of(
                        2,
                        "법인차량",
                        "황금마티즈",
                        "본관 지하 1층 주차장 B20 영역",
                        4,
                        true,
                        "4인용 소형 차량"
                ),
                Arguments.of(
                        3,
                        "회의실",
                        "회의실 B",
                        "본관 4층 401호",
                        20,
                        true,
                        "Smart TV, 빔프로젝터, 책상, 의자, 단상 비치, 경복궁 뷰"
                )
        );
    }

    private static Stream<Arguments> getReserveInfo() {
        return Stream.of(
                Arguments.of(
                        "3",
                        "이진우",
                        LocalDateTime.of(2024, 6, 23, 13, 30),
                        LocalDateTime.of(2024, 6, 23, 18, 0),
                        5,
                        "회의실A 자원 예약",
                        "회의실",
                        "회의실 A",
                        "별관 3층 301호",
                        10,
                        true,
                        "5월 첫째주 위클리 미팅"
                ),
                Arguments.of(
                        "3",
                        "이진우",
                        LocalDateTime.of(2024, 6, 23, 10, 0),
                        LocalDateTime.of(2024, 6, 23, 12, 0),
                        5,
                        "물류 창고 방문",
                        "법인차량",
                        "황금마티즈",
                        "본관 지하 1층 주차장 B20 영역",
                        4,
                        true,
                        "물류 창고 방문을 위한 법인 차량 대여"
                ),
                Arguments.of(
                        "3",
                        "이진우",
                        LocalDateTime.of(2024, 6, 23, 15, 0),
                        LocalDateTime.of(2024, 6, 23, 17, 0),
                        5,
                        "진급식",
                        "회의실",
                        "회의실 B",
                        "본관 4층 401호",
                        8,
                        true,
                        "이대리 등 30명 진급 축하식을 위한 진급식 진행"
                ),
                Arguments.of(
                        "2",
                        "박다은",
                        LocalDateTime.of(2024, 6, 23, 17, 0),
                        LocalDateTime.of(2024, 6, 23, 17, 30),
                        5,
                        "미국 바이어와 화상 미팅",
                        "회의실",
                        "회의실 B",
                        "본관 4층 401호",
                        8,
                        true,
                        "미국 바이어와 2024년 Q4 런칭 제품의 선박 일정 관련 줌 미팅"
                )
        );
    }

    @DisplayName("자원 등록 테스트")
    @ParameterizedTest
    @MethodSource("getResourceInfo")
    public void insertResourceTest(int rscNo, String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        // given
        ResourceDTO resourceDTO = new ResourceDTO(rscNo, rscCategory, rscName, rscInfo, rscCap, rscIsAvailable, rscDescr);

        // when & then
        Assertions.assertDoesNotThrow(() -> reserveService.insertResource(resourceDTO));
    }

    @DisplayName("자원 예약 등록 테스트")
    @ParameterizedTest
    @MethodSource("getReserveInfo")
    public void insertReserveTest(String reserverId, String reserverName, LocalDateTime rsvStartDttm, LocalDateTime rsvEndDttm, int rscNo, String rsvDescr, String rscCategory, String rscName, String rscInfo, int rscCap, boolean rscIsAvailable, String rscDescr) {
        // given
        ResourceDTO resourceDTO = new ResourceDTO(rscNo, rscCategory, rscName, rscInfo, rscCap, rscIsAvailable, rscDescr);
        ReserveDTO newReserve = new ReserveDTO(
                rsvDescr,
                rsvStartDttm,
                rsvEndDttm,
                reserverId,
                reserverName,
                resourceDTO
        );

        // when, then
        Assertions.assertDoesNotThrow(() -> {
            Resource resource = reserveService.getResourceFromDatabase(rscNo);
            reserveService.insertReserve(newReserve, resource);
        });
    }

    @DisplayName("자원 예약 수정 서비스 테스트")
    @Test
    void updateReserve() {
        // given
        int rsvNo = 13;
        LocalDateTime updatedStartDttm = LocalDateTime.of(2024, 5, 9, 12, 30);
        LocalDateTime updatedEndDttm = LocalDateTime.of(2025, 5, 9, 13, 30);
        String updatedDescr = "자원 예약 수정";

        ReserveDTO updateReserve = new ReserveDTO(
                rsvNo,
                updatedDescr,
                updatedStartDttm,
                updatedEndDttm,
                null
        );

        String memberNo = "5";

        // when
        Assertions.assertDoesNotThrow(() -> reserveService.updateReserve(rsvNo, memberNo, updateReserve));

        // then
        Reserve updatedReserve = reserveRepository.findById((long) rsvNo).orElseThrow();
        Assertions.assertNotNull(updatedReserve);
        Assertions.assertEquals(updatedStartDttm, updatedReserve.getRsvStartDttm());
        Assertions.assertEquals(updatedEndDttm, updatedReserve.getRsvEndDttm());
        Assertions.assertEquals(updatedDescr, updatedReserve.getRsvDescr());
    }

    @DisplayName("자원 예약 삭제")
    @Test
    void deleteReserve() {
        // given
        int rsvNo = 20;
        String memberNo = "3";

        // when, then
        Assertions.assertDoesNotThrow(() -> reserveService.deleteById(rsvNo, memberNo));
        Assertions.assertThrows(NoSuchElementException.class, () -> reserveRepository.findById((long) rsvNo).orElseThrow());
    }
}
