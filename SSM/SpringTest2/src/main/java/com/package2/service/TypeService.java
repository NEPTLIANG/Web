package com.package2.service;

import com.package2.pojo.Type;

import java.util.List;

public interface TypeService {
    //    获取所有类型
    List<Type> getAll();

    //    添加商品类型
    int addType(Type type);

    //    更新商品类型
    int updateType(Type type);
}