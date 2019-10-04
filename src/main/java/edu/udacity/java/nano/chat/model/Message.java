package edu.udacity.java.nano.chat.model;

import com.alibaba.fastjson.JSON;

/**
 * WebSocket message model
 */
public class Message {
    private String type;
    private String username;
    private String text;
    private int onlineCount;

    public Message() {
    }

    public Message(String type, String username, String text, int onlineCount) {
        this.type = type;
        this.username = username;
        this.text = text;
        this.onlineCount = onlineCount;
    }

    public static String jsonConverter(String type, String username, String text, int onlineCount) {
        return JSON.toJSONString(new Message(type, username, text, onlineCount));
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return text;
    }

    public void setMessage(String text) {
        this.text = text;
    }


    public int getOnlineCount() {
        return onlineCount;
    }

    public void setOnlineCount(int onlineCount) {
        this.onlineCount = onlineCount;
    }
}
