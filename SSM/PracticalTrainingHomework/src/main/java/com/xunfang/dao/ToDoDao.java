package com.xunfang.dao;

import com.xunfang.dao.provider.ToDoDynaSqlProvider;
import com.xunfang.pojo.ToDo;
import com.xunfang.pojo.ToDoList;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;
import java.util.Map;

public interface ToDoDao {
    //    分页条件查询采购计划
    @Results({
            @Result(
                    column = "buyerId",
                    property = "buyer",
                    one = @One(
                            select = "com.xunfang.dao.AdminInfoDao.selectById",
                            fetchType = FetchType.LAZY
                    )
            )
    })
    @SelectProvider(type = ToDoDynaSqlProvider.class, method = "selectWithParam")
    List<ToDo> selectAllToDo(Map<String, Object> params);

    //    总数
    @SelectProvider(type = ToDoDynaSqlProvider.class, method = "count")
    int count(Map<String, Object> params);

    //    通过id查询
    @Results({
            @Result(
                    column = "buyerId",
                    property = "buyer",
                    one = @One(
                            select = "com.xunfang.dao.AdminInfoDao.selectById",
                            fetchType = FetchType.LAZY
                    )
            )
    })
    @Select("SELECT * FROM `todo_detail` " +
            "WHERE `id`=#{id}")
    public ToDo getToDoById(int id);

    //    通过id查关系表
    @Results({
            @Result(
                    column = "productId",
                    property = "products",
                    one = @One(
                            select = "com.xunfang.dao.ProductInfoDao.getProductInfoById",
                            fetchType = FetchType.LAZY
                    )
            )
    })
    @Select("SELECT * FROM todo_list " +
            "WHERE toDoId=#{toDoId}")
    List<ToDo> getToDoListByOrderInfoId(int toDoId);

    //    增加采购计划
    @Insert("INSERT INTO todo_detail(id, name, budget, ddl, status, readme, buyerId) " +
            "VALUES(#{id}, #{name}, #{budget}, #{ddl}, #{status}, #{readme}, #{buyerId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int saveToDoDetail(ToDo toDo);

    //    增加采购商品
    @Insert("INSERT INTO todo_list(toDoId, productId) " +
            "VALUES(#{toDoId}, #{productId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int saveToDoList(ToDoList toDoList);

    //    删除采购计划
    @Delete("DELETE FROM todo_detail " +
            "WHERE id=#{id}")
    int deleteToDoDetail(int id);

    //    删除采购商品
    @Delete("DELETE FROM todo_list " +
            "WHERE id=#{id}")
    int deleteToDoList(int id);
}