CREATE DATABASE	TextbookManagement;  /*�������ݿ�*/

/*�л������ݿ�*/
USE TextbookManagement;

/*������*/
/*DROP TABLE Book;*/
/*CREATE TABLE Book			/*�α�*/
	(bookName varchar(50), 
	ISBN char(14), 
	bookPublishingHouse varchar(50), 
	bookType varchar(20), 
	demandedQuantity int, 
	bookInventoryQuantity int);
CREATE TABLE OrderForm			/*����*/
	(TimeOfPlaceTheOrder datetime,
	ISBN char(14),
	bookPrice float,
	bookPublishingHouse varchar(50),
	orderQuantity int) ;
/*DROP TABLE bePutInStorageRecord;*/
CREATE TABLE bePutInStorageRecord		/*����¼*/
	(TimeOfbePutInStorage datetime,
	ISBN char(14),
	bePutInStorageQuantity int,
	storageRackNum varchar);
/*DROP TABLE DeliveryOfCargoFromStorageRecord*/
CREATE TABLE DeliveryOfCargoFromStorageRecord		/*���ü�¼*/
	(TimeOfDeliveryOfCargoFromStorage datetime,
	ISBN char(14),
	storageRackNum varchar(10),
	DeliveryOfCargoFromStorageQuantity int,
	getClass varchar(10));
CREATE TABLE Administrator			/*����Ա*/
	(adminID varchar(10),
	adminPwd varchar(20),
	adminModificationPermission bit,
	adminRemovePermission bit,
	adminPhoneNum char(11));*/

/*����������Լ������ӷǿ�Լ�����������Լ��*/
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

/*�����������*/
INSERT INTO Administrator(adminID, adminPwd, adminModificationPermission, 
	adminRemovePermission, adminPhoneNum)
	VALUES('admin', '6f67c16e74d856b6', 1, 
		1, '12580');
SELECT * FROM Administrator;

INSERT INTO Book(bookName, ISBN, bookPublishingHouse, bookType, 
	demandedQuantity, bookInventoryQuantity)
	VALUES('���ݿ���ƴ����ŵ�ɾ����·', '4444444444444', '��·������', '�����',
		2048, 2048),
		('��͸���Դ����ŵ�����', '2222222222222', '�ѷ�������', '�����',
			128, 256),
		('PHP�����ŵ�����', '3333333333333', '�ѷ�������', '�����',
			2048, 2048),
		('���ı����й�', '1111111111111', '��ͧ������', '����ѧ',
			1024, 512),
		('ë��ѡ���������', '5555555555555', '̫�������', '����ѧ',
			128, 256),
		('äɮ���ܷ�����ʵ�����', '6666666666666', '�������ǳ�����', '����',
			128, 256);
SELECT * FROM Book;

DECLARE @date1 datetime, @date2 datetime, @date3 datetime;
SELECT @date1=GETDATE(); 
SELECT @date2=GETDATE();
SELECT @date3=GETDATE();
SELECT @date1, @date2, @date3;
INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, bookPublishingHouse, orderQuantity)
	VALUES(@date1, '4444444444444', 200, '��·������', 2048),
		(@date2,  '6666666666666', 180, '�������ǳ�����', 128),
		(@date3, '2222222222222', 160, '�ѷ�������', 128);
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
		'B', 90, '17�ƿ�2��');
SELECT Book.bookName, DeliveryOfCargoFromStorageRecord.*
	FROM DeliveryOfCargoFromStorageRecord JOIN Book 
	ON DeliveryOfCargoFromStorageRecord.ISBN=Book.ISBN;

/*�洢����*/
/*EXECUTE sp_help QueryBookRecord;  /*��ѯ�洢������Ϣ*/
DROP PROCEDURE QueryBookRecord;*/  /*ɾ���洢����*/
/*DROP PROCEDURE QueryOrderFormbyType;*/  /*ɾ���洢����*/
/*CREATE PROCEDURE QueryOrderFormbyType			/*��ѯĳ���鼮��ȫ����¼*/
	@type varchar(50)
AS
BEGIN
	/*DECLARE @name varchar(50);
	SELECT @name='���ݿ���ƴ����ŵ�ɾ����·';*/
	SELECT Book.bookType, Book.bookName, OrderForm.*
	FROM OrderForm JOIN Book ON Book.ISBN=OrderForm.ISBN
	WHERE Book.bookType=@type;
END*/
EXECUTE QueryOrderFormbyType @type='����ѧ';

/*INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, bookPublishingHouse, orderQuantity)
	VALUES(GETDATE(),  '6666666666666', 180, '�������ǳ�����', 128);
INSERT INTO DeliveryOfCargoFromStorageRecord(TimeOfDeliveryOfCargoFromStorage, ISBN, 
	storageRackNum, DeliveryOfCargoFromStorageQuantity, getClass)
	VALUES(GETDATE(), '6666666666666', 
		'B', 90, '17�ƿ�2��');*/
/*EXECUTE sp_help CountRecord;
DROP PROCEDURE CountRecord;*/
/*CREATE PROCEDURE CountRecord			/*ͳ�Ƹ��ֽ̲ĵĶ����������ͷ�������*/
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
		SELECT @count1 AS ��������, @count2 AS ��������, @count3 AS ��������;
	END*/
EXECUTE CountRecord 'äɮ���ܷ�����ʵ�����';

/*������*/
/*INSERT INTO Book(bookName, ISBN, bookPublishingHouse, bookType, 
	demandedQuantity, bookInventoryQuantity)
	VALUES('һ�Ű���', '7777777777777', 'Ԥ�Գ�����', 'С˵',
		2048, 2048);
SELECT * FROM Book;
INSERT INTO OrderForm(TimeOfPlaceTheOrder, ISBN, bookPrice, 
	bookPublishingHouse, orderQuantity)
	VALUES(GETDATE(), '7777777777777', 200, 
		'Ԥ�Գ�����', 2048);
SELECT Book.bookName, OrderForm.* 
	FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN;
DELETE
	FROM Book
	WHERE ISBN='7777777777777';
SELECT * FROM Book;
SELECT Book.bookName, OrderForm.* 
	FROM OrderForm JOIN Book ON OrderForm.ISBN=Book.ISBN;*/
/*CREATE TRIGGER tr_DelBook			/*ɾ���鼮�Զ�ɾ����Ӧ�ļ�¼*/
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
/*CREATE TRIGGER tr_alterInStor			/*���ʱ�Զ��޸Ŀ������*/
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
	VALUES('һ�Ű���', '7777777777777', 'Ԥ�Գ�����', 'С˵',
		2048, 2048);
SELECT * FROM Book;
INSERT INTO DeliveryOfCargoFromStorageRecord(TimeOfDeliveryOfCargoFromStorage, ISBN, 
	storageRackNum, DeliveryOfCargoFromStorageQuantity, getClass)
	VALUES(GETDATE(), '7777777777777', 
		'B', 90, '17�ƿ�2��');
SELECT Book.bookName, DeliveryOfCargoFromStorageRecord.*
	FROM DeliveryOfCargoFromStorageRecord JOIN Book 
	ON DeliveryOfCargoFromStorageRecord.ISBN=Book.ISBN;
SELECT * FROM Book;*/
/*CREATE TRIGGER tr_alterOutStor		/*����ʱ�Զ��޸Ŀ������*/
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