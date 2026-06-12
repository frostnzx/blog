---
title: "SE lab lecture 03"
date: "2025-04-02"
published: true
kind: "note"
course: "2110426 SeLab"
tags:
  - "2110426-selab"
---

#### Waterfall Development
---
Planning -> Analysis -> Design -> Implementation -> System
Planning -> เราต้องการได้ความต้องการ high level หยาบๆ
System Requirement Analysis -> วิเคราห์เชิงลึกโดยใช้ strategy ต่างๆ จะได้ Software / System requirement specification (ข้อกำหนดความต้องการของระบบ)
Design -> ออกแบบ data model พวก figma หรือออกแบบ algorithm อะไรต่างๆ หรือ system architecture
Implementation -> implement งานออกมาจริงๆ

#### Phased Development
---
Based on incremental approach -> ทำเพิ่มขึ้นเรื่อยๆ ได้ผลตอบแทน เพราะเรารัน business ได้
SDLC : Planning -> Analysis -> Design -> Implementation

Requirement 3 ส่วน 
	1. stake holder requirement
	2. system requirement
	3. software requirement

#### SDLC: Analysis Phase
---
Question to be answer
- What should the system do for us ? 
- When and where will it be used ?

##### Steps and deliverables 
1. Develop an analysis strategy
	- จะมีวิธีการยังไงในการวิเคราห์ระบบ ***ปัจจุบัน*** เพื่อที่เราจะเข้าใจ as-is system
	- identify ปัญหาคืออะไร และโอกาสในการแก้ไข หรือปรับปรุง เพื่อทำให้ระบบน่าสนใจ
	- Formulate ระบบใหม่ to-be system
2. Gather software and system requirement
	- คุยกับ user และ stakeholder ว่าจะเอายังไงกันแน่
	- สร้าง system concept และ analysis model (uml) - ธุรกิจจะดำเนินไปยังไงถ้าระบบใหม่ถูกพัฒนา
4. Develop a system proposal from 1&2 for approval
	- สร้าง document เพื่อที่จะนำไป propose กับผู้มีอำนาจ
	- ถ้าเราจะสร้างของขึ้นมาหนึ่งชิ้นจะต้องคิดว่าจะเป็นไปได้ทาง economic และความต้องการของ user และ องค์กร และ technology support ด้วย
	- ต้องใส่ business requirement , analysis model , activity plan , constraint ลงไปด้วย

- System development process เปลี่ยนจาก as-is system เป็น to-be system สำรวจว่ามี gap ระหว่าง as-is กับ to-be มากแค่ไหน 
- Analysis จะ refine จาก แนวความคิดคร่าวๆจาก system request สู่ detailed requirements definition และ analysis model (functional model / structural model / behavioral model) 

##### Requirement determination
- requirement determination เป็น ขั้นตอนที่สำคัญ เพราะถ้าเราไม่ได้ requirement ที่ครบถ้วนถูกต้อง หรือ requirement มีโอกาสที่จะ change เยอะ จะส่งผลต่อ success ของ project 
- เป้าหมายคือต้องการ convert จาก high level business requirement จาก system request(ลูกค้า) ไปสู่ detailed requirement ที่สามารถใช้เป็น input เพื่อสร้าง model
- what is a requirement ?
	- requirement เป็น statement ที่สามารถ express need ของผู้เกี่ยวข้อง ที่คำนึงถึง constraints ดัังนั้นประกอบไปด้วย need , constraints , condition 
	- ***Constraints*** -> เป็นข้อจำกัดที่ส่งผลต่อการเลือกหนทางในการออกแบบระบบ design solution หรือ implementation และ ไม่สามารถเปลี่ยนได้โดย enterprise เช่น user ต้องการระบบในอีก 3 เดือน หรือ constraints of time / money /space / financial / economic / political
	- ***Condition*** -> เป็นสิ่งที่วัดได้ เป็นเชิงปริมาณ หรือ เชิงคุณภาพ แต่ทำให้วัดได้ ใช้ในการกำหนดระบบ 
	 (เช่น ภายใต้ อุณหภูมิ 100 องศา censor ต้องทำอะไรให้กับใคร เป็นต้น)
	- มองแบบ high level แล้ว requirement คือ what the system must do? คือทำอะไรได้ให้กับ stake holder และ มี characteristic อะไรบ้าง เช่นมันเป็น android app / platform ไรงี้
	- requirement จะ evolve เป็น technical description ว่าเราจะนำไป implement ระบบยังไง
##### Requirement determination
- Functional requirement (FR) -> ส่งผลกับ user โดยตรงเพราะเป็นความคาดหวังจาก user perspective คือต้องการให้ระบบทำอะไรได้บ้าง นอกจากนั้นยังเกี่ยวข้องกับ data ที่ระบบต้องจัดเก็บในการทำงานอะไรบางอย่างเพื่อ display result มาตามความต้องการของ customer
	- เช่น system shall be able to ***search*** for available ***inventory***
	- เช่น system shall be able to ***report*** actual and budgeted ***expenses***
- Non-functional requirement (NFR) -> สะท้อนถึง quality ของระบบ ซึ่งสะท้อนให้เห็น 
	- behavioral properties เช่น response time / real time / batch processing และ characteristic เป็นลักษณะเฉพาะของระบบ และ constraint ซึ่งเป็น wearable device 
	- quality attribute ที่ใครๆก็อยากได้ ที่ระบบต้องมี performance , security , usability , cultural , political ที่ต้องคำนึงด้วย
- Type and Example ของ Non functional requirement (ความต้องการเชิงคุณภาพ)
	- Operational ความต้องการในส่วนของการนำไปปฏิบัติงาน
		- related to -> Physical and technical requirement in which the system will operate
		- example -> System shall operate on any web browser 
	- Performance สมรรถนะ 
		- related to -> speed , capacity , reliability
		- example -> For any interaction with the user the system shall respond within 2 seconds จะไม่ใช้คำว่าเร็ว แต่ใช้ตัวเลขที่รับได้ ( ข้อสอบอาจออกเช่น response as soon as possible คำนี้จะไช้ไม่ได้ )
	- Security ความปลอดภัย
		- related to -> access control
		- example -> The system shall allow only direct manager to see personnel records of staff
	- Cutural & political
		- related to -> cultural , political , legal factors affecting system
		- example -> The system shall be able to distinguish between United States and European currency

#### Requirement Definition
---
- อยู่ในรูป text report ที่เป็นไปตาม outline format 
- กำหนดขอบเขตของโครงการ
- เรียงลำดับความสำคัญของ requirement ได้ (ช่วยกำหนดโดย stake holder , user , developer)
- requirement จะใช้ในการสร้าง analysis model และส่งผลกับ subsequent workflows ในแง่ของ SDLC (design , implement , deploy)

#### System Analyst Roles
- Business Analyst -> close to user ต้องเข้าใจ business context , key business aspect คือปัจจุบัน องค์การทำระบบต้องการอะไร ต้องเข้าใจ การที่เราสร้างระบบขึ้นมาต้องเข้าใจว่าก่อให้เกิด business value อะไร และต้อง design process อันใหม่ และ policies (ต้องเข้าใจ business flow)
- Systems Analyst -> เกี่ยวข้องโดยตรงกับ ระบบ , hardware , network , ... ต้องเข้าใจ system technology (ปรับตาม new business process ที่ถูก declared by business analyst) ต้อง design information system โดยคำนึงถึง standard ด้วย
- บางองค์กรอาจจะรวม 2 หน้าที่นี้ในคนเดียว

#### Goal of requirements analysis process
- เพื่อสร้าง requirement ที่สามารถนำไปใช้ใน process อื่นๆ (ตอนขั้นตอน design หรือ implement) และ ถูกอ้างอิง โดย stakeholder
- ดังนั้น requirement ควร Clear , Complete , Correct , Consistency , Useful reference

#### Benefits of producing robust requirements (ประโยชน์ของการสร้าง requirement ที่ชัดเจน)
- Providing -> มี document เพื่อบอกว่า software จะทำอะไรได้บ้าง
- Reducing -> การมี requirement ที่ดีจะ reduce effort จากการที่ต้องมานั่งทำใหม่หลายรอบ
- Providing -> เป็นตัวตั้งต้นการประมาณการของ ต้นทุน (cost estimation)
- Providing -> จะเขียน requirement เพื่อช่วยให้ tester ทดสอบระบบได้
- Facilitating -> ใช้เป็นเอกสารอ้างอิงเวลาจะทำ software evolution

#### Ex. ***High level*** requirements
- A patient appointment system
	- Manage appointments
	- Produce schedule
	- Record docter availability
- A running management system
	- Create an account for the runner and organizer
	- Create a running event
	- Register to the event

#### Example of Requirements Definition
- Functional requirements (FRs)
	These are organized by feature
	1. Manage appointments
		1.1 The system shall allow the patient to make a new appointment.
		1.2 The system shall allow the patient to change an appointment.
		1.3 The system shall allow the patient to cancel an appointment.
	2. Produce schedule
		2.1 The system shall allow the office manager to check a daily schedule.
		2.2 The system shall allow the office manager to print a daily schedule.
	3. Record doctor availability
		3.1 The system shall allow the doctor to update a schedule.
- Non Functional requirements (NFRs)
	1. Operational requirements
		1.1 The system shall operate Windows environment
		1.2 The system should be able to connect to printers wirelessly.
		1.3 The system should automatically back up at the end of each day.
	2. Performance requirements
		2.1 The system shall store a new appointment in 2 seconds or less
		2.2 The system shall retrieve the daily appointment schedule in 2 seconds or less
	3. Security requirements
		3.1 The system shall allow only doctors to set their availability
		3.2 The system shall allow only a manager to produce a schedule.
	4. Cultural and political requirements
		4.1 The system shall support 2 languages Thai and English

#### Deriving NFRs
---
Concerns decomposition -> คือว่าถ้าเราต้องการให้ระบบเรามีความปลอดภัย ระบบจะปลอดภัย จะมีสาเหตุจากความไม่ปลอดถัย 3 รายการ
- Collision ชนกัน
- Derailement ตกราง
	- Excess speed for track conditions ขับเร็วเกิน
		- System detect and avoid excess speed
			- ภายใต้ track condition อะไรที่ทำให้ excess speed ก่อให้เกิด derailment (รถไฟตกราง) ก็คือระบบต้อง detect ให้ได้ว่าความเร็วที่ใช้ต่อสภาพงานเป็นอย่างไร
			- ใน reality แล้ว excess speed คืออะไรกันแน่
	- Track damage รางเสีย
- Personal accident 

#### Type of Systems and Relevant NFRs
---
- Real time Systems
- Safety critical Systems
- Web Systems
- Information Systems
ไปดูในสไลด์ จะมีแนวๆหลายๆ NFR ที่อยู่ในแต่ละ type ของ system

#### Most Commonly Considered NFRs
---
- Performance -> specified ความสามารถของ software product ในการที่จะให้ respond time ได้เท่าไหร่ก็ขึ้นอยู่กับ คุณภาพของ cpu ประมาณนี้ , attribute เช่น response time , space , capacity
- Reliability -> มองว่าระบบมีความสามารถในการทำงาน without failure และ maintain level ของ performance , attribue ดช้น completeness , accuracy , consistency
- Usability -> ความใช้งานง่าย
- Security -> ความปลอดภัย
- Maintainability -> ความง่ายในการ maintain ระบบ

#### Application Domains and Relevant NFRs
---
Example.
- Banking and Finance -> accuracy , confidentiality , performance , security , usability
- ....

#### Association between FR and NFR
---
บางทีการเขียน FR ก็นำไปสู่ NFR หรือในทางกลับกัน
EX.1 
- FR : The system shall allow users to hand-draw pictures
- NFR (operability) : The system shall operate with touch-screen devices and styluses
EX2.
- NFR (security) : The system shall authenticate users using username-password
- FR : The system shall allow users to sign up as registered users by specifying userdata
- FR : The system shall allow registered users to log in by using username and password

#### Requirements Construct
---
**Shall** -> เป็นสิ่งที่ต้องทำ หลีกเลี่ยงไม่ได้
**Should** -> ควรทำ แต่ไม่ต้องก็ได้ desire but not mandatory
**May** -> ระบบอาจจะทำ not mandatory not binding
- Non requirement , ควรเขียนเป็น descriptive ธรรมดา หลีกเลี่ยงการใช้ must แต่ใช้ verb พวก are , is , was
- ใช้ Positive statement หลีกเลี่ยง negative requirement เช่น "shall not"
- ใช้ active voice หลีกเลี่ยง active voice เช่น "shall be able to select"

#### Syntax for Requirements
---
- [Condition]/[Subject]/[Action]/[Object]/[Constraint of Action]
	- E.g When signal x is recieved /[Condition] , the system /[Subject] shall set /[Action] the signal x received bit /[Object] within 2 seconds /[Constraint of Action]
	- E.g (real life example) -> At sea state 1 *condition* , the system *subject* , shall set *action* , the signal x received bit *object* , within 2 seconds *constraint*
- Constraints
	- อาจส่งผลต่อหลายๆ requirement (user interface req like theme , color , font หรือ the system shall response to any transac within x seconds)
	- อาจจะตั้งให้้มีผลกับ relationship สู่ requirement หนึ่ง เช่น (user must login before using system)
	- อาจะเป็น constraint ที่เป็น requirement แยกมาเลยก็ได้ เช่น (the system shall allow the user to search the material allowed to rent using *keyword search*)

#### Characteristics for Individual requirement
- Neccessary -> ต้องจำเป็นเท่านั้น ถ้าลบออกจะเกิด deficiency
- Implementation Free -> ไม่ต้องสนวิธี implement
- Unambiguous -> ไม่ครุมเครือ แปลได้อย่างเดียว
- Consistent -> ไม่ขัดแย้งกันระหว่างแต่ละ req
- Complete -> ต้องครบถ้วนสมบูรณ์ตามที่ user ต้องการแล้ว เพราะมัน measurable
- Singular -> แสดงให้เห็นแค่ 1 function งาน หลีกเลี่ยง conjunctions (a -> b)
- Feasible -> requirement เป็นไปได้จริงตาม system constraint (technical , legal , ...)
- Tracable -> ตามรอยช่วยให้รู้ว่า requirement จาก stakeholder ถูกนำมาสร้างเป็น requirement อะไีรบ้าง
- Verifiable -> เราสามารถมีเครื่องมือนำมาทดสอบได้ว่า software ทำตาม requirement นั้นได้จริงๆ

#### Creating Requirement
---
- Determine both FN and NFN requirement
- Analyst ใช้ *requirement analysis strategies* เพื่อช่วยให้ user อธิบายความต้องการของตัวเอง
- Analyst ใช้ *requirement gathering techniques* เพื่อเก็บข้อมูลจาก user
- Analyst ทำงานกับ user เพื่อ verify , change , prioritize ทุกๆ requirement
- requirmeent evolve ได้ เช่น จากไม่ชัดเจนเป็นชัดเจน
- ระวัง อย่าใจดีกับ user แต่อย่าใจร้าย ห้ามขออะไรเกินกว่าขอบเขต (overtime / overbudget)

#### Requirement Analysis Strategies
---
มี 8 รายการ
1. Problem Analysis -> การวิเคราห์ปัญหา เราก็ถาม user ว่าอะไรคือปัญหาและมีความเห็นว่าจะแก้อย่างไร แต่เราต้องนำไป วิเคราห์ก่อนอีกที โดย user จะเล่าให้ฟัง แต่ต้องเข้าใจว่าที่ user พูดอยู่คือ complain หรือ problem หรือ solution ต้องให้เขาเล่าปัญหาให้หมด , วิธีนี้จะทำให้ได้ efficiency หรือ ease of use
2. Root Cause Analysis -> หาสาเหตุของปัญหา อย่ารีบโดดไปที่วิธีแก้ , focus ที่ root ของปัญหา หาว่า root ส่งผลกับปัญหาอย่างไรและจะได้ prioritize ปัญหาได้ และ สามารถบอกสาเหตุของปัญหาได้ 
3. Duration Analysis -> ทำการวิเคราห์ว่ามันต้องใช้เวลาเท่าไหร่ , เราพึงต้องรู้ว่ามันเสียเวลาที่ขั้นตอนไหน จากเวลา suppose และ เวลาจริงๆ เรากะไว้ว่า 6 ชม แต่ ทำจริง 9 เราจึงต้องหาว่า 3 ชมนั้นได้มาจากไหน จึงต้องทำ analysis ในแต่ละ task และหาวิธีที่จะลดเวลาที่เกินมานี้ 
	- Process integration -> รวบบาง step เข้าด้วยกัน
	- Process parallelization -> ทำบาง step พร้อมกัน
4. Activity-Based Costing -> มองในแง่ของการเงินถ้ากิจกรรมใดใช้ cost มาก , เราควรให้ความสำคัญกับกิจกรรมนี้ คำนึงถึง Direct cost เชน material , Indirect cost เช่น ค่าเช่า
5. Informal Benchmarking -> ใครทำดีดูแบบเขา ดูว่าเราทำได้ดีเท่าของคนที่เคยทำมาไหม analyze process คล้ายๆกัน ดู business flow และดู process ว่า feature ไหนโดนใจ
6. Outcome analysis -> เน้นการดูว่า real outcome ที่ customer ต้องการคืออะไร เช่น insurance company เพิ่ม business process ไปถึงการติดต่อกับ car repair shop ด้วยเพราะพวกเขารู้ว่า customer ต้องอยากซ่อมรถอยู่แล้ว
7. Technology analysis -> มี technology ใดที่ยอมรับการทำระบบของเราบ้าง
8. Acitivity Elimination -> อะไรไม่สำคัญก็กำจัดออกไป

#### Requirements-Gathering Techinques
---
ใช้ uncover requirements 
- Idenfiy sources of requirement และ select appropriate techniques
	- Stakeholders -> customer , end user , manager , marketing department , ...
	- relevant information -> e.g. wesite,  domain knowledge , business rule , ...
- Techniques
	1. Interviews -> การ interview ใช้ต้นทุนสูงเพราะต้อง face-to-face ดัวนั้นต้องตั้งวัตถุประสงค์ให้ชัดเจน เพื่อที่จะหาสาเหตุของปัญหา หรือสิ่งที่เขาต้องการให้มีดังนั้นต้องมี set ของคำถามไว้ล่วงหน้า และต้องเตรียมตัวก่อนการสัมภาษณ์
	2. JAD (joint application devlopment) -> เอาคนที่เกี่ยวข้องมาประชุมร่วมกันตาม agenda , เช่น ต้องการที่จะ setup requirement เราก็ต้องนำคนที่เกี่ยวข้องมาร่วมประชุมหลายๆคนมาไว้ในสถานที่แห่งหนึ่งแล้วประชุม แล้ว คนที่เกี่ยวข้องก็จะ present มุมมองของตัวเองและบอกผลที่ได้จากการประชุม
	3. Questionaires (Survey) -> set of question , ได้ information และความคิดเห็น แต่สิ่งที่ยากคือคนไม่ค่อยยอมตอบ 
	4. Document Analysis -> สำคัญมากในการแก้ปัญหาเชิงลึก , มีข้อมูลของ as-is system , วิเคราห์พวก user document เช่น Forms , Reports , Memos , Policy manuals , ... สรุปแล้วคือการวิเคราห์เชิงลึก as-is system จากเอกสารต่างๆและข้อมูลที่มีอยู่
	5. Observation -> ไปดูว่าพฤติกรรมการทำงานมีแบบไหนบ้าง ไปสังเกตการณ์ เราก็ต้องคำนึงว่าเราควรไปวันที่ peak ของการใช้งานหรือตอนไหนดีที่จะได้ดูการทำงานเยอะๆ และต้อง เนียนๆไป ไม่ให้คนรู้ไม่งั้นเขาอาจเปลี่ยนแปลงพฤติกรรมได้

#### System proposal
---
สร้าง project/system proposal เป็นการรวม material ทั้งหมดที่รวบรวมมาใน planning & analysis
includes : 
	- Executive summary
	- System request
	- workplan
	- Feasibility analysis
	- Requirement definition
	- Current model of system (expected to evolve)
