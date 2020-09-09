package com.domain.controller;

import com.domain.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;

//映射url目录到/login
@Controller
@RequestMapping("/login")
public class TestController {

    @RequestMapping("/login1")
    //    映射url到/login目录下的login1
    //    如果参数名和变量名 相同 可以省略@RequestParam(value = "username")
    public String login1(@RequestParam(value = "id") String id) {  //绑定url中的参数id到函数的参数id
        System.out.println("测试登录1");
        System.out.println(id);
        return "success";  //跳转到success.jsp
    }

    @RequestMapping("/login2")
    public String login2(String id, int pwd) {  //url中的参数名和函数的参数名同名时，自动绑定到函数的参数，无需@RequestParam；自动将参数转换成int
        System.out.println("测试登录2");
        System.out.println(id + ", " + pwd);
        return "success";
    }

    @RequestMapping("/login3")
    public String login3(@RequestParam(value = "date") Date date) {  //还可以直接传对象，自动转换类型
        System.out.println("测试登录3");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  //格式化日期
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