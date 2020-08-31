package com.domain.pojo;

import java.util.Date;

public class User {
    private String id;
    private int pwd;
    private Date birthday;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", pwd=" + pwd +
                ", birthday=" + birthday +
                ", hobby='" + hobby + '\'' +
                '}';
    }

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

    private String hobby;
}