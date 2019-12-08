--1.
SET SERVEROUTPUT ON;
CREATE OR REPLACE PROCEDURE one  --OR REPLACE创建或替换
(no CHAR)  --输入参数用括号，不写长度
AS  --变量写在AS和BEGIN之间
	name CHAR(10);  --不用DECLARE语句
	dno CHAR(10);
BEGIN
	SELECT ename, deptno
	INTO name, dno
	FROM scott.emp  --其他用户查询要指明用户名
	WHERE empno=no;
	DBMS_OUTPUT.PUT_LINE('员工' || no || '的姓名：' || name 
		|| '，所在部门编号：' || dno);  --||连接字符串和变量；字符串要用单引号
END one;  --可在END后标明存储过程名以说明是END哪个存储过程
/

EXEC one('7902');  --调用存储过程要用EXEC，要在括号里给参数赋值

--2.
CREATE FUNCTION two
(id CHAR)
RETURN CHAR  --RETURN声明返回值类型，不写长度
AS
	judgeResult='' CHAR(10);  --返回值变量和其他变量一起在AS和BEGIN之间声明
	bookDate booktime DATE;
	lendDate DATE;
	borrowCount INTEGER;
BEGIN
	SELECT booktime
		INTO bookDate
		FROM book
		WHERE bookid=id;
	IF bookDate BETWEEN SYSDATE AND ADD_MONTHS(SYSDATE, -1) THEN  --IF完条件后要以THEN开始
		SELECT COUNT(*)
			INTO borrowCount
			FROM lend
			WHERE bookid=id;
		IF borrowCount > 2 THEN
			judgeResult = 'new hot';
		ELSE
			judgeResult = 'new';
		END IF;  --IF结束要END IF
	ELSE
		IF borrowCount > 2
			judgeResult = 'hot';
		END IF;
	END IF;
	RETRUN judgeResult;  --返回判断结果
END two;
/

SELECT two('5483558375');