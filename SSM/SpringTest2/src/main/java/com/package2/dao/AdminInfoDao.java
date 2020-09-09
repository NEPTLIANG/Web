package com.package2.dao;

import com.package2.pojo.AdminInfo;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.FetchType;

public interface AdminInfoDao {  //在dao里声明接口并在注解写sql语句
    //    根据管理员账号和密码查询管理员信息以判断账号密码是否正确
    @Select("SELECT * FROM admin_info " +
            "WHERE name=#{name} AND pwd=#{pwd}")
    //通过#{}接收参数
    AdminInfo SelectByNameAndPwd(AdminInfo ai);

    //    根据管理员id查询有权限访问的功能集合
    @Results({  //多表查询，@Results里套@Result
            @Result(id = true, column = "id", property = "id"),  //绑定数据库字段名和实体类属性名
            @Result(column = "name", property = "name"),
            @Result(column = "pwd", property = "pwd"),
            @Result(column = "id", property = "fs",
                    many = @Many(select = "com.package2.dao.FunctionsDao.selectByAdminInfoId",
                            fetchType = FetchType.EAGER))  //一对多
    })
    @Select("SELECT * FROM admin_info " +
            "WHERE id=#{id}")
    AdminInfo selectByAdminId(int id);
}