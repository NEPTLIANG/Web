package com.package2.dao;

import com.package2.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserDao {
    //    通过id查询单条user信息
    @Select("select * from user where id=#{id}")
    User selectById(int id);

    //    查询所有user
    @Select("select * from user")
    List<User> selectAll();

    //    增
    @Insert("insert into user(username, password) values (#{username}, #{password})")
    int insertUser(User user);

    //    删
    @Delete("delete from user where id=#{id}")
    int deleteUser(int id);

    //    改
    @Update("update user set password=#{password} where id=#{id}")
    int updateUser(User user);

    //    模糊查询，通过like和%实现
    @Select("select * from user where username like '%' #{username} '%'")
    List<User> selectByLike(String username);

    //    分页查询，通过limit实现 select * from user limit #{index},#{rows}

    //    通过账号密码查询用户信息
    @Select("select * from user where username=#{username} and password=#{password}")
    User selectByusernameAndPassword(User user);
}
