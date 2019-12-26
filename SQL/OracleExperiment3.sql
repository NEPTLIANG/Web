--1.
CREATE TABLESPACE myspace
DATAFILE ‘E:\myspace.dbf’
SIZE 20M
AUTOEXTEND ON NEXT 5M MAXSIZE 100M;

ALTER TABLESPACE myspace
ADD DATAFILE ‘E:\myspace02.dbf’
SIZE 10M
AUTOEXTEND ON NEXT 5M MAXSIZE 40M;

ALTER TABLESPACE myspace
DROP DATAFILE ‘E:\myspace02.dbf’;

DROP TABLESPACE myspace
INCLUDING CONTENTS AND DATAFILES;

--2.
CREATE TABLE student(
stuid char(10), 
sname char(20), 
sex char(2), 
birthday char(8), 
majorid char(10), 
class char(10), 
score float
);

CREATE TABLE major(
majorid char(10) ,
majorname char(10)
);

SELECT table_name, tablespace_name
FROM user_tables
WHERE table_name=’STUDENT’;

--3.
ALTER TABLE student
MODIFY sname NOT NULL;

ALTER TABLE student
ADD PRIMARY KEY (stuid);

ALTER TABLE major
ADD PRIMARY KEY (majorid);

ALTER TABLE student
ADD UNIQUE (class);

ALTER TABLE student
ADD CHECK (sex IN (‘男’, ‘女’));

ALTER TABLE student
ADD FOREIGN KEY (majorid) REFERENCES major(majorid);

--4.
INSERT INTO major(majorid, majorname)
VALUES (‘123’, ‘计科’);
INSERT INTO major(majorid, majorname)
VALUES (‘456’, ‘软工’);
INSERT INTO major(majorid, majorname)
VALUES (‘789’, ‘外包’);

INSERT INTO student(stuid, sname, sex, birthday, majorid, class, score)
VALUES ('123', '张', '男', '12345', '123', '123567', 60);
INSERT INTO student(stuid ,sname, sex, birthday, majorid, class, score)
VALUES ('456', '李', '男', '12345', '456', '1234567', 70);

--(1)
CREATE VIEW stu_view 
AS     
SELECT stuid, sname, sex, majorid 
FROM student         
WHERE sex='男';      

INSERT INTO stu_view(stuid, sname, sex, majorid)  
VALUES ('345', '邱', '女', '123');   

DROP VIEW stu_view;
CREATE VIEW stu_view                                                      
AS                                                                        
SELECT stuid, sname, sex, majorid                                         
FROM student                                                              
WHERE sex='男'                                                            
WITH CHECK OPTION CONSTRAINT stu_view_check;  

INSERT INTO stu_view(stuid, sname, sex, majorid)  
VALUES ('234', '邱同学', '女', '123');

--(2)
CREATE VIEW stu_view2
AS
SELECT stuid, sname, score+100 newscore, majorid  
FROM student;

INSERT INTO stu_view2 
VALUES ('234', '梁', 60, '123');

--(3)
CREATE VIEW stu_view3
AS
SELECT stuid, sname, score, student.majorid, majorname 
FROM student, major
WHERE student.majorid=major.majorid;

INSERT INTO stu_view3                                                 
VALUES ('234', '梁', 60, '123', '计科');