---
title: "Database lecture 02"
date: "2025-01-09"
published: true
kind: "note"
course: "2110322 database"
tags:
  - "2110322-database"
---

### DBMS
#### Data Independence
---
Logical data independence --> เปลี่ยน logical (conceptual) ไม่กระทบกับ external (view)
Physical data independence --> เปลี่ยน physical ไม่กระทบกับ logical (conceptual) , external (view)

#### ER Model Concpets
---
Entities --> สิ่งของที่เราสนใจจะเก็บใน database
Attributes --> คุณสมบัติของ entity
- Simple attribute --> มีค่าเดี่ยวแยกออกไม่ได้ เช่น เลขบัตรประจำตัวประชาชน มีค่าเดี่ยว (single atomic value)
- Composite  attribute --> ประกอบไปด้วยหลายๆส่วนเช่น Address จะมี Street , City , ZipCode , Country 
> Hierarchy of composite attributes อาจจะมี components ที่ตัวมันเองเป็น composite ซึ่งจะทำให้เป็นโครงสร้างแบบต้นไม้
	- Multi value attribute --> จะมีค่าหลายค่า เช่น รายการ PreviousDegree ซึ่งจะมีหลายค่าเพราะอาจจะเรียนมาหลายที่ ใช้ ปีกกา `{ }` ใน schema diagram แต่ใน ER ไม่ใช้ เหมือน array
	- Complex attribute --> multi value attribute ที่เก็บ composite attribute หลายค่าเช่น `{PreviousDegrees(College , Year , Degree , Field)}` พูดง่ายๆว่า array ของ composite attribute


#### Entity types and Key Attributes
---
Entity type --> เป็นเหมือน blueprint ของ entity เสมือน class
Entity set --> เป็นเซตที่เก็บรวมทุก object ของ class Entity type ต่างๆ
Key attribute --> เป็น attribute ที่ทำให้แต่ละ entity ใน entity set แตกต่างกันแน่ๆ เช่น EmployeeID ที่จะต่างกันแน่ๆ แต่ Name อาจจะไม่ต่างกันเพราะอาจจะมีหลายๆคนชื่อเดียวกัน ดังนั้น Name จึงไม่เป็น key attribute

#### Value sets (domains) of attribute
---
Simple attribute ต้องสอดคล้องกับ value set

#### Relationship
---
Relationship --> ความสัมพันธ์ของ 2 entity ขึ้นไป
Degree of relationship --> จำนวน entity ที่ถูก link
1. Unary relationship
		เมื่อมีการเชื่อมโยงกับ 1 entity เช่น
		entity->person , relation->married to
2. Binary relationship
		เมื่อมีการเชื่อมโยงกับ 2 entity เช่น
		entity->publisher,book , relation->publishes
3. Ternary relationship
		เมื่อมีการเชื่อมโยงกับ 3 entity เช่น
		entity->teacher,subject,student , relation->teaches
		
Relationship Constraints
1. Cardinality Ratio
		จำนวน relationship ที่มากที่สุดที่ entity สามารถ participate
		เช่น 1:1 , 1:N , N:1 , M:N
		```
		Ex.1
		เช่น Employee -(1)-> Manages -(1)-> Department
		หมายความว่า Employee จะ Manage Department ได้แค่ 1 เท่านั้น และ
		Department จะมี Employee ที่มา Manage ได้แค่ 1 เท่านั้นเช่นกัน
		Ex.2
		เช่น Employee -(N)-> Work_for -(1)-> Department
		หมายความว่า Employee จะ work_for Department ได้ 1 เท่านัน และ
		Department จะมี Employee ได้ N
		```
2. Participation Constraints
		กำหนดว่า entity ทุกตัวใน entity set participate ใน relationship หรือไม่ มี 2 แบบ Total participation และ Partial participation
3. Min Max notation constraint
	- ให้ Entity : E , Relationship : R
	- ให้ entity e ใน E มี คสพ อย่างน้อย min แล้วอย่างมาก max คสพใน R
	- เช่น E -(0 ,1)-> R แปลว่า e แต่ละตัวใน E สามารถมีคสพได้อย่างน้อย 0 อย่างมาก 1 คสพ
		
Attribute of Relationship Types
- Attribute ของ 1:1 หรือ 1:N สามารถ migrate ไปในหนึ่งของ entity ที่ participate
		ใน 1:1 , attribute สามารถ migrate ไปด้านไหนก็ได้
		ใน 1:N หรือ N:1 , attribute สามารถ migrate ไปได้เฉพาะด้าน N
		ใน M:N , attribute จะขึ้นอยู่กับ combination ของ สองฝั่งโดยเฉพาะ ดังนั่นมันจึงไม่ migrate ไปเป็น attribute ของฝั่งไหน แต่จะเป็น attribute ที่อยู่กับ relationship เลย
		```
		Ex 
		Entities: 
		- Student : StudentID , Name
		- Course : CourseID , Title
		Relationship: Enrolled_In
			Attribute -> EnrollmentDate , Grade
		Attribute พวกนี้ไม่สามารถไปอยู่ฝั่ง Student หรือ Course ได้
		เพราะ ?
		- EnrollmentDate ไม่สามารถเป็นของ student ได้เพราะ student ก็อาจจะ enroll หลายวิชา
		- Grade ก็ไม่สามารถเป็นของ Course ได้เพราะทุก Course สามารถมี Grade ที่แตกต่างกันให้กับ Student แต่ละคน
		```
Recursive relationship type
- Entity ที่เกี่ยวข้องมีตัวเดียวแต่อาจจะมี role ที่ต่างกันได้ เช่น 
		Relationship : Supervision
		Entity : Employee (Boss) , Employee (Worker)

#### Weak Entity Type
---
- An entity that does not have a key attribute
- เมื่อไม่มี key attribute ก็ต้องไปยืม key คนอื่นมา
- เช่น (weak) dependent -> (strong) employee
- มี partial key ก็คือ key ที่จะ unique เฉพาะต่อตัว strong ทีมันเชื่อมอยู่แต่ไม่ unique สำหรับทุก weak ตัวนั้น, เช่น นายA และ นายB มี weak entity เป็นลูก แล้วแต่ละลูกมี partial key เป็นชื่อของเด็กแต่ละคนนั้น ซึ่ง partial key จะแตกต่างเฉพาะตัวนายคนนึงเพราะไม่มีใครบ้าตั้งชื่อลูกตัวเองซ้ำกันอยู่แล้ว แต่ อาจจะมีโอกาสไปตั้งซ้ำกับลูกคนอื่นได้ ดังนั้น partial key จึงต้องอาศัย key ของ strong ซึ่งจะมาช่วย identify เพื่อให้มัน unique สำหรับทุกๆ weak นี้

#### Subclass and Superclass 
---
- An entity type may have additional meaningful subgroup of its entity
- EX. EMPLOYEE may be futher grouped into SECRETARY , ENGINEER, MANAGER, TECHNICIAN, SLARIED_EMPLOYEE, HOURLY_EMPLOYEE
	- each grouping is a subset of EMPLOYEE entities
	- each is called a subclass of EMPLOYEE
	- EMPLOYEE is superclass for each of these subclass
	EX. EMPLOYEE/SECRETARY , EMPLOYEE/TECHNICIAN
- also called IS-A relationship
- Subclass member is the same entity in a distinct specific role
- An entity cannot exist in the database only by being a member of subclass it must also be member of superclass
***จะมี subclass ยังไงก็ต้องมี superclass***

#### Specialization
---
- มองจากข้างล่างขึ้นไป
- สมมุติ ตอนเก็บข้อมูลเรารวม Entity หลายๆตัวมี group เป็น superclass 
- EX. specialization of EMPLOYEE is `{SALARIED_EMPLOYEE, HOURLY_EMPLOYEE}`
***ผลลัพธ์เหมือนกับ superclass/subclass***

#### Constraint on Specialization and Generalization
---
- ถ้าเป็น subclass ที่มาด้วย condition เรียกว่า predicate-defined (or condition-defined)
- ถ้าเป้น subclass ที่แยกตามค่าของ attribute ใดๆ เรียกว่า attribute defined-specialization
- ถ้าไม่มี condition เลยแล้วไม่รู้ว่าต้องไปใส่ตรงไหน เรียกว่า user-defined
- Disjoint Constraint (d) --> entity เป็นสมาชิกของ subclass ได้อย่างมากแค่หนึ่ง subclass
- Overlap (o) --> entity เป็นสมาชิกได้หลาย subclass
- Completeness Constraint  --> total / partial เหมือนธรรมดา
- Insertion / Deletion rule  -->  ถ้าเกิดเรามีการลบอะไรก็ตามจาก superclass มันจะ implies ว่าไอ้ตรง subclass ถูกลบด้วยเสมอ , การ insert ใน superclass implies ว่า entity ใน predicate/atrribute-defined ถูกเพิ่มด้วยเสมอ
- Hierachy --> every subclass has 1 superclass
- Lattices --> ถ้า subclass can be subclass of more than one superclass
***ถ้ามี superclass/subclass เราจะเรียก diagram ว่า EER***

#### Union types
---
ถ้า entity ไม่มี common attribute เลยก็ union กันเลย เช่น OWNER มันมีได้หลายประเภท ทั้ง PERSON / BANK / COMPANY แต่พวกนี้มันไม่มี common attribute กันเลยจึงจับมันมา union กันให้หมด
