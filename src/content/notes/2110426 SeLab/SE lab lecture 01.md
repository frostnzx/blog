
Date: 2025-03-31
Tag: #2110426-selab

#### The Product
- Software คืออะไร
	- ประกอบด้วย องค์ประกอบ 3 อย่าง
		1. Program -> ตัวโปรแกรม
		2. Document -> เอกสารที่เกี่ยวข้องเช่น design / spec / docs
		3. Data -> ข้อมูลที่ระบบใช้ทั้งหมด
	- เมื่อ delivery ให้ลูกค้าถ้าต้องการให้มี software quality ที่ดีต้องมีทั้ง 3 อย่างที่ดี
- Software ถูก developed ไ่ม่ใช่ manufactured เหมือน hardware
- Manufactured -> ผลิดให้เหมือนกันทุกป		2. Document -> เอกสารที่เกี่ยวข้องเช่น design / spec / docs
		3. Data -> ข้อมูลที่ระบบใช้ทั้งหมด
	- เมื่อ delivery ให้ลูกค้าถ้าต้องการให้มี software quality ที่ดีต้องมีทั้ง 3 อย่างที่ดี
- Software ถูก developed ไ่ม่ใช่ manufactured เหมือน hardware
- Manufactured -> ผลิดให้เหมือนกันทุกประการ
- Software เทียบเคียงกับ วรรณกรรมหรืือนิยาย ลิขสิทธิ์เป็นของผู้เขียน ยกเว้นยกให้ผู้อื่น
- ได้รับการคุ้มครองโดยทันที โดยไม่ต้องจดทะเบียน แต่ก็ยังสามารถไปจดได้ มีอายุการคุ้มครองตลอดชีวิต แหละหลังจากตายไปอีก 50 ปี
- สรุป software คือ program + document + data ***ออกสอบ***
- Software ไม่สึกหรอ (wear out)
	- Obsolate -> ล้าสมัยทำให้ใช้ software ไม่ได้
	- เมื่อล้าสมัยไปถึงจุดหนึ่งแล้วจะถระการ
- Software เทียบเคียงกับ วรรณกรรมหรืือนิยาย ลิขสิทธิ์เป็นของผู้เขียน ยกเว้นยกให้ผู้อื่น
- ได้รับการคุ้มครองโดยทันที โดยไม่ต้องจดทะเบียน แต่ก็ยังสามารถไปจดได้ มีอายุการคุ้มครองตลอดชีวิต แหละหลังจากตายไปอีก 50 ปี
- สรุป software คือ program + document + data ***ออกสอบ***
- Software ไม่สึกหรอ (wear out)
	- Obsolate -> ล้าสมัยทำให้ใช้ software ไม่ได้
	- เมื่อล้าสมัยไปถึงจุดหนึ่งแล้วจะถูกโยนทิ้ง
- Is Software Flexible ? 
	- Cost of change ค่าใช้จ่ายในการแก้โปรแกรม
		- Definition -> 1x
		- Development -> 1.5-6x
		- After release -> 60-100x
	- วิธีที่ดีที่สุดคือ ห้ามให้ลูกค้าคุยกับ dev โดยตรง ให้คุยกับ BA / Project Manager 
- Software Engineering คือการ design และ develop highquality software ตรงเวลา และตามงบ
- Software Engineer -> ต้องเขียนโค้ดที่ดี เข้าใจง่าย ดูแลง่าย
- Zero defect software (software ที่ไม่มี bug เลย) -> ทำได้ยาก
- Computer scientist -> เน้นทฤษฎี สร้างเครื่องมือ
- Software engineers -> เน้นปฎิบัติ ใช้เครื่องมือ -> Practitioner
- Participant in Developing a Project
	- Customer -> คนจ่าย
	- Developer -> คนทำ
	- User -> คนใช้ -> หา requirement
- ตาม SCRUM -> User , Customer -> หมู
- Member of Development temam
	- Requirement analyst
		- ทำงานกับ customer
		- break down what customer want
	- Designer -> ทำงานกับ analyst เพื่อบอกว่า customer ต้องการอะไรเป็นแบบ system level
	- Programmer -> ทำงานกับ designer เพื่อ generate code 
	- Tester -> ดูว่า programmer ทำอะไรผิด
	- Trainers -> สอน user ใช้โปรแกรม
	-  Maintenance team -> แก้ fault ที่ถูกเจอโดย user
- Triple constraints of Project Management (+quality concern) 
	- ดูใน slide
	- Scope -> สิ่งที่ต้องทำให้เสร้จ
	- Cost -> ค่าใช้จ่ายที่ต้องใช้
	- Time -> เวลาที่ต้องใช้
	- เราสามารถ fix ได้แค่ 2 ตัวเท่านั้น ถ้า fix ทั้งหมด เราจะไม่ได้คุณภาพ

#### The Process
- What is software engineering ?
	- The application of a systematic, disciplined, quantifialbe approach to the development, operation and maintenace of software, and the study of it [IEEE,1990]
- The software process
	- เป็นวิศวกร ต้องสร้าง Model เพื่อช่วยให้เข้าใจ
	- software process model มีหลายแบบ เช่น waterfall model ทุก model มีส่วน common คือ common process framework ซึ่งประกอบไปด้วย
		- Framework Activities
			- Task sets
				- Tasks
				- Milestones, deliverable -> สิ่งทีต้องทำ ณ เวลานั้นๆ , งานที่ต้องส่ง
				- SQA Points -> การวัดผล แต้มคุณภาพ
		- Umbrella Activities
			- กิจกรรมที่เกิดตลอดตั้งแต่เริ่มโครงการ จนถึง จบโครงการ
			- Cover ทั่ว Project เหมือนร่ม
			- เช่น การทำ SCM , SQA , Measure Metrices
	- Generic Process Framework
		- generic process framework define
			- Communication
			- Planning
			- Modeling
			- Construction
			- Deployment
		- Addition , umbrella activities , project tracking and control , risk management , quality assurance , configuration management , technical reviews 
- Types of Framework activities
	- Linear Sequential Process Model
		- Linear process flow -> ทำแบบเป็นขึ้นตอน
		- Iterative process flow -> ทำแบบเป็นขั้นตอน แต่วนได้นิดหน่อย
	- Unified Process Model
		- Evolutionary process flow -> วนแบบค่อยๆ ดีขึ้น
		- Parallel process flow -> ทำแบบคู่ขนาน
- Linear Sequential Model 
	- Waterfall model / classical model ***จำ เพราะในไทยใช้ waterfall***
		- กิจกรรมใน framework activities
		1. System / information and engineering modeling
		2. Software requirement analysis
		3. Design
		4. Code Generation
		5. Testing
		6. Support
		- แต่ละขึ้นตอน ใช้เวลามากที่สุด แต่ก็สามารถวนกลับไปทำข้างบนได้
		- ข้อเสียของ waterfall -> บอกแค่กรอบ ไม่มี guide ว่าเราจะแก้ไขอย่างไร อีกอย่างคือมันช้า เพราะลูกค้าอยากใช้ แต่ ไม่รุ้ว่าต้องการอะไร
	- V Model -> Waterfall แบบเกี่ยวข้องกับ test ด้วย
		- ดู diagram ใน slide
		- การพยายามทำ test activites ไปพร้อมๆกับ analysis design
		- เป็นลักษณะแบ่ง ซ้าย - ขวา เป็น v model
	- Prototyping
		- การสร้างต้นแบบ ยังสร้างได้ไม่ครบ เป็น sw ที่สร้างอย่างรวดเร็วซึ่งสามารถใช้งานได้นิดหน่อย
	- RAD
	- Incremental model
	- Spiral model
- UML
- Agile Devlopment -> หลังจาก เปลี่ยนจาก waterfall ปกติมาใช้ spiral หรือแบบนู่นนี่ แต่ก็ยังแก้ปัญหาไม่ได้ จึงหันมาใช้ Agile ซึ่งมีหลายแบบเช่น SCRUM , Extreme