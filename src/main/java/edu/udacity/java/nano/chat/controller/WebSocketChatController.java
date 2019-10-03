package edu.udacity.java.nano.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.net.UnknownHostException;

@RestController
public class WebSocketChatController {
    /**
     * Login Page
     */
    @GetMapping("/")
    public ModelAndView login() {
        return new ModelAndView("/login");
    }

    /**
     * Chatroom Page
     */
    @GetMapping("/chat")
    public ModelAndView index(String username, HttpServletRequest request) throws UnknownHostException {
        ModelAndView modelAndView = new ModelAndView("/chat");
        modelAndView.addObject("username", username);
        return modelAndView;
    }
}
