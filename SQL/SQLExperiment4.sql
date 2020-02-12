--SQL实验4
--1. 
--(1) 创建存储过程，给定老师姓名，删除学习该老师的选课记录。存储过程的参数为老师姓名，返回删除记录的个数。
 create procedure p0
@tname char(20),@delete_cn int output
as 
begin
delete 
from score
where cno = (
      select cno
	  from course
	  where tno =(
	        select tno
			from teacher
			where tname=@tname
			     )
			) 
	set @delete_cn=@@rowcount
	end

declare @delete_geshu int 
execute p0 '卓不凡',@delete_geshu output
print @delete_geshu

--(2)创建存储过程，给定老师姓名，把score表中该老师授课成绩低于60分的改为0分。返回修改记录的个数。 
create proc p1
@tname char(20),@update_cn int output
as 
begin
update score
set grade=0
where  cno = (
      select cno
	  from course
	  where tno = (
	        select tno
			from teacher
			where tname=@tname
			      )
			)
		and grade<60
		set @update_cn=@@rowcount
		end

declare @declare_geshu int
exec p1'卓不凡',@declare_geshu output
print @declare_geshu

--(3)创建存储过程，给定学号、课程号和成绩，如果在score表中有该选课记录，更新该选课的成绩，如果没有，则在score表中插入一条新记录。数据更新成功，返回1，数据更新失败，返回-1。 
create procedure p2
@sno char(10),@cno char(10),@grade int
as
begin
if exists(select * from score where sno=@sno and cno=@cno)
begin
update score
set grade=@grade
where sno=@sno and cno=@cno
return 1
end
  else
   begin
    insert into score
    values(@sno,@cno,@grade)
    return -1
   end
end


--2.
--（1）创建一个点delete触发器，删除course表中的课程信息时，同时删除score表中相应的选课信息。
create trigger t1
on course
for delete
as
delete score
where cno=(
      select cno
	  from deleted)

--（2）创建一个update触发器，当更新course表中的课程标号cno时，修改score表中相应课程标号cno的信息。
create trigger update_course on course
   instead of update
AS 
BEGIN
  declare @cno_new char(10), @cno_old char(10),@rows int
  select @cno_new=cno from inserted  --更新后的课程号
  select @cno_old=cno from deleted   --更新前的课程号
  select @rows=count(*) from course where cno=@cno_new
  if @rows = 0
    insert into course 
      select * from inserted      --在course中插入更新后的数据
  insert into score(sno,cno) 
     select sno, @cno_new from score where cno=@cno_old   --在score中插入新数据
  delete from score where cno=@cno_old  --删除旧数据
  delete from course where cno=@cno_old
END


--3. 
--（1）使用游标将选修课程学生的信息以格式化屏幕输出。（学生姓名，课程名称，成绩）
declare @xm char(20),@kcmc char(20),@cj int
declare c1 cursor
for 
   select sname,cname,grade
   from student s,course c,score sc
   where s.sno=sc.sno and c.cno=sc.cno

--（2）将选修表的记录成绩高于平均分的将成绩提高10%，否则删除。
declare @grade int
   declare c2 cursor
   for 
   select grade 
   from score
   open c2
   fetch next from c2 into @grade
   while @@fetch_status=0
   begin
   if @grade>(
       select avg(grade)
	   from score
	         )
   update score
   set grade=grade+grade*0.1
   where current of c2
else
  delete
  from score
  where current of c2
  fetch next from c2 into @grade
end
close c2
deallocate c2