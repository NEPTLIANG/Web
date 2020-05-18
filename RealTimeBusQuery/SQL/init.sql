CREATE DATABASE RealTimeBusQuery;
USE RealTimeBusQuery;

CREATE TABLE org(  /*机构*/
    name VARCHAR(20),
    id VARCHAR(20),
    pwd VARCHAR(20),
    intro VARCHAR(50)
);
ALTER TABLE org
    ADD PRIMARY KEY(id);
ALTER TABLE org
    MODIFY name VARCHAR(20) NOT NULL;
ALTER TABLE org
    MODIFY pwd VARCHAR(20) NOT NULL;

CREATE TABLE route(  /*路线*/
    name VARCHAR(20),
    id VARCHAR(20),
    org VARCHAR(20),
    intro VARCHAR(50)
);
ALTER TABLE route
    ADD PRIMARY KEY(id, org);
ALTER TABLE route
    ADD FOREIGN KEY(org) REFERENCES org(id);
ALTER TABLE route
    MODIFY name VARCHAR(20) NOT NULL;

CREATE TABLE identification(  /*标识点*/
    name VARCHAR(20),
    id VARCHAR(20),
    route VARCHAR(20),
    intro VARCHAR(50)
);
ALTER TABLE identification
    ADD PRIMARY KEY(id, route);
ALTER TABLE identification
    ADD FOREIGN KEY(route) REFERENCES route(id);
ALTER TABLE identification
    MODIFY name VARCHAR(20) NOT NULL;

CREATE TABLE device(  /*设备*/
    name VARCHAR(20) NOT NULL,
    id VARCHAR(20) NOT NULL,
    route VARCHAR(20),
    lng DOUBLE,  /*经度*/
    lat DOUBLE,  /*纬度*/
    intro VARCHAR(50),
    PRIMARY KEY(id, route),  /*mysql不支持直接在列名后声明主键和外键*/
    FOREIGN KEY(route) REFERENCES route(id)
);

CREATE TABLE user(  /*用户*/
    name VARCHAR(20),
    id VARCHAR(20),
    pwd VARCHAR(20),
    route VARCHAR(100),
    intro VARCHAR(50),
    PRIMARY KEY(id)
);
ALTER TABLE user
    MODIFY name VARCHAR(20) NOT NULL;
ALTER TABLE user
    MODIFY pwd VARCHAR(20) NOT NULL;