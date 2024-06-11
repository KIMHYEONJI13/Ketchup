package com.devsplan.ketchup.member;


import com.devsplan.ketchup.common.Authority;
import com.devsplan.ketchup.member.dto.DepDTO;
import com.devsplan.ketchup.member.dto.MemberDTO;

import com.devsplan.ketchup.member.dto.PositionDTO;
import com.devsplan.ketchup.member.entity.Member;
import com.devsplan.ketchup.member.service.MemberService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Stream;

@SpringBootTest
public class MemberTest {

    @Autowired
    private MemberService memberService;


    private static Stream<Arguments> getMember() {
        return Stream.of(
                Arguments.of(
                        new MemberDTO(
                                "1",
                                "이후영",
                                "31558",
                                "01032283158",
                                "19940517",
                                'M',
                                "서울시강동구암사동",
                                "yihooyung@gmail.com",
                                "yihooyung@ketchup.com",
                                new DepDTO(
                                        1,
                                        "개발팀",
                                        'Y'
                                ),
                                new PositionDTO(
                                        1,
                                        "팀장",
                                        3,
                                        Authority.LV1,
                                        'Y'
                                ),
                                "계좌번호 01023",
                                "Y",
                                "memberFilePath"

                        )
                )
        );
    }

    private static Stream<Arguments> getDep() {
        return Stream.of(
                Arguments.of(
                        new DepDTO(
                                1,
                                "개발팀",
                                'Y'  // char로 수정
                        )
                )
        );

    }

    private static Stream<Arguments> getPosition() {
        return Stream.of(
                Arguments.of(

                        new PositionDTO(
                                1,
                                "팀장",
                                3,
                                Authority.LV1,
                                'Y'  // char로 수정
                        )

                )
        );
    }

    private static Stream<Arguments> getUpdatePosition() {
        return Stream.of(
                Arguments.of(

                        new PositionDTO(
                                1,
                                "직원",
                                3,
                                Authority.LV1,
                                'Y'  // char로 수정
                        )

                )
        );
    }




    @ParameterizedTest
    @MethodSource("getMember")
    void testInsertMember(MemberDTO member, MultipartFile memberImage) {
        // given
        // member 객체는 이미 getMember 메소드에서 생성된 값으로 주어집니다.

        // when
        // memberService.insertMember(member)를 호출하고 예외 발생 여부를 확인합니다.
        Assertions.assertDoesNotThrow(
                () -> {
                    // 멤버 추가 로직 실행
                    memberService.insertMember(member,memberImage);
                },
                "멤버 추가 중 예외가 발생했습니다."  // 예외 발생 시 메시지
        );


    }

    @ParameterizedTest
    @MethodSource("getDep")
    void testInsertDep(DepDTO dep) {
        // member 객체는 이미 getMember 메소드에서 생성된 값으로 주어집니
        Assertions.assertDoesNotThrow(
                () -> {

                    memberService.insertDep(dep);
                },
                "부서 추가 중 예외가 발생했습니다."  // 예외 발생 시 메시지
        );


    }

    @ParameterizedTest
    @MethodSource("getPosition")
    void testInsertPosition(PositionDTO positionDTO) {
        // given
        // member 객체는 이미 getMember 메소드에서 생성된 값으로 주어집니다.

        // when
        // memberService.insertMember(member)를 호출하고 예외 발생 여부를 확인합니다.
        Assertions.assertDoesNotThrow(
                () -> {
                    // 멤버 추가 로직 실행
                    memberService.insertPosition(positionDTO);
                },
                "멤버 추가 중 예외가 발생했습니다."  // 예외 발생 시 메시지
        );


    }




    @ParameterizedTest
    @MethodSource("getUpdatePosition")
    void testUpdatePosition(PositionDTO positionDTO) {
        // given
        // member 객체는 이미 getMember 메소드에서 생성된 값으로 주어집니다.

        // when
        // memberService.insertMember(member)를 호출하고 예외 발생 여부를 확인합니다.
        Assertions.assertDoesNotThrow(
                () -> {

                    memberService.updatePosition(positionDTO);
                },
                "직급 수정중 예외가 발생했습니다"  // 예외 발생 시 메시지
        );


    }

    @Test
    void testMemberDetails(){
        String memberNo = "1";

        MemberDTO findMember = memberService.findMember(memberNo).get();

        Assertions.assertNotNull(findMember);
        System.out.println(findMember);


    }








}
