package com.package2.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.package2.pojo.AdminInfo;
import com.package2.pojo.Functions;
import com.package2.pojo.TreeNode;
import com.package2.service.AdminInfoService;
import com.package2.util.TreeBuild;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.*;

//管理员控制器
@Controller
@RequestMapping("/admininfo")
public class AdmininfoController {
    @Autowired
    private AdminInfoService adminInfoService;

    //    通过produces设置字符编码；只有value参数时可省略“value=”
    @RequestMapping(value = "/login", produces = "text/html;charset=utf-8")
    @ResponseBody
    public String login(AdminInfo ai, HttpSession session) throws JsonProcessingException {
        AdminInfo adminInfo = adminInfoService.login(ai);
        if (adminInfo != null && !adminInfo.getName().equals("")) {  //判空记得取反
//            验证通过后验证是否有分配权限，若有则将管理员信息存入session，通过admin的id查询functions，判断其functions列表长度是否大于0
            if (adminInfoService.getAdminInfoAndFunctions(adminInfo.getId()).getFs().size() > 0) {
                System.out.println(adminInfoService.getAdminInfoAndFunctions(adminInfo.getId()).toString());
                session.setAttribute("admin", adminInfo);  //设置session
                return "{" +
                        "\"success\": \"true\"," +
                        "\"message\": \"登录成功\"" +
                        "}";
            } else {
                return "{" +
                        "\"success\": \"false\"," +
                        "\"message\": \"没有分配权限\"" +
                        "}";
            }
        } else {
            Map map = new HashMap();
            map.put("success", "false");
            map.put("message", "账号密码错误");
//            使用jackson包来将HashMap对象处理成JSON字符串，要throws JsonProcessingException
            String result = new ObjectMapper().writeValueAsString(map);
            System.out.println(result);
            return result;
        }
    }

    //    通过管理员id获取其可访问功能的节点树
    @RequestMapping(value = "/getTree")
    @ResponseBody
    public List<TreeNode> getTree(int adminid) {
        AdminInfo adminInfo = adminInfoService.getAdminInfoAndFunctions(adminid);
//        根据前端传来的id获取管理员信息，其中包含其可用的功能
        List<Functions> functions = adminInfo.getFs();
        List<TreeNode> nodes = new ArrayList<TreeNode>();
//        对List<Functions>对象排序
        Collections.sort(functions);
//        将functions转化为TreeNode
        for (Functions f : functions) {
            TreeNode treeNode = new TreeNode();
            treeNode.setId(f.getId());
            treeNode.setFid(f.getParentid());
            treeNode.setText(f.getName());
            nodes.add(treeNode);
        }
//        调用util子包中工具类TreeBulid的buildtree方法，给每个treeNode节点添加子treeNode节点
        List<TreeNode> treeNodeList = TreeBuild.buildtree(nodes, 0);
        for (TreeNode tree : treeNodeList) {
            System.out.println(tree.toString());
        }
        return treeNodeList;
    }

    //    注销，清空cookie，由于登录时采用的是HttpSession方式故注销也要用这个
    @RequestMapping("/logout")
    public String out(HttpSession session) {
        session.invalidate();  //清空session
        return "admin_login";
    }
}