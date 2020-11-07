package com.xunfang.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.xunfang.pojo.OrderInfo;
import com.xunfang.pojo.Pager;
import com.xunfang.pojo.ToDo;
import com.xunfang.pojo.ToDoList;
import com.xunfang.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/todo")
public class ToDoController {
    @Autowired
    private ToDoService toDoService;

    /**
     * 分页查询
     *
     * @param page 页码
     * @param rows 每页行数
     * @param toDo 查询用实体类
     * @return result 查询结果Map对象
     */
    @RequestMapping("/list")
    @ResponseBody
    public Map<String, Object> list(int page, int rows, ToDo toDo) {
        System.out.println(toDo.toString());
//        初始化Paper对象
        Pager pager = new Pager();
        pager.setCurPage(page);
        pager.setPerPageRows(rows);
//        初始化params对象
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pager", pager);
//        查询总数
        int totalCount = toDoService.count(params);
        System.out.println("总数：" + totalCount);
//        筛选列表
        List<ToDo> toDoList = toDoService.getToDoDetail(toDo, pager);
        System.out.println("采购商品：" + toDoList.toString());
//        初始化result对象保存查询结果
        Map result = new HashMap();
        result.put("total", totalCount);
        result.put("rows", toDoList);
        return result;
    }

    //    通过id查询采购计划
    public String getToDoDetail(String id, ModelMap model) {
        ToDo toDo = toDoService.getToDoInfoById(Integer.parseInt(id));
//        将采购计划存入request区域
        model.addAttribute("toDo", toDo);
        return "tododetail";
    }

    //    查询采购商品
    @RequestMapping("/getToDoList")
    @ResponseBody
    public List<ToDoList> getToDoListById(String id) {
        List<ToDoList> toDoLists = toDoService.getToDoListByToDoId(Integer.parseInt(id));
        for (ToDoList toDoList : toDoLists) {
//            设置单价
            toDoList.setPrice((int) toDoList.getProduct().getPrice());
        }
        return toDoLists;
    }

    //    增
    public String commitToDoDetail(String inserted, String request) {
        try {
            ObjectMapper mapper = new ObjectMapper();
//            过滤java bean中没有的属性
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
//            将JSON字符串传的采购计划数组转化成对象
            ToDo toDo = mapper.readValue(request, ToDo[].class)[0];
//            保存
            toDoService.saveToDoDetail(toDo);
            System.out.println(toDo.getId());
//            将JSON字符串转化成采购商品List集合
            List<ToDoList> toDoLists = mapper.readValue(inserted, new TypeReference<ArrayList<ToDoList>>() {
            });
            for (ToDoList toDoList : toDoLists) {
                toDoList.setToDoId(toDo.getId());
                toDoService.saveToDoList(toDoList);
            }
//            成功
            return "success";
        } catch (Exception e) {
//            失败
            return "false";
        }
    }

    public Map<String, Object> deleteToDo(String idStr) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            String[] ids = idStr.split(",");
            for (String id : ids) {
                toDoService.deleteToDoDetail(Integer.parseInt(id));
            }
            result.put("success", "true");
            result.put("message", "删除成功");
        } catch (Exception e) {
            result.put("success", "false");
            result.put("message", "删除失败");
        }
        return result;
    }
}