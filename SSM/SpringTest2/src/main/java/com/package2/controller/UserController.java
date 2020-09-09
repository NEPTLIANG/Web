package com.package2.controller;

import com.package2.pojo.User;
import com.package2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import java.util.HashMap;
import java.util.Map;

//用户控制器
@Controller
@RequestMapping("/user")
@SessionAttributes(value = {"passUser"})  //设置session
public class UserController {
    @Autowired
    private UserService userService;

    //    控制器中实现注册方法
    @RequestMapping("/reg")
    @ResponseBody  //返回JSON字符串之类的字符串而非跳转页面时加@ResponseBody
    public Map reg(@RequestBody User user, ModelMap model) {  //接收JSON字符串请求时加@RequestBody
        System.out.println(user.toString());
        Map map = new HashMap();  //JSON在JAVA中对应HashMap类型
        if (user != null && !user.getUsername().equals("")) {  //字符串应用.equals方法而不能直接用==判等
            int result = userService.insertUser(user);  //调用服务中的方法插入数据
            if (result != 0) {
                System.out.println("添加成功");
                User passUser = userService.selectByusernameAndPassword(user);  //从数据库查询完整用户信息存到session里以便以后取用
                model.addAttribute("passUser", passUser);  //设置session
                map.put("success", "true");  //往Map里存属性
                map.put("message", "注册成功，正在跳转页面");
            } else {
                System.out.println("添加失败");
                map.put("success", "false");
                map.put("message", "账号已存在");
            }
        } else {
            map.put("success", "false");
            map.put("message", "请输入正确的账号密码");
        }
        return map;  //直接返回HashMap对象
    }

    //    登录
    @RequestMapping("/log")
    @ResponseBody
    public Map log(@RequestBody User user, ModelMap model) {
        System.out.println(user.toString());
        User passUser = userService.selectByusernameAndPassword(user);
        Map map = new HashMap();
        if (passUser != null) {
            System.out.println("存在");
            model.addAttribute("passUser", passUser);
            map.put("success", "true");
            map.put("message", "登录成功，正在跳转");
        } else {
            System.out.println("不存在");
            map.put("success", "false");
            map.put("message", "账号密码错误");
        }
        return map;
    }

    //    注销
    @RequestMapping("/out")
    public String out(SessionStatus status) {  //因为上面设置session用的是@SessionAttributes，所以要用SessionStatus来清session
        status.setComplete();  //清空session
        return "index";
    }
}