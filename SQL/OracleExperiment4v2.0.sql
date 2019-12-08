CREATE TABLE book(bookid CHAR(10),booknum NUMBER,bookname VARCHAR2(20),bookpress VARCHAR2(50),bookprice NUMBER,typeid CHAR(10),booktime CHAR(10));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh', ADD_MONTHS(SYSDATE, -1));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh', ADD_MONTHS(SYSDATE, -1));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5483558375', 210, '他改变了中国', '赛艇出版社', 50, 'jfdiengjsh', ADD_MONTHS(SYSDATE, -1));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej', ADD_MONTHS(SYSDATE, -260));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej', ADD_MONTHS(SYSDATE, -260));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('6382654926', 220, '渗透测试从入门到入狱', '赛艇出版社', 40, 'hfiekhcgej', ADD_MONTHS(SYSDATE, -260));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1638254850', 150, '现代汉语词典', '赛艇出版社', 60, 'heivhejvks', ADD_MONTHS(SYSDATE, -1));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1638254850', 150, '现代汉语词典', '赛艇出版社', 60, 'heivhejvks', ADD_MONTHS(SYSDATE, -1));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('1537392857', 230, '热风', '赛车', 70, 'hfhekdheiv', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', SYSDATE);
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', SYSDATE);
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', SYSDATE);
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('5846394635', 240, '看见', '赛艇出版社', 70, 'hduejchejf', SYSDATE);
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', ADD_MONTHS(SYSDATE, -2));
INSERT INTO book(bookid,booknum,bookname,bookpress,bookprice,typeid,booktime) VALUES ('4625385725', 250, '一九八四', '赛飞机出版社', 80, 'hkdhekghsk', ADD_MONTHS(SYSDATE, -2));

CREATE TABLE lend(bookid CHAR(10), readid CHAR(5), borrowdate VARCHAR2(20));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', ADD_MONTHS(SYSDATE, -1));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', ADD_MONTHS(SYSDATE, -2));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', SYSDATE);
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', ADD_MONTHS(SYSDATE, -1));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', SYSDATE);
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', ADD_MONTHS(SYSDATE, -1));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', ADD_MONTHS(SYSDATE, -2));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'dhwkf', SYSDATE);
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'dhwkf', ADD_MONTHS(SYSDATE, -1));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1537392857', 'hfjek', SYSDATE);

SELECT * FROM book WHERE bookid IN (SELECT bookid, count(*) FROM lend GROUP
 BY bookid ORDER BY count(*) DESC);