package com.package2.pojo;

import java.util.HashSet;
import java.util.Set;

//功能权限信息
public class Functions implements Comparable<Functions> {
    private int id;
    //    功能的名称
    private String name;
    //    父功能id
    private int parentid;
    private boolean isleaf;
    //    关联属性
    private Set ais = new HashSet();

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

    public int getParentid() {
        return parentid;
    }

    public void setParentid(int parentid) {
        this.parentid = parentid;
    }

    public boolean isIsleaf() {
        return isleaf;
    }

    public void setIsleaf(boolean isleaf) {
        this.isleaf = isleaf;
    }

    public Set getAis() {
        return ais;
    }

    public void setAis(Set ais) {
        this.ais = ais;
    }

    //    比较两个对象
    @Override
    public int compareTo(Functions o) {
        return ((Integer) this.getId()).compareTo((Integer) o.getId());
    }

    @Override
    public String toString() {
        return "Functions{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", parentid=" + parentid +
                ", isleaf=" + isleaf +
                ", ais=" + ais +
                '}';
    }
}