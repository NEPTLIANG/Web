package com.xunfang.service;

import com.xunfang.pojo.Pager;
import com.xunfang.pojo.ToDo;
import com.xunfang.pojo.ToDoList;

import java.util.List;
import java.util.Map;

public interface ToDoService {
    //    分页查询所有采购计划
    List<ToDo> getToDoDetail(ToDo toDo, Pager pager);

    //    查询筛选后的采购计划总数
    int count(Map<String, Object> params);

    //    通过id查询单条采购计划
    ToDo getToDoInfoById(int id);

    //    通过id查询采购商品
    List<ToDoList> getToDoListByToDoId(int toDoId);

    //    增加采购计划
    int saveToDoDetail(ToDo toDo);

    //    增加采购商品
    int saveToDoList(ToDoList toDoList);

    //    删除采购计划
    int deleteToDoDetail(int id);
}