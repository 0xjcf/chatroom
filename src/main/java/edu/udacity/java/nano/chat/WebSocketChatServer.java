package edu.udacity.java.nano.chat;

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
    /**
     * All chat sessions.
     */
    private static Map<String, Session> onlineSessions = new ConcurrentHashMap<>();

    private static void sendMessageToAll(Session session, String msg) throws IOException {
        session.getBasicRemote().sendText(msg);
    }

    /**
     * Open connection, 1) add session, 2) add user.
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) throws IOException {
        System.out.println("Socket Open: " + session.getId());
        onlineSessions.put(session.getId(), session);
        Message message = new Message("ENTER", username, username + " has entered the room.", onlineSessions.size());
        String msg = message.jsonConverter(message.getType(), message.getUsername(), message.getMessage(), message.getOnlineCount());
        sendMessageToAll(session, msg);
    }

    /**
     * Send message, 1) get username and session, 2) send message to all.
     */
    @OnMessage
    public void onMessage(Session session, String jsonStr) {
        System.out.println("Message has been sent");
        System.out.println(session);
        System.out.println(jsonStr);
    }
    /**
     * Close connection, 1) remove session, 2) update user.
     */
    @OnClose
    public void onClose(Session session) {
        //TODO: add close connection.
    }

    /**
     * Print exception.
     */
    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

}
