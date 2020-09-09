package com.package2.service.impl;

import com.package2.dao.UserDao;
import com.package2.pojo.User;
import com.package2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User selectById(int id) {
        return userDao.selectById(id);
    }

    @Override
    public List<User> selectAll() {
        return selectAll();
    }

    @Override
    public int insertUser(User user) {
        int result;
        try {
            result = userDao.insertUser(user);
        } catch (Exception e) {
            result = 0;
        }
        return result;
    }

    @Override
    public int deleteUser(int id) {
        return userDao.deleteUser(id);
    }

    @Override
    public int updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public List<User> selectByLike(String username) {
        return userDao.selectByLike(username);
    }

    @Override
    public User selectByusernameAndPassword(User user) {
        return userDao.selectByusernameAndPassword(user);
    }
}