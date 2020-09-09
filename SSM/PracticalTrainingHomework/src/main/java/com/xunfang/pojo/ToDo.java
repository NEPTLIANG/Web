package com.xunfang.pojo;

import java.io.File;
import java.util.Date;
import java.util.List;

//采购计划
public class ToDo {
    //    计划ID，采用int的封装类以处理前端参数为null的情况
    private Integer id;
    //    计划名称
    private String name;
    //    预算（单位：分）
    private int budget;
    //    截止日期
    private Date ddl;
    /**
     * 状态：
     * 0: 待采购
     * 1: 未到货
     * 2: 已完成
     */
    private int status;
    //    相关文档路径
    private String readme;
    //    采购员
    private AdminInfo buyer;
    //    商品列表
    private List<ProductInfo> products;

    //    用于筛选的属性
    private int budgetFrom;  //筛选预算下限
    private int budgetTo;  //筛选预算上限

    //    Getter & Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public Date getDdl() {
        return ddl;
    }

    public void setDdl(Date ddl) {
        this.ddl = ddl;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getReadme() {
        return readme;
    }

    public void setReadme(String readme) {
        this.readme = readme;
    }

    public AdminInfo getBuyer() {
        return buyer;
    }

    public void setBuyer(AdminInfo buyer) {
        this.buyer = buyer;
    }

    public List<ProductInfo> getProducts() {
        return products;
    }

    public void setProducts(List<ProductInfo> products) {
        this.products = products;
    }

    public int getBudgetFrom() {
        return budgetFrom;
    }

    public void setBudgetFrom(int budgetFrom) {
        this.budgetFrom = budgetFrom;
    }

    public int getBudgetTo() {
        return budgetTo;
    }

    public void setBudgetTo(int budgetTo) {
        this.budgetTo = budgetTo;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", budget=" + budget +
                ", ddl=" + ddl +
                ", status=" + status +
                ", readme='" + readme + '\'' +
                ", buyer=" + buyer +
                ", products=" + products +
                ", budgetFrom=" + budgetFrom +
                ", budgetTo=" + budgetTo +
                '}';
    }
}
