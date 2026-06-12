---
title: "SE lab lecture 08"
date: "2025-04-20"
published: true
kind: "note"
course: "2110426 SeLab"
tags:
  - "2110426-selab"
---

### User Interface Design

- ส่วนต่อประสานระหว่างระบบ 2 ระบบ หรือ user กับ ระบบ
- Interface design
	- System interface -> machine - machine (part of system integration)
	- User interface -> human - machine (focus)

#### Principle of User Interface (LCA UCM)
---
- Layout -> การจัดวาง การจัดแบ่งหน้าจอ แบ่งสัดส่วน
- Content Awareness -> ผุ้ใช้รู้ไหมว่าตัวเองอยู่ตรงไหน แล้วกำลังดูอะไรอยู่
- Aesthetics -> ความสวยงาม
- User Experience -> ใช้ง่ายใช้ดี
- Consistency -> user predict ได้ว่าคืออะไร
- Minimal User Effort -> พยายามทำให้ทุกอย่างเสร็จใน 3 click

##### Layout 
- Screen , forms , report
- จัดเป็นส่วนๆ เรียก area
	- แต่ละส่วนไม่ไปยุ่งกับส่วนอื่น
	- area ตอง intuitive flow (common sense)
		- ต้องดูด้วยว่า user เป็นใคร (usa -> ซ้ายไปขวา) (jpn -> ขวาไปซ้าย)
##### Content awareness
- รู้ได้จาก Menu -> บอกว่าเข้าไปลึกกี่ชั้นแล้ว
- ข้อมูล label , title ของหน้าจอ
- Form and report ต้องมีบอกวันที่ , version

##### Aesthetics
- น้อย เรียบ เข้าใจง่าย
- ข้อมูลที่ใส่เช้ามา อย่าอัดแน่นมาก ถ้าเป็นผู้ใช่ใหม่ อย่าเกิน 50% ของจอ
- font อ่านง่าย , ขนาดตามอายุ  . capital letter (ตะโกนใส่หน้า)
- เลือก theme สี

##### User Experience 
- Ease of learning
- Ease of use -> เป็นผู้ใช้ที่เก่ง ก็อยากใช้ให้ไวๆ
- ไปคู่กัน , complementary -> design คล้ายกัน , conflict -> designer ต้องเลือกว่าจะ satisfy มือใหม่หรือมือโปร

##### Consistency
- เป็นไปในแนวทางเดียวกัน
- user เรียนรู้ส่วนนึงแล้วนำไปปรับใช้กับส่วนอื่นได้
- Key areas
	- Navigation controls
	- Terminology -> คำที่ใช้ป

##### Minimal User Effort
- ช่วยให้ user ใช้งานง่ายๆ
- three click rule

#### User interface design process
- Use case driven , incremental , iterative process

Use scenario development -> interface structure design -> interface standards design -> interface design prototyping -> interface evaluation -> ย้อนกลับไปอันแรก (มันเป็นวงกลม)

use case driven -> user ใช้งานอย่างไร
1. Use scenario developement -> ดูว่าเขาใช้งานยังไง อย่างละเอียด
2. Interface structure design -> ออกแบบโครงสร้าง (มีกี่นหน้าจอ แต่ละหน้าเป็นอย่างไร)
3. Interface standards design -> set standard ให้ทุกหน้าจอ
4. Interface design prototyping -> มีแต่หน้าใช้จริงไม่ได้
5. Interface evaluation -> ให้ลูกค้าดูแล้วแก้ แล้วทำใหม่อีกรอบ
วน...

##### Navigation structure design
- ร่างว่าแต่ละหน้ามีปุ่มอะไรบ้างกดแล้วไปไหน
- ใช้ WND (Window navigation diagrams)
##### Interface standard design
- basic design element 
- interface metaphor
- interface objects
- interface actions
- interface icons
- interface templates

##### Interface Design Prototyping
- Storyboard -> วาดมือ
- Window layout diagram -> ใช้คอมทำ storyboard
- HTML prototype -> ทำหน้าเว็ปง่ายๆเร็วๆ
- Language prototype

##### Interface evaluation
- Heuristic -> เทียบ design กับพวก known principle (ทำโดย experienced ui designer)
- Walkthrough -> เอาไปให้ user ดู แต่ user interface อยู่ในมือเรา
- Interactive -> เอาไปใส่มือ user ให้ลองเล่น แต่เราคอย guide เขา
- Formal usability testing -> เอาให้ user ลองเล่น แต่ไม่ช่วย

##### Common sense
- ไม่ต้องคิดเยอะ
- อย่าให้ทำงานเยอะ
- อย่าใส่ text เยอะ

##### Navigation design
- พูดคุยกับ user ทำให้เห็นชัดว่าจะไปอีกหน้ายังไง
- ทำให้ง่ายๆ กัน user ทำผิด
- Navigation controls
	- Hardware
	- Software
		- Language -> command language (sql , ..) , natural language (google search)
		- Menus -> menu bars , popups , drop downs
		- Direct manipulation -> drag and drop , resize
		- voice recognition
- Message
	- Error -> ต้องมี 2 คำบอก , 1.user ทำไรผิด , 2.user จะแก้ได้อย่างไร
	- Confirmation -> Are u sure ?
	- Acknowledgement -> Order entered ! 
	- Delay -> บาง process ใช้เวลานาน (หมุนติ้ววววววว)
	- Help -> ช่วย user
- Navigation design documentation
	- Use WNDs and real use-cases

##### Input design
- user จะใส่ input มาให้เราได้อย่างไร
- ประเภทข้อมูล
	- Structured -> Dates , names , products , etc.
	- Unstructured -> Comments , descriptions
- Basic principles -> simplify collection ของ accurate information
	- Online กรอกปุ๊บส่งมเลย vs batch กรอกปุ๊ปเดี๋ยวระบบค่อยบอก processing
	- รับข้อมูลยังไง
		- Manual data entry
		- Source data automation (readers) : magnetic stripe , barcode , QR code , RFID , smart card , ...
	- Minimize keystrokes (พยายามลด) เช่นบางอันเรารู้อยู่แล้วก็ไม่จำเป็นต้องให้ user มากรอก
- Types of inputs
	- Free form controls
		- Text boxes
		- Number boxes
		- Password boxes
	- Selection boxes
		- Check boxes
		- Radio buttons
		- List boxes
		- Sliders
- Input validation
	- Completeness
	- Format
	- Range
	- Check sum digit
	- Consistency -> เช่นวันเกิด กับ อายุ
	- Database check -> ดูว่ามัน violate entity ไหม หรือ ref integrity

##### Output design
- การแสดงมี 2 แบบ 
	- Electronic -> หน้าจอพอไหม บลาๆ
	- Hard copy -> a4 พอไหม บลาๆ
- Understand report usage -> detail vs summary vs realtime vs batch
- ใส่เฉพาะที่จำเป็น
- Minimize bias
- Report
	- Detail report
	- Summary report
	- Turnaround document -> output ที่กลับมาเป็น input ได้ด้วย (บิลค่าน้ำค่าไฟ)
	- Graphs -> เข้าใจเลขได้ง่ายขึ้น

#### NFRs Influence on HCI
---
มีผลต่อการออกแบบ UI
- Operational requirement -> ui เราต้องไปติดตั้งใน hardware หรือ software platform ไหน
- Performance requirement -> แล้วแต่ระบบต้องการให้เร็วแค่ไหนยังไง
- Security requirement -> ui ต้องดูแล security มี login , logout 
- Political & Cultural -> MM/DD/YY , DD/MM/YY , colors , currency , ...
