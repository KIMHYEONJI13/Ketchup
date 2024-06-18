package com.devsplan.ketchup.auth.handler;

import com.devsplan.ketchup.auth.model.DetailsMember;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
//    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private List<WebSocketSession> sessions = new ArrayList<>();

//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) {
//        log.info("WebSocket connection established: sessionId={}", session.getId());
//        try {
//            String principalId = getPrincipalId(session);
//            sessions.put(principalId, session);
//            log.info("WebSocket connection established: sessionId={}, principalId={}", session.getId(), principalId);
//        } catch (Exception e) {
//            log.error("Error in afterConnectionEstablished: ", e);
//        }
//    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("WebSocket connection established: sessionId={}", session.getId());
        System.out.println("WebSocket 연결됨: " + session.getId());
        sessions.add(session);
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("Received WebSocket message: sessionId={}, message={}", session.getId(), message.getPayload());
        System.out.println("메시지 수신: " + message.getPayload());
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen()) {
                webSocketSession.sendMessage(message);
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("WebSocket 연결 닫힘: " + session.getId());
        sessions.remove(session);
    }

//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
//        String principalId = getPrincipalId(session);
//        sessions.remove(principalId);
//        log.info("WebSocket connection closed: sessionId={}, principalId={}, closeStatus={}", session.getId(), principalId, status);
//    }

//    private String getPrincipalId(WebSocketSession session) {
//
//        System.out.println("getPrincipalId ================================================");
//        System.out.println("session principal : " + session.getPrincipal());
//
//        return Optional.ofNullable((Authentication) session.getPrincipal())
//                .map(a -> String.valueOf(((DetailsMember) a.getPrincipal()).getMember().getMemberNo()))
//                .orElseThrow(() -> new RuntimeException("current not signin"));
//    }

    public void sendNotice(String notice) {
        TextMessage message = new TextMessage(notice);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(message);
                } catch (IOException e) {
                    log.error("Error sending WebSocket message: sessionId={}", session.getId(), e);
                }
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("WebSocket transport error occurred: sessionId={}, error={}", session.getId(), exception.getMessage());
    }

    // 메일 알림 전송
   /* public void sendMailNotification(MailDTO mailDto) throws IOException {
        TextMessage message = new TextMessage(objectMapper.writeValueAsString(mailDto));

        // 수신자의 WebSocket 세션을 찾아 알림을 전송
        for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) {
            WebSocketSession session = entry.getValue();
            if (session.isOpen()) {
                session.sendMessage(message);
            }
        }
    }*/

}
