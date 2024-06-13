package com.devsplan.ketchup.auth.handler;

import com.devsplan.ketchup.auth.model.DetailsMember;
import com.devsplan.ketchup.mail.dto.MailDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("WebSocket connection established: sessionId={}", session.getId());
        try {
            String principalId = getPrincipalId(session);
            sessions.put(principalId, session);
            log.info("WebSocket connection established: sessionId={}, principalId={}", session.getId(), principalId);
        } catch (Exception e) {
            log.error("Error in afterConnectionEstablished: ", e);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException, JsonProcessingException {
        log.info("Received WebSocket message: sessionId={}, message={}", session.getId(), message.getPayload());
        try {
            JsonNode jsonNode = objectMapper.readValue(message.getPayload(), JsonNode.class);
            Optional.ofNullable(sessions.get(jsonNode.get("memberNo").textValue()))
                    .filter(WebSocketSession::isOpen)
                    .ifPresent(s -> {
                        try {
                            s.sendMessage(message);
                        } catch (IOException e) {
                            log.error("Error sending message: ", e);
                        }
                    });
        } catch (IOException e) {
            log.error("Error handling text message: ", e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String principalId = getPrincipalId(session);
        sessions.remove(principalId);
        log.info("WebSocket connection closed: sessionId={}, principalId={}, closeStatus={}", session.getId(), principalId, status);
    }

    private String getPrincipalId(WebSocketSession session) {

        System.out.println("getPrincipalId ================================================");
        System.out.println("session principal : " + session.getPrincipal());

        return Optional.ofNullable((Authentication) session.getPrincipal())
                .map(a -> String.valueOf(((DetailsMember) a.getPrincipal()).getMember().getMemberNo()))
                .orElseThrow(() -> new RuntimeException("current not signin"));
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
