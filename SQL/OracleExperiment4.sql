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

CREATE TABLE lend(bookid CHAR(10), readid CHAR(5), borrowdate CHAR(8));
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('5483558375', 'hfjej', '20190101');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('6382654926', 'jdhwi', '20190404');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'dhwkf', '20190606');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1638254850', 'dhwkf', '20190606');
INSERT INTO lend(bookid, readid, borrowdate) VALUES ('1537392857', 'hfjek', '20190707');

SELECT * FROM book WHERE bookid IN (SELECT bookid, count(*) FROM lend GROUP
 BY bookid ORDER BY count(*) DESC);