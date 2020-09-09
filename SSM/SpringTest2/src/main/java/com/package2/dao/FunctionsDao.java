package com.package2.dao;

import com.package2.pojo.Functions;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface FunctionsDao {
    @Select("SELECT * FROM functions WHERE id IN ( " +
            "SELECT fid FROM powers WHERE aid=#{aid} " +
            ")")
//            通过管理员的aid查询权限的fid，再通过fid查询function数据
    List<Functions> selectByAdminInfoId(int aid);
}