
Date: 2025-02-03
Tag: #2110322-database 

#### INSERT
---
```SQL
INSERT INTO table_name (col1,col2,col3,...)
VALUES (value1,value2,value3,...);

INSERT INTO table_name 
VALUES (value1,value2,value3,...);

--- แบบที่ 1 -> เลือกบาง column 
--- แบบที่ 2 -> ต้องใส่ให้ครบทุก column
```

#### DELETE
----
```SQL
DELETE FROM table_name WHERE condition ; 
```

#### UPDATE
---
```SQL
UPDATE table_name 
SET column1 = value1, column2 = value2,...
WHERE condition;
```

#### Stored routines
---
- เป็น subroutine ที่สามารถใช้การเข้าถึงญานข้อมูลแบบ relational
- stored routine ใน PostgreSQL เขียนได้หลายภาษา แต่จะใช่ PL/pgSQL
- PL/pgSQL เป็น block-structured language ใช้ห่อหุ้มชุดคำสั่ง SQL ในรูป object เก็บไว้ใน database server
- สามารถเรียกใช้ชุดคำสั่งผ่าน stored routine ได้โดยไม่ต้องเขียนใหม่ทุกครั้ง

## PL/pgSQL
---
```plsql
do $$
<<first_block>>
declare
	account_count integer := 0;
begin
	-- get the number of accounts
	select count(*)
	into account_count
	from account;
	-- display
	raise notice 'The number of account is %', account_count;
end first_block $$;
```

##### Row type declaration
---
- เก็บ row เดียว
```plsql
do $$
<<first_block>>
declare 
	selected_account account%rowtype;
begin
	-- get the branch_name and balance of account number 4
	select *
	into selected_account
	from account
	where account_number = '4';
	-- display a message
	raise notice 'The branch_name and balance is %,%',
		selected_account.branch_name,
		selected_account.balance;
end first_block $$;
```

##### Record type declaration
---
- เป็นตัวแปรเชิงโครงสร้างเหมือน struct ใน c
- ใช้คู่กับ for ได้
```plsql
do $$
<<first_block>>
declare
   selected_accounts record;
begin
   -- get all accounts with the balance >= 100
   for selected_accounts in 
	select account_number, branch_name, balance 
   	from account
   	where balance >= 100
	order by balance
   loop
   	-- display a message
   	raise notice 'The account_number branch_name and balance is %, %, %', 
		selected_accounts.branch_name, 
		selected_accounts.balance,
		selected_accounts.balance;
   end loop;
end first_block $$;
```

##### Constant declaration
---
```plsql
do $$
<<first_block>>
declare
   start_at constant time = now();
begin
   -- display a message
   raise notice 'The current time is %', start_at;
end first_block $$;
```

#### Assert statement
---
- แสดง message alert เมื่อเงื่อนไขเป็น null
```plsql
do $$ 
<<first_block>>
declare
  account_count integer := 0;
begin
   -- get the number of accounts
   select count(*) 
   into account_count
   from account;
   -- assert a message when the assert conditon is false or null
   assert account_count > 1000, 'Test assert ';
end first_block $$;
```

#### if-then-else statement
---
- if , then , else elsif , end if
```plsql
do $$ 
<<first_block>>
declare
  selected_account account%rowtype;
  input_account_number account.account_number%type := 6;
begin
   -- get the account with specific account number
   select * from account
   into selected_account
   where account_number = input_account_number;
   
   if not found then 
	raise notice 'The account number % could not be found', 
		input_account_number;
   else
	raise notice 'The branch_name and balance is % and %', 
		selected_account.branch_name,
                selected_account.balance;
   end if;
end first_block $$;
```

#### While loop
---
```plsql
do $$
declare 
   counter integer := 0;
begin
   while counter < 5 loop
      raise notice 'Counter %', counter;
	  counter := counter + 1;
   end loop;
end$$;
```

#### For loop
---
```plsql
do $$
begin
   for counter in 1..5 loop
	raise notice 'counter: %', counter;
   end loop;
end; $$
```

```plsql
do $$
<<first_block>>
declare
	selected_accounts record;
begin
	-- get all accounts with the balance >= 100
	for selected_accounts in select account_number, branch_name,balance
		from account
		where balance >= 100
		order by balance
	loop
	-- display a message
	raise notice 'The account_number branch_name and balance is %,%,%',
		selected_accounts.branch_name,
		selected_accounts.balance,
		selected_accounts.balance;
	end loop
end first_block $$;
```

#### Stored Functions (SF)
---
- Function ที่ถูกเรียกใช้เพื่อให้ทำงานแล้วส่งผลลัพธ์กลับมา, Procedure มักทำงานเสร็จแล้วไม่ต้องส่งผลลัพธ์
- การใช้งานเหมือนกับ Aggregated functions
```plsql
create [or replace] function function_name(param_list)
returns return_type
language plpgsql
as
$$
	declare 
	-- variable declaration
	begin
	-- logic
	end;
$$
```

```plsql
CREATE OR REPLACE FUNCTION customer_level(p_moneylevel FLOAT)
    RETURNS VARCHAR(10)
    LANGUAGE plpgsql
    AS
$$
DECLARE 
    lvl varchar(10);
BEGIN
    IF p_moneylevel > 500 THEN
        lvl := 'PLATINUM';
    ELSEIF (p_moneylevel <= 500 AND p_moneylevel >= 100) THEN
        lvl := 'GOLD';
    ELSEIF p_moneylevel < 100 THEN
        lvl := 'SILVER';
    END IF;
    RETURN (lvl);
END;
$$
```


### Stored Procedure
---
- stored procedure ทำ transaction ได้, แต่ stored function ไม่ได้
- parameter มีเฉพาะ IN , INOUT ไม่มี OUT
- ไม่มีการ return ค่า
- เรียกด้วยคำสั่ง CALL
```plsql
CREATE or REPLACE procedue transfer(
	from_acct VARCHAR(2),
	to_acct VARCHAR(2),
	amount NUMERIC
)
language plpgsql
AS $$
BEGIN
-- subtracting the amount from the sender's account
	UPDATE account
	SET balance = balance - amount
	WHERE account_number = from_acct ; 
-- adding the amount to the receiver's account
	UPDATE account
	SET balance = balance + amount 
	WHERE account_number = to_acct;

	COMMIT;
END;$$
```
- stored procedure มีการทำ transcation (ก็คือ atomicity หรือ all or nothing)
- transaction เริ่มเมื่อทำ procedure
- transaction จบที่คำสั่ง commit

### Trigger
---
- ทำ function พิเศษที่เอาไว้ผูกกับ event บางอย่างในตารางบางตาราง
- พวก event เช่น INSERT , UPDATE , DELETE , ...
- มี 2 ระดับ
	- Row-level triggers
		- ทำในแต่ละบรรทัดที่มันเกี่ยวข้อง
	- Statement-level triggers
		- ถูกทำครั้งเดียว
```plsql
--- สร้างตารางเอาไว้เก็บ log ก่อน
CREATE TABLE TriggerTime(exec_time timestamp NOT NULL);

--- สร้าง function ที่เป็นตัวเก็บ log
CREATE OR REPLACE FUNCTION log_adding_new_account()
    RETURNS TRIGGER
language plpgsql
AS $$
BEGIN
    INSERT INTO TriggerTime VALUES(now());
    RETURN NULL;
END;
$$

--- สร้าง trigger เป็นตัวผูก event การ insert ในตาราง account เข้ากับ function
CREATE TRIGGER adding_new_account
	BEFORE INSERT
	ON account
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_new_account();

```
- ถ้าเป็น BEFORE UPDATE / INSERT เราต้อง RETURN NEW ใน trigger function ด้วย ถ้าเราไม่ RETURN NEW operation นั้นจะถูก cancel
- FOR EACH ROW แปลว่า เราจะทำ function นี้กับทุก row ที่มีผลกระทบจากการ INSERT / UPDATE /...

#### VIEW
---
- View เป็นตารางเสมือนที่มี attribute และค่าเป็นผลจากการ query
- ช่วยให้ query clean มากขึ้น
- View ถูกรันใหม่ทุกครั้ง ดังนั้นข้อมูลก็จะเปลี่ยนไปด้วย
```plsql
CREATE VIEW top_product AS
SELECT product_id
FROM ordered_products
WHERE sum_products IN (SELECT MAX(sum_products) FROM ordered_products);
```
- ใช้ view แบบ read-only เท่านั้นไม่ควรไป insert
- ใช้ view มี cost สูง เพราะ virtual table ถูกสร้างใหม่ทุกครั้งที่ view ถูกใช้งาน


#### Indexing
---
- นำ attribute ที่กำหนดเป็น indexing attribute มาช่วยในการเข้าถึงข้อมูลจากตาราง
- pk และ fk ได้รับ index อัตโนมิติ
- ควร index attribute ที่ใช้ค้นหรือเรียงลำดับประจำ จะช่วยให้การ query ที่ใช้ attribute นั้นเร็วขึ้น
```plsql
EXPLAIN ANALYZE SELECT * FROM customer WHERE country = 'Thailand';
## ใช้ attribute country ในการ search
CREATE INDEX country_idx ON customer(country);

EXPLAIN ANALYZE SELECT * FROM customer WHERE country = 'Thailand';
## หลัง index แล้วมา query อีกทีมันจะเร็วขึ้น
```

#### Transcation, Commit, Rollback
---
##### Transaction
- BEGIN -> operation1 -> operation2 -> .... -> COMMIT (เขียนลง database)
- BEGIN -> operation1 ->operation2 (error) -> ROLLBACK (ยกเลิกทั้ง transaction เปลี่ยน state เป็นก่อน BEGIN)
```pgsql
// เริ่มได้ 3 วิธี
BEGIN TRANSACTION;
BEGIN WORK;
BEGIN;
```

```sql
START TRANSACTION
INSERT INTO boat VALUES(112,'AAA','Black');
INSERT INTO boat VALUES(113,'BBB','Red');
SELECT * FROM boat;
COMMIT;
```









