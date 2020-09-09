package com.package2.dao;

import com.package2.pojo.ProductInfo;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;
import java.util.Map;

public interface ProductInfoDao {
    //    动态条件分页查询
    @Results({
            @Result(id = true, column = "id", property = "id"),
            @Result(column = "code", property = "code"),
            @Result(column = "name", property = "name"),
            @Result(column = "pic", property = "pic"),
            @Result(column = "num", property = "num"),
            @Result(column = "price", property = "price"),
            @Result(column = "intro", property = "intro"),
            @Result(column = "status", property = "status"),
            @Result(column = "brand", property = "brand"),
            @Result(column = "tid", property = "type",
                    one = @One(select = "com.package2.dao.TypeDao.selectById",
                            fetchType = FetchType.EAGER))
    })
    @SelectProvider(type = ProductInfoDynaSqlProvider.class,
            method = "selectWithParam")
    public List<ProductInfo> selectBypage(Map<String, Object> params);
}
