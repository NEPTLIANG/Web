package com.package2.service;

import com.package2.pojo.AdminInfo;

//在服务中声明接口及其方法
public interface AdminInfoService {
    //    登录
    AdminInfo login(AdminInfo ai);

    //    通过管理员id查询管理员及其功能集合
    AdminInfo getAdminInfoAndFunctions(int id);
}