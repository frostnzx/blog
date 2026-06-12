
Date: 2025-01-23
Tag: #2110322-database 

# SQL
- ถูกกำหนดโดย ANSI
- ประกอบด้วย 2 ส่วนหลัก
	- DDL Data Definition Language - เป็นชุดคำสั่งเพื่อกำหนดหรือปรับแต่ง schema ของ database
	- DML Data Manipulation Language - เป็นชุดคำสั่งที่ใช้ในการจัการข้อมูล เช่น เพิ่ม ลด แก้ไข ในตารางต่างๆของฐานข้อมูล
	- DCL Data Control Language - เป็นชุดคำสั่งเพื่อจัการสิทธิ์ต่างๆของ ผู้ใช้เช่น Grant หรือ Revoke สิทธิ์ของ user ใดๆ

# DDL
---
- Create database
	- Syntax --> CREATE DATABASE \[dbname]; 
- Drop database
	- Syntax --> DROP DATABASE \[dbname];
- Create table
	```sql
	// Syntax
	CREATE TABLE table_name
	(
	colname1 data_type(size) constraint_name,
	colname2 data_type(size) constraint_name,
	colname3 data_type(size) constraint_name,
	…
	);
```

##### Constraint ที่ใช้บ่อย
---
- NOT NULL --> column ไม่สามารถเก็บ NULL ได้
- UNIQUE --> ทุก row ใน column นี้ไม่สามารถมีค่าซ้ำกับได้
- PRIMARY KEY --> combination ของ NOT NULL และ UNIQUE
	- มี column เดียวเป็น primary key
		- ``PRIMARY KEY (P_Id)``
	- สามารถมีหลาย column เป็น primary key ได้
		- `` CONSTRAINT pk_PersonID PRIMARY KEY (FirstName, LastName) ``
- FOREIGN KEY --> เพื่อให้ referential integrity ของข้อมูลใน table นั้น match กับ value ในอีก table
	- มี column เดียวเป็น foreign key
		- ``FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)``
	- สามารถมีหลาย column เป็น foreign key ได้
		- ``CONSTRAINT fk_PerOrders FOREIGN KEY (FName, LName) REFERENCES Persons2(FirstName, LastName)``
- CHECK --> เพื่อให้แน่ใจว่า data ใน column ตรงกับเงื่อนไขเฉพาะ
	```SQL
	// Check constraints on P_ID
	CHECK(P_Id>0)

	// Check constraints on multiple columns
	CONSTRAINTS chk_Person CHECK (P_Id > 0 AND City='Sandnes')
```
- DEFAULT --> กำหนด default value ใหักับ column
	- ``City varchar(255) DEFAULT 'Sandnes'``
	- กำหนด default จาก system value function --> ``OrderDate date DEFAULT GETDATE()``
		- GETDATE() เป็น system function ที่สามารถ generate date ปัจจุบันได้


##### Auto Increment
---
- SERIAL unique field 
	- Ex. ID SERIAL, มันจะเพิ่มค่าให้ SERIAL เอง

##### Alter Table
---
```SQL
CREATE TABLE FoodCart(
...
);
ALTER TABLE FoodCart(
ADD sold int
);

ALTER TABLE reserve ADD CONSTRAINT fk_sid FOREIGN KEY (sid) REFERENCES sailor(sid);
```

##### DROP TABLE
---
```SQL
DROP TABLE boat RESTRICT; // restrict is default
DROP TABLE boat CASCADE; // ถ้ามี table ไหนเอา pk ของอันนี้ไปเป็น fk ลบอันนั้นด้วย
```



# DML
---
- SELECT 
- INSERT
- UPDATE
- DELETE

#### รูปแบบพื้นฐานการทำ SQL queries
---
```sql
SELECT target-list
FROM relation-list
WHERE qualification
```
#### Projection using SELECT
---
```SQL
SELECT DISTINCT sname,age
FROM sailor;
```
- กำหนดว่าต้องมี Entity Integrity 
- ทำให้ SELECT ธรรมดา กลายเป็นการ projection

#### SELECT join
----
```SQL
// โจทย์ แสดงรายชื่อกะลาสีทั้งหมดที่เคยจองเรือหมายเลข 103
SELECT S.sname
FROM sailor S, reserve R // cartesian
WHERE S.sid = R.sid AND R.bid = 103; // Filter/join condition
```

#### AS
---
- ใช้เปลี่ยนชื่อ column
```SQL
SELECT S.sname , S.age , S.age - 1 AS age1 
```

#### LIKE
---
- ใช้เทียบ string ในการดึงข้อมูล
```SQL
SELECT S.sname
FROM sailor S
WHERE S.sname LIKE 'B%'
--- แปลว่า B ตามด้ว้ยอะไรกี่ตัวก็ได้ 
WHERE S.sname LIKE 'B_'
--- แปลว่า B แล้วตามด้วยอีกแค่ตัวเดียว
```

#### UNION,INTERSECT,EXCEPT
---
- เหมือนของ set ธรรมดา
- ไม่มีใน mySQL
```SQL
SELECT S.sname
FROM sailor S, boat B, reserve R
WHERE S.sid = R.sid AND R.bid = B.bid AND (B.color = 'Red' OR B.color = 'Green')
--- เขียนแบบนี้ก็ได้ แต่เขียนแบบ UNION/INTERSECT/EXCEPT เข้าใจง่ายกว่า

(SELECT S.sname FROM sailor S,boat B,reserve R WHERE S.sid = R.sid AND R.bid = B.bid AND B.color = 'Red')
UNION
(SELECT S.sanme FROM sailor S,boat B,reserve R WHERE S.sid = R.isd AND R.bid = B.bid AND B.color = 'Green');
```

#### Nested Query
---
```SQL
--- การใช้ IN 
SELECT S.sname FROM sailor S , boat B , reserve R WHERE S.sid = R.sid AND R.bid = B.bid AND B.color = 'Red'
AND S.sid IN (...)
--- เอาถ้า S.sid อยู่ใน (...)
```

#### Aggregation Operator
---
- COUNT(\*) : ควรใช้ * แต่ถ้าใส่ argument ข้างในจะไม่นับ row ที่ใน column ที่ใส่เป็น null
- SUM(A) : หาผลรวมค่าทั้งหมดใน column A
- AVG(A) : หาผลเฉลี่ยค่าทั้งหมดใน column A
- MAX(A) : หาค่ามากที่สุดจากค่าทั้งหมดใน column A
- MIN(A) : หาค่าที่น้อยที่สุดจากค่าทั้งหมดใน column A
```SQL
SELECT COUNT(*)
FROM sailor S;
```

#### Between ... AND
---
- condition ช่วงธรรมดา
```SQL
SELECT sname
FROM sailor 
WHERE age BETWEEN 25 AND 35
```

#### EXISTS
---
- EXISTS -> เป็นจริงเมื่อ subquery ไม่ว่าง
- NOT EXISTS -> เป็นจริงเมื่อ subquery ว่าง
```SQL
SELECT A
FROM B
WHERE EXISTS (...subquery)
```

#### Subquery predicate
---
- SOME 
- ALL
```SQL
SELECT account_number
FROM account
WHERE balance <= ALL(SELECT balance from account);
```

#### GROUP BY
---
- รวมกลุ่มรายการที่ค้นหาได้ มักใช้คู่กับ aggregate function
```SQL
SELECT branch_name, SUM(balance)
FROM account
GROUP BY branch_name;
```

#### HAVING
---
- เงื่อนไขเพิ่มเติมใช้คู่กับ GROUP BY
- filter เอาเฉพาะ group ที่ตรงตามเงื่อนไข
```SQL
SELECT ...
FROM ...
GROUP BY ...
HAVING ... > < = ... ; 
```

#### ORDER BY
---
- เงื่อนไขเพิ่มเติมใช้คู่กับ GROUP BY
- ไว้บอกว่าจะเรียงจากตัวอะไร
```SQL
SELECT ..
FROM ...
GROUP BY ...
HAVING ...
ORDER BY ...
```

#### JOIN
---
- join ตามปกติ
```SQL
--- condition join / inner join / join
--- ถ้าเอา * มันจะมี column ที่เป็น key ร่วมซ้ำ
SELECT *
FROM account A JOIN branch B ON A.branch_name = B.branch_name ; 

--- natural join
--- ถึงเอา * มันก็ไม่ซ้ำเพราะมันเอา column key ร่วมออกให้
--- ไม่ต้องกำหนด condition เพราะมันเลือกเอาเฉพาะอันที่มัน match กันทั้งหมดให้
SELECT *
FROM account NATURAL JOIN branch ; 


--- และ join อื่นๆ

```




