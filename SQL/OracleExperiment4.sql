--1.
CREATE TABLE book(bookid CHAR(10),booknum NUMBER,bookname VARCHAR2(20),bookpress VARCHAR2(50),bookprice NUMBER,typeid CHAR(10),booktime CHAR(8));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh','20191001');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh','20191001');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh','20191001');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej','19980101');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej','19980101');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej','19980101');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1638254850', 150, '现代汉语词典', '赛艇出版社', 60, 'heivhejvks','20190808');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1638254850', 150, '现代汉语词典', '赛艇出版社', 60, 'heivhejvks','20190808');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv','20190505');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv','20190505');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv','20190505');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv','20190505');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', '20190202');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', '20190202');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', '20190202');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', '20190202'); 
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', '20190303');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', '20190303');
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', '20190303');

SELECT bookpress, count(*) 
FROM book 
WHERE booktime like '2019%' and bookpress like '%社' 
HAVING count(*)>2 
GROUP BY bookpress, bookname 
ORDER BY count(*) DESC;

--2.
SELECT concat('19', substr(hiredate, 8, 2)) FROM scott.emp; 

--3．
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'dkwnf', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'ndkhf', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'nfkfi', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'fmdkr', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jfiek', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'nkfks', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'kgjef', '20190606');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'kewnf', '20190606');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1537392857', 'jeiwo', '20190707');

SELECT * FROM lend, book WHERE lend.bookid=book.bookid;

SELECT DISTINCT * FROM book WHERE bookid IN (SELECT bookid FROM( SELECT bookid FROM lend GROUP BY bookid ORDER BY COUNT(bookid) DESC) WHERE rownum<=3);

--4．
SELECT * FROM scott.emp INNER JOIN scott.dept ON scott.emp.deptno=scott.dept.deptno;
SELECT * FROM scott.emp INNER JOIN scott.dept ON scott.emp.deptno!=scott.dept.deptno;
SELECT * FROM scott.emp NATURAL JOIN scott.dept;
SELECT * FROM scott.emp LEFT OUTER JOIN scott.dept ON scott.emp.deptno=scott.dept.deptno;
SELECT * FROM scott.emp RIGHT OUTER JOIN scott.dept ON scott.emp.deptno=scott.dept.deptno;
SELECT * FROM scott.emp FULL OUTER JOIN scott.dept ON scott.emp.deptno=scott.dept.deptno;
SELECT * FROM scott.emp CROSS JOIN scott.dept WHERE scott.emp.deptno=scott.dept.deptno;

--5. 
SELECT * FROM scott.emp WHERE sal>2000 UNION ALL SELECT * FROM scott.emp WHERE sal<=2000;
SELECT * FROM scott.emp WHERE sal<2500 INTERSECT SELECT * FROM scott.emp WHERE sal>2000;
SELECT * FROM scott.emp WHERE sal>2000 MINUS SELECT * FROM scott.emp WHERE sal>3000;