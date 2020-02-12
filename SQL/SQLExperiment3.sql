--SQL实验3
--1、创建一张history_student表（结构同student），将学生表中数据全部插入到history_student表中。
create table history_student
(sno char(10),
sname char(20),
gender char(2),
age int,
depart char(3),
specialty char(50),
primary key(sno),
foreign key(depart) references department(no))

insert into history_student
select *
from student
 

--2、新插入一门课程，并默认所有学生都选修该门课程插入到成绩表中（成绩为NULL）。
insert into course(cno,cname,pcno,tno)
values
('08181111','大数据','08181170','0130')
insert into score(sno,cno)
select sno,'08181111'
from student
 

--3、将所有成绩为空的成绩全部修改为60分。
update score
set grade=60
where grade is null
 

--4、将所有平均成绩低于60分的学生成绩记录删除。
delete 
from score
where sno=(
select sno
from score 
group by sno
having avg(grade)<60
)


--5、创建一个视图VIEW1：查询d01系学生的信息，只投影学生学号，姓名，年龄，系。要求在进行更新操作时满足约束。
create view view1
as
select sno,sname,age,depart
from student
where depart='001'
with check option

 
--6、由VIEW1导出一个视图VIEW2：查询年龄在18到20岁的学生。
create view view2
as
select *
from view1
where age between 18 and 20
 

--7、将查询语句select sno,sname from view2 where ssex=’女’等价转换为对基本表的查询语句并运行结果。
select sno,sname
from student
where age between 18 and 20 and gender='女'
 

--8、将VIEW1,VIEW2删除。
drop 
view view1,view2


--9、创建登录用户：USER1,USER2,USER3,DBA给USER1授予select,update(sage)权限，并允许其传递授权；USER1授予select,update(sage)权限给USER2，其中select允许传递；USER2授予select权限给USER3,不允许传递；DBA给USER3授予update(sage)权限，不允许其传递授权。
use mytest1
go
grant select, update(age)
on student
to uesr1
with grant option

use mytest1
go
grant select
on student
to user2
with grant option

grant update(age)
on student
to user2
with grant option

grant select
on student
to user3

use mytest1
go grant select
on student
to user3


--10、将第9题中的所有权限逐级回收。
revoke select
on student
from user3

revoke update(age)
on student
from user3

revoke update(age)
on studnet
from user2
cascade

revoke select
on student
from user2
cascade

use mytest1
go 
revoke select,update(age)
on student
from user1
cascade