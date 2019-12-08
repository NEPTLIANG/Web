CREATE DATABASE EducationalAdministration;
USE EducationalAdministration;

/*创建表*/
--DROP TABLE student;
CREATE TABLE student  /*学生表*/
	(sno char(10), 
	sname char(20), 
	gender char(2), 
	age int, 
	depart char(3), 
	specialty char(50),
	spwd varchar(20),
	PRIMARY KEY(sno));

--DROP TABLE department;
CREATE TABLE department  /*部门表*/
	(no char(3) PRIMARY KEY,
	name char(20),
	dean char(4));
	
--DROP TABLE teacher;
CREATE TABLE teacher  /*教师表*/
	(tno char(4),
	tname char(20),
	gender char(2),
	age int,
	prof char(10),
	depart char(3),
	tpwd varchar(20),
	PRIMARY KEY(tno));

--DROP TABLE course;
CREATE TABLE course  /*课程表*/
	(cno char(8),
	cname char(20),
	pcno char(8),
	tno char(4),
	PRIMARY KEY(cno),
	--FOREIGN KEY(pcno) REFERENCES course(cno),
	FOREIGN KEY(tno) REFERENCES teacher(tno));

--DROP TABLE score;
CREATE TABLE score  /*选课（成绩）表*/
	(sno char(10),
	cno char(8),
	grade int,
	PRIMARY KEY(sno, cno),
	FOREIGN KEY(sno) REFERENCES student(sno),
	FOREIGN KEY(cno) REFERENCES course(cno));

--DROP TABLE admin;
CREATE TABLE admin  /*管理员*/
	(adminID varchar(20) PRIMARY KEY,
	adminPwd varchar(20))

/*插入数据*/
INSERT INTO course(cno, cname, pcno, tno)
	VALUES ('08181060', '高级语言程序设计', '08181170', '0301'),
	('08181170', '数据结构', '', '0129'),
	('08181192', '数据库原理', '08181170', '0128'),
	('08181803', '数据库课程设计', '08191311', '0128'),
	('08191311', '大型数据库设计', '08181192', '0128'),
	('08195371', 'C#程序设计', '08181060', '0131'),
	('08196060', '软件测试设计', '08181170', '0130'),
	('08196281', '算法分析与设计', '08181170', '0220');

INSERT INTO department(no, name, dean)
	VALUES ('001', '信息工程学院', '0128'),
	('002', '商学院', '0220'),
	('003', '机电工程学院', '0301'),
	('004', '生命科学与技术学院', '0403');

INSERT INTO score(sno, cno, grade)
VALUES ('2015874101', '08181060', 85),
	('2015874101', '08181170', 75),
	('2015874101', '08181192', 70),
	('2015874107', '08181060', 80),
	('2015874107', '08181170', 86),
	('2015874107', '08181192', 67),
	('2015874107', '08181803', 88),
	('2015874107', '08191311', 70),
	('2015874107', '08195371', 93),
	('2015874107', '08196060', 87),
	('2015874107', '08196281', 89),
	('2015874111', '08181170', 70),
	('2015874111', '08181192', 77),
	('2015874111', '08181803', 50),
	('2015874111', '08191311', 90),
	('2015874111', '08195371', 79),
	('2015874114', '08181060', 60),
	('2015874114', '08191311', 80),
	('2015874114', '08195371', 70),
	('2015874114', '08196060', 85),
	('2015874114', '08196281', 81),
	('2015874144', '08181060', 60),
	('2015874144', '08181170', 91),
	('2015874144', '08181192', 90),
	('2015874144', '08181803', 80),
	('2015874144', '08191311', 81),
	('2015874144', '08195371', 50),
	('2015874144', '08196060', 65),
	('2015874144', '08196281', 70),
	('2015874145', '08181060', 88),
	('2015874145', '08191311', 90),
	('2015874145', '08196281', 86);

INSERT INTO student(sno, sname ,gender, age, depart, specialty, spwd)
	VALUES ('2015874101', '何金凤', '女', 20, '001', 'The Internet of things engineering', '123'),
	('2015874103', '古美坤', '女', 20, '001', 'The Internet of things engineering', '456'),
	('2015874107', '黄嘉欣', '女', 22, '002', 'Information Management and Information Systems', '789'),
	('2015874109', '谭海龙', '男', 22, '002', 'Information Management and Information Systems', ''),
	('2015874110', '崔迅', '男', 21, '001', 'software engineering', ''),
	('2015874111', '黄万宗', '男', 22, '001', 'computer science and technology', ''),
	('2015874114', '张心蕊', '女', 21, '003', 'Mechanical engineering', ''),
	('2015874116', '池癸生', '男', 22, '002', 'Information Management and Information Systems', ''),
	('2015874120', '覃锋', '男', 21, '001', 'software engineering', ''),
	('2015874121', '欧嘉丽', '女', 21, '001', 'The Internet of things engineering', ''),
	('2015874123', '肖雅支', '女', 19, '001', 'computer science and technology', ''),
	('2015874124', '刘嘉荣', '男', 19, '001', 'computer science and technology', ''),
	('2015874129', '陈嘉宁', '男', 19, '001', 'computer science and technology', ''),
	('2015874133', '黄清文', '男', 21, '001', 'software engineering', ''),
	('2015874134', '陈耀鹏', '男', 21, '001', 'software engineering', ''),
	('2015874138', '何俊昊', '男', 22, '001', 'software engineering', ''),
	('2015874140', '王宣尹', '女', 21, '003', 'Mechanical engineering', ''),
	('2015874143', '麦舒婷', '女', 20, '001', 'computer science and technology', ''),
	('2015874144', '王日滔', '男', 20, '001', 'software engineering', ''),
	('2015874145', '莫金玲', '女', 20, '001', 'The Internet of things engineering', '');

INSERT INTO teacher(tno, tname, gender, age, prof, depart, tpwd)
	VALUES ('0128', '卓不凡', '男', 40, '教授', '001', '123'),
	('0129', '端木元', '男', 45,	'研究生', '001', '456'),
	('0130', '萧远森', '男', 25,	'讲师', '001', '789'),
	('0131', '褚万里', '男', 30,	'副教授', '001', ''),
	('0220', '左子穆', '男', 35,	'教授', '002', ''),
	('0301', '辛双清', '女', 28,	'教授', '003', ''),
	('0402', '司空玄', '男', 31,	'讲师', '004', ''),
	('0403', '龚小茗', '女', 30,	'教授', '004', '');

INSERT INTO admin(adminID, adminPwd)
	VALUES ('admin', 'admin');