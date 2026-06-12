---
title: "SE lab lecture 11"
date: "2025-04-30"
published: true
kind: "note"
course: "2110426 SeLab"
tags:
  - "2110426-selab"
---

#### Software project management
---
Keyterm
- Project -> temporary endeavor ความพยายามที่ยาก ใช้ความพยายามมาก ใส่ความพยายามเข้าไปเพื่อสร้าง unique product , service , ... , และมันเป็นความพยายามชั่วคราว (มีวันกำเนิดมีวันจบ)
	- ผลลัพธ์คือสามารถให้บริการลูกค้าได้ บลาๆ
	- Project != Operation , Project ชั่วคราว , Operation เป็นกิจวัตร
- Project management -> การประยุกต์ความรู้เทคนิคต่างๆ ที่เกี่ยวข้องกับโปรเจคมาใช้ทำกับโปรเจคเพื่อให้ โปรเจคดำเนินไปได้ ด้วยการ apply พวกนี้
- Project manager -> ผจก กำกับดูแลทีมพัฒนา เป็นคน operate ทั้งโปรเจคให้ดำเนินต่อไป
- Project team -> มีหลายคน หลาย role คล้ายใน Scrum มี product owner , scrum master , design team , tester , dev , ... บลๆๆๆๆๆๆ
- Project sponsor -> เป็นผู้สนับสนุนโครงการเรา ปกติจะเป็นคนที่ initiate โปรเจคขึ้นมา ปกติจะเป็นค่าที่มีอำนาจทาง management , เป็นคนที่อยากให้สำเร็จ ช่วยหนับหนุน
- Project stakeholder -> คนที่มีส่วนได้ส่วนเสียกับโปรเจค , อาจจะคิดไปเองก็ได้ คนทำโปรเจคก็ต้องคอยเอาใจคนพวกนี้ , เช่น Project sponsor , Project manager , Project team , Bank , Customer (คนที่ต้องการ software) , End user (ผู้ใช้ software) ต้องรับฟังพวกนี้ทั้งหมด

#### Project Life Cycle
---
Starting the project -> Organizing and preparing -> Carrying out the work (SCRUM) (ทำงานจริง) -> Finishing the project (งานปิดท้ายก่อนจบ)
- มี deliverable 
	- Artifact / work product -> ชิ้นงานที่ผลิตออกมาระหว่างทำ project นี้ , เช่น software , source code , documentation , user manual , training material , specs , ... 
	- ก็ไม่ได้ขอดูพวก sprint backlog อะไรพวกนั้น
	- จะมีการกำหนดอยู่แล้วว่าต้องส่งอะไรบ้าง

#### Process group กลุ่มของกระบวนการ
---
- Initiating -> process การเริ่มต้น project
- Planning -> กิจกรรมการ plan
- Executing -> กระบวนการผลิต
- Monitoring & control -> ระหว่างการทำงานต้นจนจบต้องมีการ monitor, ต้องไปควบคุมบังคับการทำงาน งานที่เกี่บวกับ monitor & control จะเกิดจาก manager
- Closing -> การปิด project
สังเกตว่าจะคล้ายๆกับ Project Life cycle , แต่มันมองเป็น process ที่ต้องทำไม่ใช่ช่วงเวลา (life cycle) , มันก็คือกลุ่มของกระบวนการ ดังนั้นเราสามารถทาบเข้าไปใน life cycle ได้

#### Project Management Knowledge Areas
---
มี 10 Knowledge areas
- Scope management
- Schedule management
- Cost management
- Quality management
- Resource management
- Communication management
- Risk management
- Procurement management -> การจัดซื้อจัดจ้าง
- Stakeholder management -> ทำให้มัน happy
- Integration management -> การ manage การบูรณาการโดยรวมทุกอย่าง ถ้ามี change ต้องทำยังไงบ้างไรงี้

#### Project Quadruple Constraints
---
- Scope -> software ต้องทำยังงั้นยังงี้ได้คือขอบเขต
- Time -> มีเวลาจำกัด
- Cost -> funding ที่ให้
- Quality -> สิ่งที่ customer คาดหวัง
ปัญหาคือ constraint เหล่านี้มักแข่งขันกัน ได้อย่างเสียอย่างไรงี้

#### Project Initiation
---
- การเริ่มต้น project , 
- Project sponsor จะ indentified software project ให้มันตอบ business need และหาว่ามันให้ business value แค่ไหน -> System request
- Project sponsor and other เรียนรู้ feasibilities (ความเป็นไปได้) ของโปรเจคเพื่อรอ approval -> Result of feasibility analysis

#### Feasibility Analysis
---
- Techincal feasibility -> ดูความเหมาะสมเชิงเทคนิค
- Economic feasibility -> คิด development cost , cost นู๋น cost นี่ แล้วคิดว่า return on investment (ROI) แล้วค่อยหา break-even point (จุดคุ้มทุน) เมื่อไหร่
- Organizational feasibility -> โปรเจคนี้เหมาะกับ goal และ strategy กับองค์กรไหม

Positive impact on society or globally can influence Feasibility analysis
- Society-driving software -> ส่งผลในวงกว้าง ส่งเสริมการดำรงอยู่ของ society
- Increase of speed and productivity
- Benefit to economy and environment
- Increase of quality of life

Negative impact also can influence Feasibility analysis
- Unemployment
- Poor customer service
- Alienation -> inequality จากคนบางคนเข้าไม่ถึง software
- Crime and violation

#### Project planning steps
---
- Defining scope of work -> Work Breakdown Structure (WBS)
- Estimating cost project size and effort -> Result of cost and effort estimation budget
- Creating schedule -> Schedule (Gantt chart)
- Staffing the team -> Team structure
- Manage risk -> Risk register

Scope of work
- Depends on 
	- Software requirement
	- Development method (Scrum , waterfall , ...)
	- Project management activities
- Work Breakdown Structure (WBS) -> lisk of task hierrachy

#### Project Estimation
---
- Size Estimation 
	- Analogous Estimation -> จาก Line of code (LOC) ,
	- Parametric Estimation -> Function size (Function point) ขนาดใหญ่/เล็ก ของฟังก์ชั่น
- Effort Estimation 
	- Analogous Estimation -> (in person-month)   
	- Parametric Estimation -> COCOMO II
- Analogous Estimation = ใช้โปรเจคที่คล้ายกันในอดีตกลับมาประมาณ ใช้กึ๋น
- Parametric Estimation = ประมาณแบบ scientific มีคนคิดสมการมาให้แล้วเอามาแทน

Example Problem-based project estimation
- Estimated LOC (line of code) -> 33200
- Average productivity (จากอดีต) -> สำหรับระบบแบบนี้ 620 LOC/pm (620 line of code per person-month) , (person month คือ ถ้าใช้คนคนนึงทำ full time ภายใต้ 1 เดือนจะได้เนื้องานแค่ไหน)
- Average labor rate -> $8000 per month (เงินเดือนคน)
- Cost per line of code = $8000 per month / 620 LOC per pm = 12.9 ~ 13
- Estimated effort = 33200 LOC / 620 LOC per pm = 53.5 ~ 54 pm เพื่อที่จะทำโปรเจคนี้
- Estimated labor cost = 33200 LOC * 13(per line of code) = $431000

Example Estimation for Agile Development
- Estimated total story point -> 200 story point
- Team velocitty = 50 story point per increment (or sprint for Scrum)
- No. of increments required for the project = 200 story points / 50 story points = 4 increment (4 sprint)
- Increment length is 2 weeks -> 2 increment per month
- Estimated duration = 4 increments / 2 increments per month -> 2 month
- No. of agile team member -> 5 members
- Avg Labor rate per person -> 8000 per month
- Estimated labor cost -> 5 members * $8000 per month * 2 month -> $80000

#### Function Point Analysis (FPA)
---
- Function points (FP) -> ประมาณโดยอิสระจาก implementation ไม่ต้องสนใจรายละเอียดการพัฒนา sw และ มันเอาไว้วัดความใหญ่ของ function
	- estimate ได้ก่อนเริ่ม code ซะอีก
	- estimate LOC และ project effort
- Five Basic Functions of FPA
	- Transaction
		- EI -> External input -> ระบบมีฟังก์ชั้นลักษณะที่ระบบมีการรับ input จาก function ภายนอกเข้าไป update ข้อมูลข้างใน , ข้างนอก (User หรือ External System)
		- EO -> External output -> ระบบของคุณมีการผลิต output ออกสู่ภายนอก , ผลิตออกไปให้มนุษย์หรือระบบข้างนอกเห็น , เช่น customer input ข้อมูลเข้ามา(EI) แล้วระบบอาจมีการ display report (EO)
		- EQ -> External Inquiry -> ต่างจาก EO นิดนึงตรงที่ EO ต้องมีการประมวนผลข้อมูลข้างในออกมาแล้วส่ง output ที่เป็นผลจากการประมวลผล , แต่ EQ มันแค่ไป query ออกมาเฉยๆ
	- Data
		- ILF -> Internal Logical Files -> ข้อมูลที่ระบบเราเป็นคนเก็บดูแล ถูก maintain โดย input เข้า สรุปคือข้อมูลของเรา
		- ELF -> External Logical Files ->  ข้อมูลของชาวบ้าน (ของ External System)
- รู้ไซส์ของไอ้ 5 อย่างนี้ได้ยังไง ?
	- Data Element Type (DET) -> ดูที่ประเภท , user รู้ว่าอันนี้เป็นหนึ่ง item , ไม่นับซ้ำ , เป็น dynamic field , สามารถ invoke transaction ได้ , เปลี่ยน state ของ app ได้
	- File Type Reference (FTR) -> เช่นใส่ EI จะดูว่ามันเกี่ยวกับ ILF หรือ EIF กี่ตัว
	- Record  Element Type (RET) -> วัดไซส์ของ ILF หรือ EIF , เป็นการนับ subgroup
- EI Size -> นับ DET , FTR
- EO and EQ Size -> นับ FTR , DET
- ILF และ EIF -> นับ RET , DET
- เอาไอ้พวกที่นับมาเข้าไปเทียบกับตารางแล้วจดไว้ทุกตัว
- หลังจากนั้นคิดพวก VAF แล้วเอามาคูนกับ FPดิบ หลังจากนั้นจะได้ Adjusted FP
- FP เป็น KLOC , KLOClang = (FP & gearing_factorlang)/100
- เอามาใส่ COCOMO II 
- Post architecture model -> PM -> The amount of effort in person-months
	- Person-hours : multiply by 152
	- Person-days : multiply by 19 (เผื่อวันหยุกวันลาเลยไม่ 20)
	- Person-years: divide by 12
- 5 Scale Factors
	- Precedentedness (PREC) -> เคยทำงานลักษณะนี้มาก่อนไหม
	- Development Flexibility (FLEX) -> sw ที่ dev flex แค่ไหน มี requirement มาจำกัดแค่ไหน กำหนดการณ์ยืดหยุ่นแค่ไหน 
	- Architecture / Risk Resolution (RESL) -> มีการจัดการความเสี่ยงแค่ไหน
	- Team Cohesion (TEAM) -> ทีมที่ทำ sw เข้ากันได้ไหม
	- Process Maturity (PMAT) -> วุฒิภาวะของทีม ระเบียบแบบแผนแค่ไหน

#### Project Planning Creating Schedule (TIME)
---
- WBS Activities
	- เอามาแตกเป็น acty ย่อยๆ 
	- ควรใช้ verb สะท้อน acty

#### Project Planning Staffing team
---
- Organizational structure and project team
	- Functional -> แบ่งเป็นฝ่ายต่างๆ Engineering , Manufacturing , IT , HR , ...
	- Project -> Program Manager A , B , C
	- Matrix -> รวม 2 อันบน
- Team size -> Intuitively -> number of people = person-months / time to complete (in month)
#### Project Risk
---
- Risk -> uncertainty อาจจะดีหรือไม่ดี
- Negative risk -> ทำงานช้ากว่ากำหนด
- Positive risk -> ทำงานเร็วกว่ากำหนด
- Risk indentification -> Risk analysis -> Risk responses -> Risk monitoring
