---
title: "Database lecture 05"
date: "2025-01-23"
published: true
kind: "note"
course: "2110322 database"
tags:
  - "2110322-database"
---

## Relational Algebra 

- Relational algebra ใช้ concept ของ set theory แล้วเพิ่ม constraint
- เป็น theoritical foundation ของ relational data model

#### Query language
---
- manipulate และ retrieve data จาก database
- เวอร์ชั้นแรกๆ ยังไม่เท่ากับ programming language เพราะไม่มี turing complete เพราะไม่ได้ต้องการจะใช้สำหรับ complex calculation แต่ว่าในปัจจุบันสามารถทำได้แล้ว

#### Formal relational query language
---
- มี 2 mathematical query language สร้างพื้นฐานสำหรับ real language (e..g. SQL) และเพื่อ implementation
- Relational Algebra
	- Operational (procedural) ทำงานเป็นขั้นเป็นตอน
- Relational calculus
	- Declarative (non-procedural) ให้ user กำหนดสิ่งที่อยากได้ ไม่ใช่วิธีจะได้สิ่งนั้นมา
#### Example instances
---
Student_name | Student_id
ลิซ่า                       6130000121
เจนนี่                     6130000221
วี                          6130000321
โรเซ่                     6130000421
\-----------------------------
Instance จะเฉพาะสำหรับหนึ่งช่วงเวลาเท่านั้น

#### Important note on notation
---
r - s    -> relational algebra operator
R - S   -> operator on schemas

#### Dot notation
---
ถ้ามีหลายๆ table ที่มี attribute ชื่อซ้ำกันใช้ dot notation 
- ENG_STUDENT.student_id

#### Relational algebra operation
---
- Unary or binary
- เมื่อนำ table 1 (Unary) หรือ 2 (Binary) มา operate บางอย่างคำตอบที่ได้มาจะเป็น relation instance
- operation สามารถนำมา compose (รวมๆกันได้)

#### Relational algebra operators
----
- Basic operators
	- Selection σ
		- เลือก row จาก relation
	- Projection Π
		- เลือก column จาก relation
	- Cross-product x
		- รวม 2 table
	- Set-difference -
		- ลบ tuple ใน relation 1 ที่ไม่อยู่ใน relation 2
	- Union U
		- รวม tuple จาก 2 table ที่มัน compatible กัน (column เท่ากัน และ type เดียวกัน)
- Additional operators เกิดจาก basic operator ต่อกันหลายๆ step
	- Join ⋈
	- Intersection ∩
	- Division / 
	- Renaming ρ
