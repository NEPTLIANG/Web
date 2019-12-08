--1.1
SET SERVEROUTPUT ON;
DECLARE
	num CONSTANT scott.emp.empno%TYPE := 7839;
	name scott.emp.ename%TYPE;
	job scott.emp.job%TYPE;
	sal scott.emp.sal%TYPE;
	dno scott.emp.deptno%TYPE;
BEGIN
	SELECT ename, job, sal, deptno
	INTO name, job, sal, dno
	FROM scott.emp WHERE empno = num;
	DBMS_OUTPUT.PUT_LINE('编号：' || num);
	DBMS_OUTPUT.PUT_LINE('姓名：' || name);
	DBMS_OUTPUT.PUT_LINE('职位：' || job);
	DBMS_OUTPUT.PUT_LINE('工资：' || sal);
	DBMS_OUTPUT.PUT_LINE('部门编号：' || dno);
END;
/

--1.2
SET SERBEROUTPUT ON;
DECLARE
	num CONSTANT scott.emp.empno%TYPE := 7839;
	human scott.emp%ROWTYPE;
BEGIN
	SELECT *
	INTO human
	FROM scott.emp WHERE empno = num;
	DBMS_OUTPUT.PUT_LINE('编号：' || num);
	DBMS_OUTPUT.PUT_LINE('姓名：' || human.ename);
	DBMS_OUTPUT.PUT_LINE('职位：' || human.job);
	DBMS_OUTPUT.PUT_LINE('工资：' || human.sal);
	DBMS_OUTPUT.PUT_LINE('部门编号：' || human.deptno);
END;
/

--1.3
SET SERVEROUTPUT ON;
DECLARE
	TYPE human IS RECORD (
		empno NUMBER(4),
		ename VARCHAR2(10),
		job VARCHAR2(9),
		sal NUMBER(7, 2),
		deptno NUMBER
	);
	ahuman human;
BEGIN
	SELECT empno, ename, job, sal, deptno
	INTO ahuman
	FROM scott.emp WHERE empno = 7839;
	DBMS_OUTPUT.PUT_LINE('编号：' || ahuman.empno);
	DBMS_OUTPUT.PUT_LINE('姓名：' || ahuman.ename);
	DBMS_OUTPUT.PUT_LINE('职位：' || ahuman.job);
	DBMS_OUTPUT.PUT_LINE('工资：' || ahuman.sal);
	DBMS_OUTPUT.PUT_LINE('部门编号：' || ahuman.deptno);
END;
/

--1.4
SET SERVEROUTPUT ON;
DECLARE
	TYPE tab IS TABLE OF scott.emp%ROWTYPE
	INDEX BY BINARY_INTEGER;
	newtab tab;
BEGIN
	SELECT empno, ename, job, sal, deptno
	INTO newtab(1).empno, newtab(1).ename, newtab(1).job, newtab(1).sal, newtab(1).deptno
	FROM scott.emp WHERE empno = 7839;
	DBMS_OUTPUT.PUT_LINE('编号：' || newtab(1).empno);
	DBMS_OUTPUT.PUT_LINE('姓名：' || newtab(1).ename);
	DBMS_OUTPUT.PUT_LINE('职位：' || newtab(1).job);
	DBMS_OUTPUT.PUT_LINE('工资：' || newtab(1).sal);
	DBMS_OUTPUT.PUT_LINE('部门编号：' || newtab(1).deptno);
END;
/

--2.
SELECT b.bookname, b.bookpress, b.booktime,
(
	CASE
		WHEN (booktime BETWEEN ADD_MONTHS(SYSDATE, -1) AND SYSDATE)
			AND (
				(SELECT COUNT(l.bookid) FROM lend l 
					WHERE l.bookid = b.bookid 
						AND (l.borrowdate BETWEEN ADD_MONTHS(SYSDATE, -1) AND SYSDATE)
				) >= 3
			)
			THEN 'New, Hot'
		WHEN booktime BETWEEN ADD_MONTHS(SYSDATE, -1) AND SYSDATE
			THEN 'New'
		WHEN (SELECT COUNT(l.bookid) FROM lend l WHERE l.bookid = b.bookid
			AND (l.borrowdate BETWEEN ADD_MONTHS(SYSDATE, -1) AND SYSDATE) ) >= 3
			THEN 'Hot'
		ELSE ' '
	END
)
FROM book b;

--3.
SET SERVEROUTPUT ON;
DECLARE
	CURSOR emp_cursor (num NUMBER := 10)
	IS
	SELECT empno, ename, job, sal
	FROM scott.emp WHERE deptno = num;
	TYPE human IS RECORD (
		empno NUMBER(4),
		ename VARCHAR2(10),
		job VARCHAR2(9),
		sal NUMBER(7, 2)
	);
	ahuman human;
BEGIN
	OPEN emp_cursor;
	LOOP
		FETCH emp_cursor INTO ahuman;
		EXIT WHEN emp_cursor%NOTFOUND;
		DBMS_OUTPUT.PUT_LINE('编号：' || ahuman.empno || '，姓名：' || ahuman.ename || '，工资：' || ahuman.sal);
	END LOOP;
	CLOSE emp_cursor;
END;