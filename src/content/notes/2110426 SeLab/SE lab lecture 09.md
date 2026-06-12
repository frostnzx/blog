---
title: "SE lab lecture 09"
date: "2025-04-20"
published: true
kind: "note"
course: "2110426 SeLab"
tags:
  - "2110426-selab"
---

#### System-Design based on NFRs requirements
---
- เกี่ยวข้องกับการวางโครงสร้างเชิงองค์ประกอบ
- ในระบบสมัยใหม่ มักกระจายออกไปใน computer หลายๆตัวใน network เราจึงต้องมีการ design Physical Architecture Layer
- System ส่วนใหญ่อยู่ภายใต้ constraint ของ system ที่มีอยู่ และ network
- Physical Architecture Design -> คิดว่าเราจะกระจาย ระบบต่างๆไปยัง computer เครื่องต่างๆอย่างไร แล้วเราจะใช้ hardware , software อย่างไรดี โดยการ design ต้องพึ่ง
	- ความรู้ด้าน key ปัจจัยต่างๆ
	- เข้าใจ non functional requirement
	- ทำยาก ต้องปรับจูนบ่อยๆ

#### Physical Architecture Layer Design
---
- เราต้องตัดสินใจว่า software ที่เราเขียนขึ้่นจะรันอยู่บน hardware ก้อนนั้นก้อนนี้อย่างไร
- Architectural components
	- Software components
		- Data storage (file , database)
		- Data access logic (ครอบ db เพื่อดึงข้อมูลออกมา) (DAM , sql queries ...)
		- Application logic (backend)
		- Presentation logic (frontend)
	- Hardware components
		- Client computers (terminals , desktops , laptops , ...)
		- Servers (mainframes , micros , minis , rack mounted , ...)
		- Networks (to connect all computers)
- ต่อไปจะเป็น architecture ต่างๆตั้งแต่โบราณกาล
- Server-based architecture
	- Server (mainframe computer) มีหน้าที่ทำเกือบทุกอย่าง
	- Client มีหน้าที่แค่ต่อ terminal เข้าไป (shell เข้าไป)
	- เป็น one-point of control (เซิฟเวอร์ทำทุกอย่าง)
	- ค่า upgrade server แพง
- Client-based architecture
	- Server (microcomputer) แค่เก็บ data เท่านั้น
	- Client (microcomputer) มีหน้าที่ compute
	- ข้อดี -> ลดภาระ server
	- ข้อเสีย -> network traffic เพราะจะมีการโหลดข้อมูลเข้าๆออกๆระหว่าง client กับ server ตลอดเวลา มันก็จะเปลือง resource ทางด้าน network และบางครั้ง client ก็มีความแตกต่างบางเครื่องเร็วบางเครื่องช้า ประสบการณ์ก็จะไม่คงที่
- Client-server architecture
	- บางส่วนประมวลผลที่ client , บางส่วนประมวลผลที่ server
	- Thin client -> จะประมาลผลที่ client น้อยหน่อยประวลผลแค presentation logic (ที่ server ยังเยอะ)
	- Thick client -> ทั้ง presentation logic , application logic จะ run บน client และ server ก็จะบางๆหน่อย
	- Highly scalable เพราะเราสามารถ upgrade client บางส่วนได้
- Three-tiered architecture
	- รูปแบบหนึ่งของ client-server
	- หลังบ้าน database server
	- กลางบ้าน application server
	- หน้าบ้าน client
- N-tiered architecture
	- Web browser -> Frontend -> Backend -> Database
	- ต่างจาก three tiered แค่มีการใช้ web browser เลยไม่ต้องลงโปรแกรมใหม่ทุกรอบที่อัพเดต

#### Factor of Selecting Physical Architecture
---
- Cost of infastructure งบของ hardware , software , network
- Cost of development งบของ complexity of architecture , ..
- Ease of development เลือกอันยากมันก็ยาก
- Interface capablities -> character-based vs GUI
- Control and Security -> one point vs many point of control
- Scalability -> cost and limitation of capacity change or upgrade

#### Cloud Computing
---
- SaaS -> มี hosted application / apps ด้วย
- Paas -> ไม่ต้องลง OS เอง มี tool ที่ให้มากับ platform
- IaaS -> Server , Network , Physical data center -> ลงทุกอย่างเอง
- ไปดูรูปในสไลด์ดีกว่า
- เวลาเราจะเลือกต้องดู cost และ flexible

#### Ubiquitous Computing and IOT
---
- Ubiquitous computing -> computing แฝงอยู่ในชีวิตประจำวันพวกเรา
- IoTs -> พวกในชีวิตประจำวัน (ubiquitous computing) เริ่มเชื่อมกันผ่าน internet

#### Green IT
---
- เกี่ยวกับพวกโลกร้อน
- E-waste -> ใช้ linux จะใช้พลังงานน้อยกว่า window
- Data-center -> ใช้พลังงานเยอะ ต้องไปตั้งในที่เย็นๆ พลังงานสะอาด แหล่งพลังงานที่สะอาดๆ 

#### NFRs
---
revisited 

#### Infrastructure Design
---
- อธิบายจาก deployment diagram , network model

#### Deployment Diagram
---
- แสดงถึง relationship ระหว่าง component ต่างๆทั้ง hardware , software
- element of deployment diagram
	- Nodes -> device (อาจะะเป็นอย่างอื่นก็ได้) (ร่าง) + artifact (วิญญาณ)
	- Artifact -> เหมือน วิญญาณ
	- Communication paths

#### Network model 
---
- show complexity of system 
- show how system's component fit together
- show geolocation

### Microservice

#### Objective
---
- Monolithic hell and how to escape by microservice architecture
- Characteristic of Microservice
- How to use DevOps to microservice

#### What is software architecture
---
- คือระบบ computer ประกอบด้วย set ของ structure และ พวกนั้นต้องประกอบด้วยเหตุผล และ เขียนออกมาในรูปแบบ element , relation และสุดท้าย properties
- software architecture -> multi dimensional เช่น มีตึกนึง ก็จะมีแปลนหลายแปลน จะมีแปลน โครงสร้าง , ไฟฟ้า , ประปา ,. ...

###### Philippe Kruchtens 4 + 1 view model
---
- Logical view -> พูดถึงส่วนประกอบในระบบที่ว่าทำงานในเชิง logic อย่างไร (Class diagram , state diagram , ...)
- Process view -> อธิบาย step การทำงานในเชิงเวลา และ ลำดับ (activity diagram , sequenece diagram , ...)
- Development view -> ระบบทำมาเป็น component ๆ จะ manage มันยังไง (Package , Component diagram , ...)
- Physical view (Deployment view) -> ใช้บอกการ deploy (Deployment diagram )
- Use case view -> พูดถึง FR ของระบบว่ามันทำงานอย่างไรกับโลกภายนอก (Use case diagram)
- เวลาทำความเข้าใจระบบต้องเข้าใจทั้ง 4+1 view ถึงจะเข้าใจภาพรวม
- แล้ว Architecture สำคัญอย่างไร ? -> มันจะไป enable quality of service requirement (NFR) , ดังนั้น system design , system architecture จะเกี่ยวข้องโดยตรงกับ NFR
- Development velocity เกี่ยวข้องกับ NFR -> Maintainability , Testability , Deployability

#### Modern software development
---
- Process -> DevOps / CI/CD
- Organization -> small , autonomous team
- Architecture -> ต้อง support (microservice คือคำตอบ)

Monolithic architecture -> เป็น style ที่ structure ของ app ทุกๆ execute table component รวมอยู่ในก้อนเดียว

- เมื่อ application โตขึ้นเรื่อยๆ agile development และ deployment จะ impossible เรียกสถานการณ์นี้ว่า monolithic hell

Microservice -> Maintainability + Testability + Deployability + เปลี่ยน tech stack ได้ แบบไม่ต้องแคร์ชาวบ้านมากเพราะมันแยกกันอยู่แล้ว , ข้อเสียคือ การแตก service มันไม่ง่าย บางทีแตกไม่ถูกอาจจะแย่กว่าด้วยซ้ำ
