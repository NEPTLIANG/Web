package com.package2.service;

import com.package2.pojo.User;

import java.util.List;

public interface UserService {
    //    通过id获得user对象
    User selectById(int id);

    //    查询所有
    List<User> selectAll();

    //    增
    int insertUser(User user);

    //    删
    int deleteUser(int id);

    //    改
    int updateUser(User user);

    //    模糊查询
    List<User> selectByLike(String username);

    //    分页查询  select * from user limit #{index},#{rows}

    //    登录验证
    User selectByusernameAndPassword(User user);
}