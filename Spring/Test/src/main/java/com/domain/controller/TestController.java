package com.domain.controller;

import com.domain.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/login")
public class TestController {

    @RequestMapping("/login1")
    public String login1(@RequestParam(value = "id") String id) {
        System.out.println("测试登录1");
        System.out.println(id);
        return "success";
    }

    @RequestMapping("/login2")
    public String login2(String id, int pwd) {
        System.out.println("测试登录2");
        System.out.println(id + ", " + pwd);
        return "success";
    }

    @RequestMapping("/login3")
    public String login3(@RequestParam(value = "date") Date date) {
        System.out.println("测试登录3");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String newDate = format.format(date);
        System.out.println(date);
        System.out.println(newDate);
        return "success";
    }

    @RequestMapping("/login4")
    public String login4(User user) {  //复合类型参数不能用参数@RequestParam
        System.out.println("测试登录4");
        System.out.println(user.toString());
        return "success";
    }
}