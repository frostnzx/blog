
Date: 2025-01-16
Tag: #2110322-database 


## Relational Model
---
- ตารางค่าข้อมูล
- relation อาจมองว่าเป็น set ของ columns
- บางทีสามารถนำ row-id หรือ sequential number มา identify row ในตารางได้
- Schema of a Relation --> R(A1, A2 , .....An)
- A มีค่าอยู่ใน domain D ใน R
- D is called the Domain of A1 , and is denoted by dom(A1)
		CUSTOMER (Cust-id , Cust-name , Address , Phone#)
		The domain of Cust-id in this case is 6 digit numbers
- tuple --> an ordered set of values , ทุก value เป็นค่าใน domain , ทุก row ใน CUSTOMER table สามารถมองเป็น tuple ได้
- Relation มองเป็น set ของ tuples (rows) ได้
- Columns ใน table สามารถเรียกเป็น attribute ของ relation ได้
- Domain --> มีนิยามเป็น logic , ex. USA_phone_numbers are the set of 10 digit phone number valid in the USA
- Domain อาจจะมี format ของมันเองเช่น dd/mm/yyyy
- Relation r ของ relation schema R(A1 , A2 , ... , An) เขียนแทนด้วย r(R), เป็นเซ็ตของ n-tuples r = {t1 , t2 , ... , tm}
- R -> relation schema (intention) , r -> specific value (extension)
- ถ้าให้ relation schema (R) ประกอบด้วย A1-An ดังนั้น value ของมันคือค่า r(R) ที่เกิดจาก d1 x d2 x ... dn
- attribute หลายๆตัว share domain กันได้

```
Example
Let s1 = {0 , 1}
Let s2 = {a , b , c}
Let R   s1 x s2    // เอา relation มา join กัน
Then:
	r(R) = {<0,a> , <0,b> , <1,c>}
	// this is one possible extension r of relation R define over domain S1 , S2
```

#### Definition summary
---
- Relation --> Table
- Attribute --> Column header
- Tuple --> Row
- Domain --> ค่าที่เป็นไปได้ของ attribute
- Relation schema (intension) --> Table definition made up of relation name R and list of attribute A1,A2,...
- Specific value (extension) --> set of tuples

#### Characteristics of relations
---
- Notation 
	- สำหารับ R(A1 , A2 , A3 , ... , An) มี degree n
	- t = <v1 , v2, v3, ... ,vn> คือ tuple ที่มีค่าตาม attribute n ตัว คือ v ซึ่ง tuple นี้จะอยู่ใน relation r ที่สร้างตาม schema R หรือเขียนได้ว่า r(R)
#### Relational database constraints
---
- Inherent model-based constraints --> มันมีอยู่แล้วเพราะเป็น database เช่น no duplicate tuple
- Schema-based constraints --> สามารถเขียนได้ใน schema ของ data model
- Application based constraints --> ถูกเขียนอยู่ที่ application

#### Relational constraints
---
- ใช่สำหรับทุกก instance ใน database
- ประเภทมีดังนี้
	- Domain constraints --> value ทุกตัวแบ่งต่อไปไม่ได้แล้ว , datatype จะเป็นอะไรก็ได้ แต่ห้ามเป็นอะไรก็ตามที่แบ่งได้อีก หรือ ไม่ atomic
	- Key constraints --> เนื่องจาก relation ประกอบด้วยหลายๆ tuple มาเรียงกันในแต่ละ tuple ห้ามมี tuple ใดๆซ้ำกัน
		- เรียกตัวที่ทำให้แตกต่างกันว่า Superkey (SK) ดังนั้น \[SK] not equal to t2\[SK]
		- ทุก relation มีอย่างน้อยหนึ่ง default Superkey คือเอา attribute ทั้งหมดมารวมกัน
		- superkey -> เอาหลายๆตัวมารวมกันแต่ที่รวมนั้นต้องมีตัวที่เป็น key
		- key --> คือ superkey ที่ไม่สามารถแยกเล็กกว่านี้ได้แล้ว

#### Entity Integrity
---
- สมมุติมี S = {R1 , R2 , ... , Rn} 
- Entity Integrity
	- Primary key หรือ PK ของทุก relation schema R ใน S ไม่สามารถมี null value ใน tuple ได้ เพราะต้องการใช้มันมา identify

#### Referential Integrity
---
- เกี่ยวกับ 2 relation คือ referencing relation (ตัวที่กำลังจะไป reference เขา) , referenced relation (ตัวที่ถูกทำการ reference)
- ข้อมูลที่อยู่ใน referencing relation จะสร้าง Foreign key (FK) ที่จะไป reference primary key ของอีก table นึง 
- ดังนั้น Foreign key คือ key ที่เกิดขึ้นเมื่อใดก็ตามที่เราต้องการ reference 2 relation เข้าด้วยกัน
	- EX. t1 in R1 is said to reference a tuple t2 in R2 if t1\[FK] = t2\[FK]
- Foreign ไม่จำเป็นว่าจะต้องเป็น primary key ของ tuple มันเองเพราะมันอาจจะเป็น null ได้

#### Update operations on relations
---
- INSERT
	- insert a new tuple or tuples in a relation
- DELETE
	- delete tuple or tuples in a relation
- UPDATE or MODIFY
	- change the value of some attribute in existing tuple
- operation พวกนี้จะเป็นไปตาม Integrity constraint

#### ER to Relational Mapping Algorithm
---
- Step 1 : Mapping of Regular Entity Type
	- ดูใน ER diagram ว่ามี regular entity type (strong entity type) ไหม ถ้ามี ให้ทุกตัวนั้นเป็น E แล้วก็ให้ create relation R โดยที่แต่ละ R มี simple attribute ทั้งหมดของแต่ละ E กล่าวคือสร้างตารางแยกของทุกๆ strong entity type
	- note ว่าการที่แต่ละ R มีแต่ simple attribute แปลว่าถ้ามันเป็น composite ก็ไปเอามาแต่ตัวท้ายสุดมา
	- ไปเอา primary key ใน E มาเป็น primary key ของ R ด้วย
- Step 2 : Mapping of Weak Entity Types
	- ยังไงทุกๆ weak entity type ก็ต้องมี owner ดังนั้นให้ owner ทุกตัวเป็น E, ตัวที่ weak เรียกว่า W , สร้าง relation R ที่มี simple attribute ทั้งหมดของ W เข้ามาอยู่ใน R ที่พึ่งสร้างมานี้
	- สร้าง foreign key attribute จาก R ซึ่งจะได้มาจาก primary key ของ owner หลังจากเอามา
	- จากนั้นนำ foreign key และ partial key ใน W มารวมกันเป็น attribute ใหม่ซึ่งจะทำหน้าที่เป็น primary key ของอันนี้ (เป็นเส้นลากยาว)
- Step 3 : Mapping of Binary 1:1 Relation Types
	- ไปดูทุก relation ship type ที่เป็น 1 : 1 แล้วสำหรับแต่ละตัว ให้ S และ T เป็น 2 ฝัั่งของ relationship นั้นๆ โดยที่
	- มีวิธีทำอยู่ 3 วิธี ทำแบบไหนก็ได้
		1. Foreign key approach : เลือกข้างนึงเป็น S แล้วสร้าง foreign key ใน S ซึ่งไอ้ foreign key ตัวนี้ก็คือ primary key ของ T, หลังจากนั้นถ้า relationship นั้่นมี attribute ก็ให้จับมาใส่ฝั่ง S ซึ่งควรเลือก entity type ที่เป็น total participation เพื่อมาเป็นฝั่ง S
		2. Merge relation : ให้เอา attribute ทั้งหมดมารวมกันให้หมด, แต่วิธี merge นี้จะใช่ได้เฉพาะกรณีที่ทั้งสองข้างเป็น total participation มันจะได้ไม่ null
		3. Cross-reference : ให้สร้าง relation ใหม่ขึ้นมาชื่อว่า R แล้วให้ relation นี้เชื่อมสองฝั่งนั้น แต่เนื่องจากมันจะไปเอา key มาจากทั้งสองฝั่งดังนั้นเราต้องกำหนดให้เป็น key ร่วม 
- Step 4 : Mapping of Binary 1 : N Relation Types
	- สำหรับทุก regular binary 1 : N relationship เรียกว่า R แล้วให้ฝั่งที่เป็น N เรียกว่าฝั่ง S
	- จากนั้นในฝั่ง S ให้เอา primary key ของ T มาเป็น foreign key ของฝั่ง S นี้
	- ถ้า R นี้มี attribute ก็ให้นำมาใส่เป็น attribute ของฝั่ง S ด้วย
- Step 5 : Mapping of Binary M : N Relationship Types
	- สำหรับทุก regular binary M : N relationship เรียกว่า R แล้วสร้างใหม่ขึ้นมาอีกก้อนนึงเรียกว่า S 
	- นำ primary key ของทั้งสองฝั่งมาใน S เพื่อทำหน้าที่เป็น foreign key
	- combination ของ foregin key ของทั้งสองฝั่งนี้จะได้เป็น primary key ของ S               (combination = เส้นลากยาว)
	- ถ้ามี R นี้มี attribute ก็ให้นำมาใส่เป็น attribute ของฝั่ง S ด้วย
	- เอาจริงๆมันก็เหมือนวิธี cross-reference
- Step 6 : Mapping of Multivalued attribute
	- สำหรับทุก multivalued attribute A ที่เจอใน entity E เราจะสร้าง relation R ขึ้นมาใหม่
	- แล้วใน R จะมี attribute ตาม A และยังมี foreign key K ที่ได้ค่ามาจาก primary key ของ E เพื่อที่จะได้รู้ว่า R เป็น multivalued attribute ของ entity อะไร
	- primary key ของ R คือ combination ของ A กับ K
- Step 7 : Mapping of N-ary Relationship types
	- สำหรับทุก n-ary relationship type R ซึ่ง n > 2 ให้สร้าง relationship S 
	- ใน S ให้สร้าง foreign key ขึ้นมาซึ่งค่าได้มาจาก primary key ของทุก entity ที่เกี่ยวข้องกับ R
	- primary key จะได้มาจาก combination ของ primary key ของข้างที่ constraint ไม่เป็น 1 ส่วนข้างที่เป็น 1 ก็เป็นได้แค่ foreign key (combination แปลว่ามันลากยาวต่อกัน)
	- ถ้า R มี attribute ก็นำมาใส่ใน S ด้วย
- Step 8 : Option for Mapping Specialization or Generalization (superclass / subclass)
	- สร้าง relation ขึ้นมาสำหรับ superclass 
	- สร้าง relation ของ subclass แล้วในทุกๆ relation ของ subclass จะมี primary key (foreign key) เป็น primary key ของ superclass
- Step 9 : Mapping of Union Types (Categories)
	- Map superclass ทุกตัวตามปกติเพราะมันเป็น strong entity ธรรมดา
	- สร้าง attribute ใหม่มาชื่อ surrogate_key แล้วนำไปใส่ในแต่ละ relation ของ superclass