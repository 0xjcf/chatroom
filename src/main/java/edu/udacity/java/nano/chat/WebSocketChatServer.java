package edu.udacity.java.nano.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.udacity.java.nano.chat.model.Message;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket Server
 *
 * @see ServerEndpoint WebSocket Client
 * @see Session   WebSocket Session
 */

@Component
@ServerEndpoint("/chatroom/{username}")
public class WebSocketChatServer {
    private static Map<String, Session> onlineSessions = new ConcurrentHashMap<>();

    private static void sendMessageToAll(String message) {
        onlineSessions.forEach((key, session) -> {
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        System.out.println("Socket Open: " + session.getId());
        onlineSessions.put(session.getId(), session);
        Message message = new Message();
        message.setType("ENTER");
        message.setUsername(username);
        message.setMessage(username + " " + " has entered the room.");
        message.setOnlineCount(onlineSessions.size());
        String msg = message.jsonConverter(message.getType(), message.getUsername(), message.getMessage(), message.getOnlineCount());
        sendMessageToAll(msg);
    }

    @OnMessage
    public void onMessage(Session session, String jsonStr) {
        System.out.println("A message has been received");
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<String, String> map = mapper.readValue(jsonStr, Map.class);
            Message message = new Message();
            message.setType("SPEAK");
            message.setUsername(map.get("username"));
            message.setMessage(map.get("message"));
            String msg = message.jsonConverter(message.getType(), message.getUsername(), message.getMessage(), onlineSessions.size());
            sendMessageToAll(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("username") String username) {
        System.out.println("A session has been closed");
        onlineSessions.remove(session.getId());
        Message message = new Message();
        message.setType("EXIT");
        message.setUsername(username);
        message.setMessage(username + " " + " has left the room.");
        message.setOnlineCount(onlineSessions.size());
        String msg = message.jsonConverter(message.getType(), message.getUsername(), message.getMessage(), message.getOnlineCount());
        sendMessageToAll(msg);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }
}
