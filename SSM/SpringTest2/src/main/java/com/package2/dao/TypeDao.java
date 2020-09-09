package com.package2.dao;

import com.package2.pojo.Type;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface TypeDao {
    //    查找所有类型
    @Select("SELECT * FROM type")
    List<Type> selectAll();

    //    通过id查询类型
    @Select("SELECT * FROM type " +
            "WHERE id=#{id}")
    Type selectById(int id);

    //    增
    @Insert("INSERT INTO type(name) " +
            "VALUES(#{name})")
    //       获取自增主键的值            自动注入实体类id属性
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Type type);

    //    改
    @Update("UPDATE type SET name=#{name} " +
            "WHERE id=#{id}")
    int update(Type type);
}