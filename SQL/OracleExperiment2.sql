--1
CONNECT scott/tiger;
DISCONN;
SELECT * FROM scott.emp;
CONN system/manager as sysdba;

--2.
SELECT * FROM ;
APPEND scott.emp;
run;

SELECT * FROM scot.emp;
CHANGE /scot/scott;
run;

SELECT * FROM system.scott.emp;
CHANGE /system./;
run;

SELECT * FROM scott.emp;
LIST;
CLEAR BUFFER;
LIST

SELECT *;
INPUT;
FROM scott.emp
WHERE ename=’SMITH’;

SELECT *;
INPUT FROM scott.emp;
RUN;

SELECT *
FROM scott.emp
FROM scott.emp;
DEL;
RUN;

SELECT *
FROM scott.emp
FROM scott.emp
WHERE ename=’SMITH’;
DEL 3;
RUN;

SELECT *
FROM scott.emp
FROM scott.emp 
WHERE ename=’SMITH’
WHERE ename=’SMITH’;
DEL 3 4;
RUN;

SELECT *
FROM scott.emp;
LIST;

SELECT *
FROM scott.emp;
LIST 2;

SELECT * FROM scott.emp;
LIST;
RUN;

SELECT * FROM scott.emp
WHERE ename=’SMITH’;
1;

SELECT * 
FROM scott.emp
WHERE ename=’SMITH’;
3 WHERE ename=’ALLEN’;
RUN;

0 SELECT;
LIST;

--3.
SAVE aa.sql
get aa.sql
/

--4.
COLUMN empno HEADING 员工编号 FORMAT 9999;
COLUMN ename HEADING 员工姓名 FORMAT A10;
COLUMN mgr HEADING 上级编号 FORMAT 9999;
COLUMN sal HEADING 员工工资 FORMAT $99999.99;
COLUMN deptno HEADING 部门 FORMAT 9999;
SET PAGESIZE 40;
SET LINESIZE 80;
CLEAR COMPUTE;
BREAK ON deptno;
COMPUTE NUMBER OF ename ON deptno; 
SELECT empno, ename, mgr, sal, deptno
FROM scott.emp ORDER BY deptno;