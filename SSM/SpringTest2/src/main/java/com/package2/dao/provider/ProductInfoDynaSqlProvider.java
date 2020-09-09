package com.package2.dao.provider;

import com.package2.pojo.ProductInfo;
import org.apache.ibatis.jdbc.SQL;

import java.util.Map;

public class ProductInfoDynaSqlProvider {
    //    动态条件分页模糊查询
    public String selectWithParam(Map<String, Object> params) {
        String sql = new SQL() {
            {
                SELECT("*");
                FROM("product_info");
                if (params.get("productInfo") != null) {  //Map对象通过get方法获取属性
                    ProductInfo productInfo = (ProductInfo) params.get("productInfo");  //返回Object类型，强制类型转换他一手
                    if (productInfo.getCode() != null && !productInfo.getCode().equals("")) {
                        WHERE(" code=#{productInfo.code} ");  //针对不同情况拼接不同条件，原理为拼接字符串故两边留空格以防出错
                    }
                    if (productInfo.getName()!=null && !productInfo.getName().equals("")) {
                        WHERE(" name LIKE CONCAT('%")
                    }
                }
            }
        }
    }
}
