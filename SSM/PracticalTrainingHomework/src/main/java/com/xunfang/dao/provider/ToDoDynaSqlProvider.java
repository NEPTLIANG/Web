package com.xunfang.dao.provider;

import com.xunfang.pojo.ToDo;
import org.apache.ibatis.jdbc.SQL;

import java.text.SimpleDateFormat;
import java.util.Map;

public class ToDoDynaSqlProvider {
    public String selectWithParam(Map<String, Object> params) {
        String sql = new SQL() {
            {
                SELECT("*");
                FROM("todo_detail");
                if (params.get("toDo") != null) {
                    ToDo toDo = (ToDo) params.get("toDo");
//                    搜id
                    if (toDo.getId() != null && toDo.getId() > 0) {
                        WHERE(" `id` LIKE concat('%', #{toDo.getId}, '%') ");
                    }
//                    搜名字
                    if (toDo.getName() != null && !toDo.getName().equals("")) {
                        WHERE(" `name` LIKE concat('%', #{toDo.getName}, '%') ");
                    }
//                    筛预算高于条件的采购计划
                    if (toDo.getBudgetFrom() > 0) {
                        WHERE(" `bugdet` >= #{toDo.getBudgetFrom} ");
                    }
//                    筛预算低于条件的采购计划
                    if (toDo.getBudgetTo() > 0) {
                        WHERE(" `budget` <= #{toDo.getBudgetTo} ");
                    }
//                    筛ddl
                    if (toDo.getDdl() != null) {
                        String date = new SimpleDateFormat("yyyy-MM-dd")
                                .format(toDo.getDdl()).toString();
                        System.out.println(date);
                        WHERE(" date(ddl) IN(#{date}) ");
                    }
//                    筛状态
                    if (toDo.getStatus() >= 0) {
                        WHERE(" `status` IN(#{toDo.getStatus} ");
                    }
//                    筛采购员
                    if (toDo.getBuyer() != null && toDo.getBuyer().getId() >= 0) {
                        WHERE(" `buyerId` IN(#{toDo.getBuyer.getId()}) ");
                    }
                }
            }
        }.toString();
//        拼接分页参数
        if (params.get("pager") != null) {
            sql += "LIMIT #{pager.firstLimitParam}, #{pager.perPageRows} ";
        }
        return sql;
    }

    //    获取分页动态条件查询结果的总行数
    public String count(Map<String, Object> params) {
        return new SQL() {
            {
                SELECT("count(*)");
                FROM("todo_detail");
                if (params.get("toDo") != null) {
                    ToDo toDo = (ToDo) params.get("toDo");
                    if (toDo.getId() != null && toDo.getId() > 0) {
                        WHERE(" `id` LIKE concat('%', #{toDo.getId}, '%') ");
                    }
                    if (toDo.getName() != null && !toDo.getName().equals("")) {
                        WHERE(" `name` LIKE concat('%', #{toDo.getName}, '%') ");
                    }
                    if (toDo.getBudgetFrom() > 0) {
                        WHERE(" `bugdet` >= #{toDo.getBudgetFrom} ");
                    }
                    if (toDo.getBudgetTo() > 0) {
                        WHERE(" `budget` <= #{toDo.getBudgetTo} ");
                    }
                    if (toDo.getDdl() != null) {
                        String date = new SimpleDateFormat("yyyy-MM-dd")
                                .format(toDo.getDdl()).toString();
                        System.out.println(date);
                        WHERE(" date(ddl) IN(#{date}) ");
                    }
                    if (toDo.getStatus() >= 0) {
                        WHERE(" `status` IN(#{toDo.getStatus} ");
                    }
                    if (toDo.getBuyer() != null && toDo.getBuyer().getId() >= 0) {
                        WHERE(" `buyerId` IN(#{toDo.getBuyer.getId()}) ");
                    }
                }
            }
        }.toString();
    }
}