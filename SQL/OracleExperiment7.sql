--1.
CREATE USER xiaohong 
IDENTIFIED BY xiaohong11;

--2.(1)
GRANT CREATE SESSION TO xiaohong
WITH ADMIN OPTION;

--2.(2)
GRANT SELECT, INSERT ON scott.emp TO xiaohong WITH GRANT OPTION;
GRANT UPDATE (empno, ename) ON scott.emp TO xiaohong WITH GRANT OPTION;

--3.
CREATE ROLE manager IDENTIFIED BY manager11;

GRANT SELECT 
ON scott.dept TO manager;

GRANT manager TO xiaohong;

CONNECT xiaohong;
SET ROLE manager IDENTIFIED BY manager11;
SELECT * FROM scott.dept;