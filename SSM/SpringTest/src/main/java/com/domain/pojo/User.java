package com.domain.pojo;

import java.util.Date;

public class User {
    private String id;
    private int pwd;
    private Date birthday;
    private String hobby;

    //    IDEA可以一键生成toString方法，便于调试
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", pwd=" + pwd +
                ", birthday=" + birthday +
                ", hobby='" + hobby + '\'' +
                '}';
    }

    //    还可以一键生成get和set方法
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPwd() {
        return pwd;
    }

    public void setPwd(int pwd) {
        this.pwd = pwd;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }
}