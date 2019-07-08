CREATE DATABASE	TextbookManagement;  /*创建数据库*/

/*切换到数据库*/
USE TextbookManagement;

/*创建表*/
/*DROP TABLE Book;*/
/*CREATE TABLE Book			/*课本*/
	(bookName varchar(50), 
	ISBN char(14), 
	bookPublishingHouse varchar(50), 
	bookType varchar(20), 
	demandedQuantity int, 
	bookInventoryQuantity int);
CREATE TABLE OrderForm			/*订单*/
	(TimeOfPlaceTheOrder datetime,
	ISBN char(14),
	bookPrice float,
	bookPublishingHouse varchar(50),
	orderQuantity int) ;
/*DROP TABLE bePutInStorageRecord;*/
CREATE TABLE bePutInStorageRecord		/*入库记录*/
	(TimeOfbePutInStorage datetime,
	ISBN char(14),
	bePutInStorageQuantity int,
	storageRackNum varchar);
/*DROP TABLE DeliveryOfCargoFromStorageRecord*/
CREATE TABLE DeliveryOfCargoFromStorageRecord		/*领用记录*/
	(TimeOfDeliveryOfCargoFromStorage datetime,
	ISBN char(14),
	storageRackNum varchar(10),
	DeliveryOfCargoFromStorageQuantity int,
	getClass varchar(10));
CREATE TABLE Administrator			/*管理员*/
	(adminID varchar(10),
	adminPwd varchar(20),
	adminModificationPermission bit,
	adminRemovePermission bit,
	adminPhoneNum char(11));*/

/*给列添加外键约束、添加非空约束后添加主键约束*/
ALTER TABLE Book
	ALTER COLUMN ISBN char(14) NOT NULL;
ALTER TABLE Book
	ADD CONSTRAINT pkBook PRIMARY KEY(ISBN);

/*ALTER TABLE OrderForm
	ALTER COLUMN TimeOfPlaceTheOrder datetime NOT NULL;
ALTER TABLE OrderForm
	ADD CONSTRAINT pkOrderForm PRIMARY KEY(TimeOfPlaceTheOrder);*/
/*ALTER TABLE OrderForm
	DROP CONSTRAINT pkOrderForm;*/
ALTER TABLE OrderForm
	ADD CONSTRAINT pk_orderForm FOREIGN KEY(ISBN) REFERENCES Book(ISBN);

/*ALTER TABLE bePutInStorageRecord
	DROP CONSTRAINT pkInStor;*/
/*ALTER TABLE bePutInStorageRecord
	ALTER COLUMN TimeOfbePutInStorage datetime NOT NULL;
ALTER TABLE bePutInStorageRecord
	ADD CONSTRAINT pkInStor PRIMARY KEY(TimeOfbePutInStorage);*/
ALTER TABLE bePutInStorageRecord
	ADD CONSTRAINT fk_isbn FOREIGN KEY(ISBN) REFERENCES Book(ISBN);

/*ALTER TABLE DeliveryOfCargoFromStorageRecord
	ALTER COLUMN TimeOfDeliveryOfCargoFromStorage datetime NOT NULL;
ALTER TABLE DeliveryOfCargoFromStorageRecord
	DROP CONSTRAINT pkDeliFromStor;*/
ALTER TABLE DeliveryOfCargoFromStorageRecord
	ADD CONSTRAINT fk_outStor FOREIGN KEY(ISBN) REFERENCES Book(ISBN);

ALTER TABLE Administrator
	ALTER COLUMN adminID varchar(10) NOT NULL;
ALTER TABLE Administrator
	ADD CONSTRAINT pkAdmin PRIMARY KEY(adminID);

/*插入测试数据*/
INSERT INTO Administrator(adminID, adminPwd, adminModificationPermission, 
	adminRemovePermission, adminPhoneNum)
	VALUES('admin', '6f67c16e74d856b6', 1, 
		1, '12580');
SELECT * FROM Administrator;

INSERT INTO Book(bookName, ISBN, bookPublishingHouse, bookType, 
	demandedQuantity, bookInventoryQuantity)
	VALUES('数据库设计从入门到删库跑路', '4444444444444', '跑路出版社', '计算机',
		2048, 2048),
		('渗透测试从入门到入狱', '2222222222222', '脱发出版社', '计算机',
			128, 256),
		('PHP从入门到入土', '3333333333333', '脱发出版社', '计算机',
			2048, 2048),
		('他改变了中国', '1111111111111', '赛艇出版社', '社会科学',
			1024, 512),
		('毛泽东选集（第五卷）', '5555555555555', '太祖出版社', '社会科学',
			128, 256),
		('盲僧技能分析与实例详解', '6666666666666', '德玛西亚出版社', '体育',
			128, 256);
SELECT * FROM Book;

DECLARE @date1 datetime, @date2 datetime, @date3 datetime;
SELECT @date1=GETDATE(); 
SELECT @date2=GETDATE();
SELECT @date3=GETDATE();
SELECT @date1, @date2, @date3;
INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, bookPublishingHouse, orderQuantity)
	VALUES(@date1, '4444444444444', 200, '跑路出版社', 2048),
		(@date2,  '6666666666666', 180, '德玛西亚出版社', 128),
		(@date3, '2222222222222', 160, '脱发出版社', 128);
SELECT Book.bookName, OrderForm.* 
	FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN;

INSERT INTO bePutInStorageRecord(TimeOfbePutInStorage, ISBN, 
	bePutInStorageQuantity, storageRackNum)
	VALUES(GETDATE(), '4444444444444', 200, 'A'),
		(GETDATE(), '6666666666666', 180, 'B');
SELECT Book.bookName, bePutInStorageRecord.*
	FROM bePutInStorageRecord JOIN Book ON bePutInStorageRecord.ISBN=Book.ISBN;

INSERT INTO DeliveryOfCargoFromStorageRecord(TimeOfDeliveryOfCargoFromStorage, ISBN, 
	storageRackNum, DeliveryOfCargoFromStorageQuantity, getClass)
	VALUES(GETDATE(), '6666666666666', 
		'B', 90, '17计科2班');
SELECT Book.bookName, DeliveryOfCargoFromStorageRecord.*
	FROM DeliveryOfCargoFromStorageRecord JOIN Book 
	ON DeliveryOfCargoFromStorageRecord.ISBN=Book.ISBN;

/*存储过程*/
/*EXECUTE sp_help QueryBookRecord;  /*查询存储过程信息*/
DROP PROCEDURE QueryBookRecord;*/  /*删除存储过程*/
/*DROP PROCEDURE QueryOrderFormbyType;*/  /*删除存储过程*/
/*CREATE PROCEDURE QueryOrderFormbyType			/*查询某种书籍的全部记录*/
	@type varchar(50)
AS
BEGIN
	/*DECLARE @name varchar(50);
	SELECT @name='数据库设计从入门到删库跑路';*/
	SELECT Book.bookType, Book.bookName, OrderForm.*
	FROM OrderForm JOIN Book ON Book.ISBN=OrderForm.ISBN
	WHERE Book.bookType=@type;
END*/
EXECUTE QueryOrderFormbyType @type='社会科学';

/*INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, bookPublishingHouse, orderQuantity)
	VALUES(GETDATE(),  '6666666666666', 180, '德玛西亚出版社', 128);
INSERT INTO DeliveryOfCargoFromStorageRecord(TimeOfDeliveryOfCargoFromStorage, ISBN, 
	storageRackNum, DeliveryOfCargoFromStorageQuantity, getClass)
	VALUES(GETDATE(), '6666666666666', 
		'B', 90, '17计科2班');*/
/*EXECUTE sp_help CountRecord;
DROP PROCEDURE CountRecord;*/
/*CREATE PROCEDURE CountRecord			/*统计各种教材的订购、到货和发放数量*/
	@name varchar(50)
	AS
	BEGIN
		DECLARE @count1 int, @count2 int, @count3 int, @count int;
		SELECT @count1=SUM(orderQuantity)
			FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN
			WHERE Book.bookName=@name;
		SELECT @count2=SUM(bePutInStorageQuantity)
			FROM bePutInStorageRecord JOIN Book ON bePutInStorageRecord.ISBN=Book.ISBN
			WHERE Book.bookName=@name;
		SELECT @count3=SUM(DeliveryOfCargoFromStorageQuantity)
			FROM DeliveryOfCargoFromStorageRecord JOIN Book ON DeliveryOfCargoFromStorageRecord.ISBN=Book.ISBN
			WHERE Book.bookName=@name;
		/*SET @count = @count1+@count2+@count3;*/
		SELECT @count1 AS 订购数量, @count2 AS 到货数量, @count3 AS 发放数量;
	END*/
EXECUTE CountRecord '盲僧技能分析与实例详解';

/*触发器*/
/*INSERT INTO Book(bookName, ISBN, bookPublishingHouse, bookType, 
	demandedQuantity, bookInventoryQuantity)
	VALUES('一九八四', '7777777777777', '预言出版社', '小说',
		2048, 2048);
SELECT * FROM Book;
INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, 
	bookPublishingHouse, orderQuantity)
	VALUES(GETDATE(), '7777777777777', 200, 
		'预言出版社', 2048);
SELECT Book.bookName, OrderForm.* 
	FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN;
DELETE
	FROM Book
	WHERE ISBN='7777777777777';
SELECT * FROM Book;
SELECT Book.bookName, OrderForm.* 
	FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN;*/
/*CREATE TRIGGER tr_DelBook			/*删除书籍自动删除对应的记录*/
	ON Book
	FOR DELETE
	AS
	BEGIN
		DELETE OrderForm
		WHERE ISBN IN (
			SELECT ISBN
			FROM deleted)
		DELETE bePutInStorageRecord
		WHERE ISBN IN (
			SELECT ISBN
			FROM deleted)
		DELETE DeliveryOfCargoFromStorageRecord
		WHERE ISBN IN (
			SELECT ISBN
			FROM deleted)
	END*/

/*SELECT * FROM Book;
INSERT INTO bePutInStorageRecord(TimeOfbePutInStorage, ISBN, 
	bePutInStorageQuantity, storageRackNum)
	VALUES(GETDATE(), '7777777777777', 200, 'A');
SELECT Book.bookName, bePutInStorageRecord.*
	FROM bePutInStorageRecord JOIN Book ON bePutInStorageRecord.ISBN=Book.ISBN;
SELECT * FROM Book;*/
/*CREATE TRIGGER tr_alterInStor			/*入库时自动修改库存数量*/
	ON bePutInStorageRecord
	FOR INSERT
	AS
	BEGIN
		DECLARE @quantity int;
		SELECT @quantity=Book.bookInventoryQuantity
			FROM Book
			WHERE ISBN=(
				SELECT ISBN
					FROM inserted)
		SELECT @quantity;
		DECLARE @outQuan int;
		SELECT @outQuan=bePutInStorageQuantity
			FROM inserted
		UPDATE Book
		SET bookInventoryQuantity=@quantity+@outQuan
		WHERE Book.ISBN=(
			SELECT ISBN
			FROM inserted)
	END*/

/*INSERT INTO Book(bookName, ISBN, bookPublishingHouse, bookType, 
	demandedQuantity, bookInventoryQuantity)
	VALUES('一九八四', '7777777777777', '预言出版社', '小说',
		2048, 2048);
SELECT * FROM Book;
INSERT INTO DeliveryOfCargoFromStorageRecord(TimeOfDeliveryOfCargoFromStorage, ISBN, 
	storageRackNum, DeliveryOfCargoFromStorageQuantity, getClass)
	VALUES(GETDATE(), '7777777777777', 
		'B', 90, '17计科2班');
SELECT Book.bookName, DeliveryOfCargoFromStorageRecord.*
	FROM DeliveryOfCargoFromStorageRecord JOIN Book 
	ON DeliveryOfCargoFromStorageRecord.ISBN=Book.ISBN;
SELECT * FROM Book;*/
/*CREATE TRIGGER tr_alterOutStor		/*出库时自动修改库存数量*/
	ON DeliveryOfCargoFromStorageRecord
	FOR INSERT
	AS
	BEGIN
		DECLARE @quantity int;
		SELECT @quantity=Book.demandedQuantity
			FROM Book
			WHERE ISBN=(
				SELECT ISBN
					FROM inserted)
		SELECT @quantity;
		DECLARE @outQuan int;
		SELECT @outQuan=DeliveryOfCargoFromStorageQuantity
			FROM inserted
		UPDATE Book
		SET bookInventoryQuantity=@quantity-@outQuan
		WHERE Book.ISBN=(
			SELECT ISBN
			FROM inserted)
	END*/