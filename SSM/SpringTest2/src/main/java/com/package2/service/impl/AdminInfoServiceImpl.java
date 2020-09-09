package com.package2.service.impl;

import com.package2.dao.AdminInfoDao;
import com.package2.pojo.AdminInfo;
import com.package2.service.AdminInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//在impl中实现服务接口及其方法
@Service
public class AdminInfoServiceImpl implements AdminInfoService {
    @Autowired
    private AdminInfoDao adminInfoDao;

    //    在impl中调用dao中的查询方法
    @Override
    public AdminInfo login(AdminInfo ai) {
        return adminInfoDao.SelectByNameAndPwd(ai);
    }

    @Override
    public AdminInfo getAdminInfoAndFunctions(int id) {
        return adminInfoDao.selectByAdminId(id);
    }
}