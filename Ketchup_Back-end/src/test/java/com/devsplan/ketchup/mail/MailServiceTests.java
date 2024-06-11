//package com.devsplan.ketchup.mail;
//
//import com.devsplan.ketchup.mail.dto.MailDTO;
//import com.devsplan.ketchup.mail.dto.ReceiverDTO;
//import com.devsplan.ketchup.mail.service.MailService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//@SpringBootTest
//public class MailServiceTests {
//    @Autowired
//    MailService mailService;
//
//    @DisplayName("메일 전송 - ㅇ메일 내용, ㅇ수신자(한명, 여러명), 첨부 파일")
//    @Test
//    void insertMail() throws IOException {
//        // given
//        // 메일
//        MailDTO newMail = new MailDTO(
//                "[자료 요청] 1분기 실적보고서 내 영업실 데이터",
//                "테스트 메일1",
//                'N',
//                'N'
//        );
//
//        int mailNo = mailService.insertMail(newMail);
//
//        // 수신자
//        ReceiverDTO receiverInfo1 = new ReceiverDTO(
//                mailNo,
//                "2",
//                null,
//                'N'
//        );
//
//        ReceiverDTO receiverInfo2 = new ReceiverDTO(
//                mailNo,
//                "3",
//                null,
//                'N'
//        );
//
//        List<ReceiverDTO> receivers = new ArrayList<>();
//        receivers.add(receiverInfo1);
//        receivers.add(receiverInfo2);
//
//        // then
//        Assertions.assertDoesNotThrow(() -> mailService.insertReceiver(receivers));
//    }
//
//    @DisplayName("보낸 메일 목록 조회 - ㅇ목록, ㅇ삭제 되지 않은 목록, 검색, 페이징, 읽음 여부 확인, 수신자")
//    @Test
//    void selectSendMailList() {
//        // given
//        String senderTest = "1";
//        String search = "mailtitle";
//        String searchValue = "바나나";
//
//        // when
//        List<MailDTO> mailList = mailService.selectSendMailList(senderTest, search, searchValue);
//
//        // then
//        Assertions.assertNotNull(mailList);
//        for (MailDTO mail : mailList) {
//            System.out.println(senderTest + "보낸 메일 목록 : " + mail);
//        }
//    }
//
//    @DisplayName("받은 메일 목록 조회 - ㅇ목록, ㅇ삭제 되지 않은 목록, 검색, 페이징")
//    @Test
//    void selectReceiveMailList() {
//        // given
//        String receiverTest = "2";
//        String search = "mailtitle";
//        String searchValue = "바나나";
//
//        // when
//        List<MailDTO> mailList = mailService.selectReceiveMailList(receiverTest, search, searchValue);
//
//        // then
//        Assertions.assertNotNull(mailList);
//        for (MailDTO mail : mailList) {
//            System.out.println(receiverTest + "받은 메일 목록 : " + mail);
//        }
//    }
//
//    @DisplayName("메일 상세 조회 - ㅇ메일 내용, 수신자, 첨부 파일")
//    @Test
//    void selectMailDetail() {
//        // given
//        int mailNo = 1;
//
//        // when
//        MailDTO oneMail = mailService.selectMailDetail(mailNo);
//        System.out.println("메일!!!!!!!!!!" + oneMail);
//
//        // then
////        Assertions.assertNotNull();
//        System.out.println(mailNo + "번 메일 : " + oneMail);
//    }
//
//    @DisplayName("발송 취소 - ㅇ메일 발송 여부 변경, ㅇ수신자 삭제 여부 변경")
//    @Test
//    void cancelSendMail() {
//        // given
//        int mailNo = 2;
//
//        // when
//        int result = mailService.cancelSendMail(mailNo);
//
//        // then
//        Assertions.assertEquals(1, result);
//    }
//
//    @DisplayName("보낸 메일 삭제 - ㅇ")
//    @Test
//    void deleteSendMail() {
//        // given
//        List<Integer> mailNos = new ArrayList<>();
//        mailNos.add(4);
//        mailNos.add(7);
//        mailNos.add(8);
//
//        // when
//        int result = mailService.deleteSendMail(mailNos);
//
//        // then
//        Assertions.assertNotEquals(0, result);
//    }
//
//    @DisplayName("받은 메일 삭제 - ㅇ")
//    @Test
//    void deleteReceiveMail() {
//        // given
//        List<Integer> mailNos = new ArrayList<>();
//        mailNos.add(2);
//        mailNos.add(5);
//        mailNos.add(6);
//
//        // when
//        int result = mailService.deleteReceiveMail(mailNos);
//
//        // then
//        Assertions.assertNotEquals(0, result);
//    }
//
//    @DisplayName("답장")
//    @Test
//    void replyMail() {
//        // given
//        // 메일 1에 대해 답장
//        MailDTO prevMail = mailService.selectMailDetail(1);
//        String replySender = "4"; // 답장하는 본인이 보낸사람이 됨 - 임의로 넣어줌 - token에서 빼올것임
//
//        MailDTO replyMail = new MailDTO();
//
//        replyMail.setSenderMem(replySender);
//        replyMail.setMailTitle("RE:" + prevMail.getMailTitle());
//        replyMail.setMailContent("이전 메일에 대한 답장입니다." + prevMail.getMailContent());
//        replyMail.setSendCancelStatus('N');
//        replyMail.setSendDelStatus('N');
//        replyMail.setReceivers(null);
//
////        int replyMailNo = mailService.replyMail(replyMail);
//
//        // when
//
//        // then
//        Assertions.assertDoesNotThrow(() ->  mailService.replyMail(replyMail));
//    }
//}