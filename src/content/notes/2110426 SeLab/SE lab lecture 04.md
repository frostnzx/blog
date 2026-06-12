
Date: 2025-04-16
Tag: #2110426-selab 

### Activity Diagram
---
- นำมาจาก requirement definition , use case diagram , .... เพื่อนำมาเขียน activity diagram และเอกสารอื่นๆก็ช่วยได้
- idetify set of activities เชื่อมด้วย control flows , object flows and nodes
- identify decision และ parallelism
- วาด diagram
	- minimize crossing lines
	- top to bottom , left to right

### Class Diagram
#### Relationships
---
- Generalization -> inheritance (a kind of) , เช่น employee is a kind of person
- Aggregation -> a part of (logical) (เป็นส่วนหนึ่ง) เช่น employee is a part of Department
	- Employee -> Department
	- ถ้าทำลาย Department แล้ว , Employee จะยังอยู่
	- Wheel -> Vehicle
	- ถ้าทำลาย Vehicle , wheel จะยังอยู่ เพราะมันเป็นทาง logical
- Composition -> a part of (physical) คือเป็นส่วนหนึ่งจริงๆไม่ใช้แค่ทาง logic
	- Door -> Car
	- สังเกตว่าถ้าทำลาย Car แล้ว Door ก็จะไม่มีอยู่แล้ว (The whole) if the whole die the part die. (เพราะมันเป็นทาง physical)
- Association -> misc. (แบบอื่นที่ไม่ใช้ ไอ้3ตัวบน)
	- common in many-to-many relationship
	- used when attribute about relationship need *record* เช่น Student -> Course (ต้องเก็บ Grade)

#### Object Identification
---
- Textual analysis
	- ตั้งต้นจาก problem description หรือให้ดีก็ use case or use case description
	- map จากคำพูดสู้ class component
		- Noun -> class / object /attribute
		- Verb -> operation / association
	- ตัวอย่างจาก part of speech -> model component
		- Proper noun -> Instance (Alice , Ace of hearts)
		- Common noun -> class (PlayingCard , FieldOfficer)
		- Collective noun -> class ที่เกิดจาก object ที่สร้างจากอีก class นึง (team of student)
		- Doing verb -> Operation (Create , submit)
		- Being verb -> Inheritance (Is a kind of)
		- Having verb -> Aggregation / Composition (Has / Consist of / Include)
		- Modal verb -> Constraint (Must be)
		- Adjective -> attribute (A yellow ball)
- Common object list
	- Categories of objects ช่วยสร้าง list of objects ใน business domain
	- Physical or tangible things
	- Incidents
	- Roles
	- Interactions
- Patterns
	- ดูแบบอย่างจาก propose solution ในอดีตโดย expert ที่ทำพวกเรื่อง security , authorization อะไรแบบนี้ไว้แล้ว แล้วก็ทำตาม , จะได้ complete and robust model 
	- เริ่มตั้งแต่ระดับ business oriented level
	- Analysis pattern -> Transaction , Party , Product 
	- Entity Control Boundary Pattern (ECB) 
		- Control ตัวกลางใช้เป็นตัวเชื่อม Boundary กับ Entity
		- Frontend -> MarketingCampaignForm
		- Backend -> BudgetSystem
		- Frontend -> Backend ผ่าน Control
		- Entity -> represent stereotype class ที่เกี่ยวข้องกับ data เช่น document , information , ใบจ่ายยาของแพทย์ , ticket ของ airport
		- Boundary -> มีทั้ง Frontend / Backend 
			- Frontend -> user to system
			- Backend -> system to external system
		- Control -> ใช้ในการทำ flow ต่างๆ ระหว่าง front / back , entity

#### Sequence Diagram
---
- โชว์ object ที่ participate ใน single-use-case
- โชว์ sequence ของ message (info sent to object to tell them to execute one of their behaviors) , หรือโชว์ time ordering ของ message (timeline view)
- ช่วยให้เข้าใจ realtime specification 
- *Generic diagram* -> show all scenario for that use case
- *Instance diagram* -> show single scenario for that use case
- การเขียนชื่อ Object
	- student -> object ชื่อ student ไม่บอก type
	- :Student -> object instantiate มาจาก Student แต่ไม่ได้บอกชื่อมันเอง
	- s:Student -> object instantiate มาจาก Student และมันชื่อ 's'



