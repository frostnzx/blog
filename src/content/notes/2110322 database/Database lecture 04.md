
Date: 2025-01-23
Tag: #2110322-database 

## Schema Refinement and Normal Forms

#### Normal Form
---
- ทำให้ table efficient ที่สุด
- โดยการลดการซ้ำซ้อนของข้อมูล โดยการทำ Normalization

#### ขั้นตอนการออกแบบ Database
---
User Requirement --> ER diagram --> Relations (Table) --> Normal Forms

#### Evil Of Redundancy
---
- เป็นต้นตอของปัญหาต่างๆที่ทำให้ relational schema ไม่ได้ประสิทธิภาพ
	- ปัญหาในการ insert / delete / update
- ตรวจโดยการใช้ Functional Dependencies (FDs)
	- ซึ่งเป็น dependencies ชนิดนึงของ integrity constraint
	- วิธีการทำคือต้องไป identify schema ที่เกี่ยวข้องทั้งหมดว่ามีตัวไหนมีปัญหาบ้าง แล้วแก้ไขมันทั้งหมด
	- Process ของการ define นี้เรียกว่าการ ***Decomposition*** (การแตก table) เพื่อให้ซ้ำซ้อนน้อยที่สุด
	- แต่ถ้า decompose เยอะไปอาจจะมีปัญหาเกิดขึ้น
		- เช่น เมื่อเราต้องการใช้ข้อมูลทีมาจากมากกว่่า 1 table เราต้องกลับไป join กันเสมอ ซึ่งการ join กันเปลือง processing time และ เปลือง memory เพราะตอน join ต้องสร้าง temp table ขึ้นมา
	- FDs สามารถนำมาบอกความดีงามของการออกแบบของเราได้
	- FDs และ key ถูกใช้เพื่อ define normal form สำหรับแต่ละ relation
	- FDs ก็คือ constraints ที่จริงๆแล้วเรากำหนดขึ้นเองจากตอนที่เราเก็บข้อมูลมาว่าระบบนี้ต้องการทำอะไรบ้าง

#### แทรก -> Projection π
---
การเขียน  -->  π list of attributes seperated by comma (Relation)
ก็แค่คือการเลือกออกมาบาง column แต่ remove duplicate ออกถ้ามันเกิดขึ้นจากการเลือกมาบาง column

#### Functional Dependencies
---
- A functional dependency X -> Y อ่านว่า X determines Y ซึ่ง X กับ Y อาจะเป็น set of attribute
- X determines Y แปลว่าถ้าเรารู้ X เราจะรู้ Y หรือมองกลับกัน Y จะขึ้นอยู่กับ X (functionality depend on)
- X -> Y อยู่บน relation R แสดงถึงทุก instance r ใน R ที่ตรงตามเงื่อนไข
- FD คือ statement ที่เราเขียนเองว่าเราจะให้ข้อมูลทำอะไรกันได้บ้าง
- ถ้า K เป็น candidate key สำหรับ R แปลว่า K -> R

#### Reasoning about FDs
---
- สำหรับ FDs 
	- ถ้า ssn -> did , did -> lot ดังนั้น implies ว่า ssn -> lot
- ถ้า FD ที่ชื่อ f , และ F คือเซตของ f , F closure เกิดจากการเอา f ทั้งหมดมาและบวกด้วยกฎทั้งหลายว่ามันใช้ inference rule แล้วได้อะไรอีก
- F+ = closure of F
- กฎที่นำมารวมคือ Armstrong's Axioms
	- Reflexivity : Y is subset of X , then X -> Y
	- Augmentation : X -> Y , then XZ -> YZ for any Z
	- Transitivity : X -> Y and Y -> Z , then X -> Z
- เช่นถ้าให้ f มา 2 ตัวคือ , f1 : ssn -> did และ f2 : did -> lot
	- ดังนั้น F ที่เกิดขึ้นคือ {ssn->did} หรือ {did->lot} หรือ {ssn->did , did->lot}
	- แต่เนื่องจากเราต้องการให้ F+ มี FD ครบๆ เราจึงควรใช้ F เป็น {ssn->did , did->lot}
	- F+ จะสร้างต่อจาก F ที่มี FD ครบ และนำไป infer ตาม inference rules ต่างๆ
	- ดังนั้นได้ F+ เป็น {ssn->did , did-> lot , ssn -> lot , ....}
- Additional rules
	- Union : X -> Y and X -> Z , then X -> YZ
	- Decomposition : X -> YZ , then X -> Y and X -> Z
- Ex. Contracts(cid,sid,jid,did,pid,qty,value) and C is the key : C -> CSJDPQV
	- Project purchases each part using single contract : JP -> C
	- Dept purchases at most one part from a supplier : SD -> P
	- เราจะได้ JP -> C , C -> CSJDPQV implies ว่า JP -> CSJDPQV
	- และได้ SD -> P implies SDJ -> JP
	- SDJ -> JP , JP -> CSJDPQV implies SDJ -> CSJDPQV
- ตามตัวอย่างถ้าเราอยากจะคำนวณหา F+ มันจะเยอะมาก 
- ดังนั้นปกติเราจะแค่เช็คว่า FD X->Y ใดๆ อยู่ใน F+ รึป่าว
	- มีวิธีคิดง่ายๆคือหา Attribute closure X+ (X closure) คือ set ของ attributes ซึ่ง X -> A อยู๋ใน F+
	- เช่น ถามว่า F = {A->B,B->C,CD->E} imply A->E หรือไม่
		- เช่น A -> E อยู่ใน F+ ไหม สามารถมองได้อีกแบบคือ E อยู่ใน A+ ไหม?
		- ดังนั้นแค่หา closure ของ A (A+)
		- A+ = {A,B,C} ดังนั้น A -> E ไม่ได้ ที่ไม่มี E ใน A เพราะเราไม่มี CD เพื่อนำไป implies E

#### How to use FDs to determine keys
---
- attribute เป็น PRIME ถ้ามันเป็นส่วนนึงของ candidate key ใดๆ
- attribute เป็น NON-PRIME ถ้ามันไม่เป็นส่วนนึงของ candidate key ไหนเลย
- เช่น จาก R(a,b,c) มี F = {a->b,b->c}
	- สร้าง L , R , M 
	- L : attribute ที่ปรากฎด้านซ้ายเท่านั้น
		- L : {a}
	- R : attribute ที่ปรากฎด้านขวาเท่านั้น
		- R : {c}
	- M : attribute ที่ปรากฎทั้งสองฝั่ง
		- M : {b}
- ฝั่ง L must be part of the key
- ฝั่ง R never be part of any key
- ฝั่ง M may or may not be part of the key
- ดังนั้น Keys : a
- Prime attribute : a
- Non-prime attribute : b,c


#### Normalization
---
- การ decompose bad relation
- Normal Form 
	- 2NF
	- 3NF
	- BCNF

#### Properties Of Decomposition
---
- Lossless-Join Decomposition
	- Made sure ว่า instance ที่อยู่ใน original relation สามารถที่จะคงอยู่ไม่หายไปและไม่เพิ่มขึ้นมา
- Dependency-Preserving Decomposition
	- แยกตารางแล้ว FD อยู่ครบเหมือนเดิม


#### First normal form (1NF)
---
- Disallow
	- Composite attribute
	- multivalued attribute
	- nested relation
	- non atomic value
- ถ้าเป็น composite -> เอาเฉพาะรูปมัน
- ถ้าเป็น multi-valued -> ต้อง allow ให้มันเป็น key ด้วย
- ถ้าเป็น nested -> แยกตาราง

#### Second normal form (2NF)
---
- ทุกๆ non-prime attribute A ใน R ต้อง fully functionally dependent กับ candidate key
- ถ้ามี non-prime บางตัวไม่ fd กับ candidate key ทั้งอันหรือแค่ fd กับแค่ partial key ก็แยกออกมาเป็น table ใหม่อีกอัน
- สังเกตว่าถ้า primary key มีตัวเดียวยังไงมันก็ผ่าน 2NF เสมอ

#### Third normal form (3NF)
---
- ทุกๆ attribute ต้องถูก determine โดย primary/composite key และไม่ใช่อย่างอื่น
- สำหรับ FD X -> A
	  ถ้าจะเป็น 3NF ต้อง
	  1. X เป็น superkey
	  2. A เป็น prime attribute

#### Boyce-codd normal form (BCNF)
---
- prime attribute ห้าม dependent on non-prime
- สำหรับ FD X -> A
	- ถ้าจะเป็น BCNF ต้อง
	1. X เป็น superkey


