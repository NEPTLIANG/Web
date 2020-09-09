package com.xunfang.service.impl;

import com.xunfang.dao.ToDoDao;
import com.xunfang.pojo.Pager;
import com.xunfang.pojo.ToDo;
import com.xunfang.pojo.ToDoList;
import com.xunfang.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ToDoServiceImpl implements ToDoService {
    @Autowired
    private ToDoDao toDoDao;

    @Override
    public List<ToDo> getToDoDetail(ToDo toDo, Pager pager) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("toDoDetail", toDo);
        int recordCount = toDoDao.count(params);
        if (recordCount > 0) {
            params.put("pager", pager);
        }
        return toDoDao.selectAllToDo(params);
    }

    @Override
    public int count(Map<String, Object> params) {
        return toDoDao.count(params);
    }

    @Override
    public ToDo getToDoInfoById(int id) {
        return toDoDao.getToDoById(id);
    }

    @Override
    public List<ToDoList> getToDoListByToDoId(int toDoId) {
        return getToDoListByToDoId(toDoId);
    }

    @Override
    public int saveToDoDetail(ToDo toDo) {
        return toDoDao.saveToDoDetail(toDo);
    }

    @Override
    public int saveToDoList(ToDoList toDoList) {
        return toDoDao.saveToDoList(toDoList);
    }

    @Override
    public int deleteToDoDetail(int id) {
//        由于存在外键约束，故先删关系表再删采购计划
        try {
            toDoDao.deleteToDoList(id);
            toDoDao.deleteToDoDetail(id);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }
}
