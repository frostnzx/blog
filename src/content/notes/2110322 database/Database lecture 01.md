Date: 2025-01-07
Tag: #2110322-database

### Database terminologies
---
Data - ไม่มีความหมาย
Information - มีความหมาย
Database - ชุดของข้อมูลที่อยู่ในคอมพิวเตอร์
Entity - สิ่งที่จับต้องได้เช่น student , course
Relationship - เกิดขึ้นได้เช่น student takes course
Database machine - hardware ไว้เก็บ
DBMS - software package ที่ออกแบบมาให้เก็บและจัดการ database เพราะ dbms ทำให้ user สามารถ maintain control access ได้อย่างสะดวก ใช้ feature ที่จำเป็นได้ เข่นการ control user access


### The Third Platform
---
ตอบโจทย์ความต้องการใช้ข้อมูลที่สูงขึ้นมาก ด้วยการนำเทคโนโลยีหลายๆอย่างมาผสมผสานกัน

### Characteristics of DBMS
---
- Less Redundancy - ลดความซ้ำซ้อนของข้อมูล เพราะเวลาที่เราออกแบบถ้าออกแบบได้อย่างถูกต้อง จะสามารถตั้งหลักที่สำคัญที่สุดคือข้อมูลต้องซ้ำซ้อนกันน้อยที่สุด 
- Data Security - รองรับ multi user support 
- Data Integrity - ความมั่นคงของข้อมูลเช่น มีบัญชีแล้วเราไม่อนุญาตให้คนถอนเงินเกินจำนวนที่มีในบัญชี database ก็จะปฏิเสธ transaction ที่ไม่อนุญาต
- Data Consistency - ถ้าเป็น data เดียวกันต้องเหมือนกัน
- Backup & Recovery - เก็บข้อมูลสำรองแล้ว สามารถ recover ได้อย่างอัตโนมัติ
- Query language support - สามารถเขียน query language ได้

### Acid 
---
- A Atomicity - "Transactions are all or nothing" เช่น ถ้าเราจะถอนเงิน ถ้าสำเร็จคือสำเร็จ แต่ถ้าถอนไม่เสร็จก็ย้อนกลับไปเหมือนไม่เคยทำมาก่อน
- C Consistency - "Only valid data is saved"  มี rule บางอย่างที่กำหนดไว้ใน database เช่น Do not allow account overdrawn -> Alice balance will never be less than zero , ถ้า Alice มีเงินที่ต่ำกว่าที่จะถอนก็จะไม่ถูก save ความสามารถในการเช็คเรียกว่า consistency
- I Isolation - "Transactions do not affect each other" คือ database จะจัดการเสมือนกับว่า transaction 2 transaction จะแยกกัน ทั้งๆที่ทำงานอยู่ในระบบเดียวกัน และ ถ้ามันทำงานแยกกันอยู่ก็สามารถทำพร้อมๆกันได้ , แต่ถ้าทำอันเดียวกันอยู่ก็จะทำงานแบบ sequence
- D Durability - "Written data will not be lost" คือเมื่อ data ถูก save แล้วจะไม่มีวันหาย
Acid เกิดขึ้นได้ด้วยการ implement ด้วยเทคนิค  ***Locks***  จะสามารถทำ A , C  , I
ส่วน D จะใช้ ***Write-ahead logs*** 

### Cap Theorem / Brewers' Theorem
---
- Consistency - When system returns info, it is always up-to-date ควรได้ข้อมูลที่เหมือนกันทั้งหมด ไม่ว่าจะทำงานจากตรงไหน
- Availability - ระบบใช้ได้ตลอดเวลา ถึงแม้ว่ามันอาจจะผิด เช่นถ้าระบบ down อยู่มันก็จะไม่ return info ล่าสุดแต่ return info ก่อนทีมันจะ down
- Partition Tolerance - อนุญาตให้ทำงานได้แม้กระทั่ง network failed 

เป็นไปไม่ได้ที่จะเกิด CAP พร้อมกันทั้ง 3 อย่าง จะเกิดได้อย่างมาก 2 อย่างพร้อมกันเสมอ
เช่น ถ้าเครื่องล่มแต่มันยอมให้ return ข้อมูลแต่ ไอ้ ข้อมูลที่ return มาก็จะไม่ up-to-date ซึ่งขัดกับหลัก consistency

ถ้า Network partition failure เราสามารถตัดสินใจได้ว่า
- ถ้า Network partition failed แล้ว Cancel operation เราก็จะเสีย Availability แต่จะได้ Consistency
- ถ้า Network partition failed แล้ว ก็ทำ operation ต่อได้ Availability แต่เสีย Consistency

### Relational Data Model
---
Edgar Codd สร้าง data representation framework เรัยกว่า Relational Data Model ใน 1970 , แล้วก็สร้าง SQL มาพร้อมกัน

**Database system environment**
Users/Programmers -> Application Programs/Queries -> Software to Process Queries/Programs -> Software to Access Stored Data -> Meta-data , Stored Database

**Level of Abstraction** 
Three Schema Architecture
1. Internal Level เป็น Physical schema ของข้อมูล เช่น index มันอยู่ตรงนี้ ความยาวเท่านี้ 
2. Conceptual Level เป็น Conceptual schema ของข้อมูล เช่น Entity students มี name เป็น string มี age เป็น integer ซึ่งเวลาเราเขียนโปรแกรมจะเขียนในตรงนี้
3. External Level เป็น view ที่แต่ละ user ดูได้ต่างกัน เช่น user บางประเภทไม่สารมารถดูเงินเดือนได้ เป็นต้น

**ER diagram (Entity Relationship)**
เอาไว้คุยกับลูกค้า
- สี่เหลี่ยมขนมเปียกปูน -> Relation
- สี่เหลี่ยม -> Entity
- วงกลม -> Attribute


### NoSQL = Not Only SQL or Non-SQL
---
NoSQL เป็น Non-relational database ที่เก่งในการเก็บข้อมูลที่ไม่ได้อยู่ในรูปแบบ relational หรือมีความสัมพันธ์กันชัดเจน

***เหมาะสำหรับ Big-data ที่ข้อมูลไม่ค่อยมีโครงสร้าง***

NoSQL เช่น MongoDB , couchDB , Cassandra , ...















