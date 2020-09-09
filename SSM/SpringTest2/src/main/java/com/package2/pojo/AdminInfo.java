package com.package2.pojo;

import java.util.List;

//pojo中写实体类，管理员信息
public class AdminInfo {
    private int id;
    private String name;
    private String pwd;

    //    关联属性
    private List<Functions> fs;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public List<Functions> getFs() {
        return fs;
    }

    public void setFs(List<Functions> fs) {
        this.fs = fs;
    }

    @Override
    public String toString() {
        return "AdminInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pwd='" + pwd + '\'' +
                ", fs=" + fs +
                '}';
    }
}