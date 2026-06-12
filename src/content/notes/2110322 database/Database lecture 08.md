---
title: "Database lecture 08"
date: "2025-02-10"
published: true
kind: "note"
course: "2110322 database"
tags:
  - "2110322-database"
---

## Storage And Indexing

#### External storage
---
- Hard disk / Magnetic disk / ....
- เวลาเรา access disk เราไม่สามารถ access 1 word / 1 sentence ไรแบบนี้ไม่ได้ เราต้อง access page และขึ้นอยู่กับว่าเรา define page ให้ size เท่าไหร่
- Cost คือค่าของการอ่าน page จาก disk หรือเขียนลง disk เป็น I/O cost
- Database operations ใช้ page I/Os
- Goal -> Minimize Page I/Os
- Disks
	- Random access devices -> เราสามารถกระโดดไปยังที่ต่างๆได้อย่างรวดเร็ว (skip forward backward)
- Tapes
	- Sequential access devices

#### Files and access methods layer
---
- Relation stored
	- เป็น file ของ record
	- ทุกๆ record มี record id (rid) เพื่อไว้อ้างอิงถึง record
		- ซึ่ง record จะอยู่ใน page และ page จะอ้างอิงโดย page number
	- การ implement จริงๆ เรียนตอนเรียน OS
- Files and access methods layer
	- Operations -> creation , insertion , deletion , scan ,...
	- track ได้ว่า page ไหนมีที่ว่างเหลืออะไรบ้าง
#### File Organization
---
- Unsorted -> อะไรเข้ามาก็ยัดเข้าไปเลย
- Sorted -> เมื่อมี record ใหม่เข้ามาก็หาที่เหมาะๆให้มันเข้าไปอยู่
#### Alternative File Organization
---
- Heap -> random order ไม่สนอันดับอะไร เหมาะสำหรับเวลาไม่ต้องการหาแต่ละอัน แต่ dump ทั้งหมด
- Sorted file -> หาของได้เร็วขึ้นแต่ update / insert มี overhead เพราะต้องคอยไปหาที่เหมาะๆ
- Indexes / Indices -> จัดเรียงด้วย tree หรือ hashes , search เร็วขึ้นด้วย search key , update เร็วกว่า sorted file มากๆ

#### Indexes / Indices
---
- มีไว้ speed up search process อย่างเดียว
- index บนไฟล์ใดๆ
	- Search key -> attribute เดียว หรือหลายๆอันก็ได้
	- ***Search key != Key***

#### Index file
---
- Data entries (index entries) -> เก็บ reference ของ record location ใน database ใน data entries ก๋็มี search key และ record pointer
	- Search key -> set of attribute
	- pointer -> ชี้ไปที่ data record นั้นๆ (ส่วนใหญ่จะชี้ Record ID (pagenumber , slotnumber))
- Index file จะเล็กกว่าไฟล์ original มากๆ
- มี basic indices 2 แบบ
	1. Ordered indices : search key เก็บโดยเรียง sort แล้ว (i.e., tree based)
	2. Hash indices : search key ถูกเก็บแบบกระจายด้วย hash function

#### Indices speedup
---
- Search key สามารถดูแล record หลายตัวได้
- Index เล็กกว่า record มากๆ

#### Alternative For Data Entries
---
###### Alternative 1
- data entries เป็็น data record จริงๆ โดยใช้ search key เป็น k ,ก็คือเอา data record จริงๆมาทำ sort บาง attribute 
- ดังนั้นจะมีเพียง index เดียวเท่านั้นที่สามารถใช้วิธีนี้ได้
- เรียกว่า indexed file organization
###### Alternative 2
- a data entry is a &lt;k , rid&gt; pair
- แค่ search key ชี้ไปที่ record id ตรงๆเลย
###### Alternative 3
- a data entry is &lt;k,rid-list&gt; 
- เก็บเป็น list ของ rid ของ record ที่มี search key value k

#### Index classification
---
มองได้ 2 แบบ
1. Primary vs Secondary
	- ถ้าเป็น search key เป็น primary key เราก็เรียกว่า primary index
	- ถ้าไม่, เรียกว่า secondary index
2. Clustered vs Unclustered
	- ถ้า data entries มันใกล้เคียง/เหมือน กับ data record จริงๆ ก็เป็น clustered index
	- ดังนั้น Alternative 1 จึงเป็น clustered index
	- มี clustered index ได้อย่างมากแค่ 1 อันเท่านั้น
	- clustered index จะเร็วกว่า unclustered มาก

#### Primary vs Secondary Indices
---
- Secondary indices ต้องเป็น dense แปลว่าทุกๆ Search key ต้องมี data entry สำหรับทุก record แต่ถ้ามันเป็น primary index ไม่จำเป็นต้องมีสำหรับทุก record ก็ได้ , บาง record อาจจะข้ามๆไปเพราะรู้กัน เช่น StudentID 1001 -> Page No. 5 , StudentID 1004 -> Page No.6 ส่วน 1002,1003 ก็อยู่ใน Page No.5 เพราะ index มัน sort กันและ page number มันก็เรียงเหมือนกันนั่นเอง
- Sequential scan ด้วย primary index จะทำได้เร็ว แต่ถ้าใช้ secondary index จะแย่มาก

*** ปกติ primary key มันจะเรียงอยู่แล้วในตารางจริงๆ ***


#### Clustered vs Unclustered Index
---
- ถ้ามัน Clustered, data entries มันจะจัดเรียงไปตาม data record จริงๆทำให้มันไม่ชี้กลับไปกลับมา
- ถ้ามัน Unclustered , ถึง data entries มันจะเรียง (มันต้องเรียง) มันก็มีโอกาสที่จะชี้กลับไปกลับมาไขว้กัน เช่น สารบัญ บทที่ 1 ชี้ไปหน้า 100 , สารบัญบทที่ 2 ชี้ไปหน้า 20 เป็นต้น

#### Dense Index Files vs Sparse Index Files
---
- Dense Index Files -> มี data entry สำหรับทุกๆ unique Search key แปลว่าถึงจะข้าม Search key ที่มันอันเหมือนกันที่มันอยู่ติดกันไปไม่ต้องมี data entry ให้ทุกตัวก็ได้ มันก็ยัง dense อยู่
- Sparse Index Files -> ไม่มี data entry สำหรับทุกๆ unique Search key ข้ามบางตัวที่ไม่เหมือนกันได้ เพราะมันเรียงกัน แปลว่าถ้าจะเป็น sparse ก็ต้องเป็น primary index หรือ clustered index

#### Index file data structure
---
- To organize data entries in an index file
1. HASH INDEX
2. B+ TREE INDEX

#### HASH-BASED INDEXES
---
- เลือก search key 
- ของอันไหนอยู่ใน bucket ไหนใช้ hash funtion , เราจะใส่ search key เข้า hash function แล้วมันก็จะพ่น bucket number ออกมา
- ดีสำหรับ equality selection ไม่เหมาะสำหรับ range search ไรงี้
- ถ้าเป็น alternative 1, bucket จะใส่ data record เข้าไปเลยไม่ได้ใส่แค่ key กับ rid ถ้าเป็นอันอื่นก็ใส่ตามปกติ
#### B+ TREE INDEXES
---
- Non-leaf pages -> index entries; ใ้ช้กำหนดทิศทางการ search ลงไปเรื่อยๆ
- Leaf pages -> data entries , มีการชี้ไป leaf ข้างๆ


#### Cost model for our analysis
---
