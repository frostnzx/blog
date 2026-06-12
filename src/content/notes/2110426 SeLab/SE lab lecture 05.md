
Date: 2025-04-04
Tag: #2110426-selab 

### Software Design
#### Intro
---
- System design -> คือเอาผลจาก analysis มา transform ให้เป็น design model 
- System design activities 
	- ระบุเป้าหมาย (ดีแค่ไหน) , ข้อจำกัดอะไร ? , resource พอไหม
	- เริ่ม design (เริ่มจากระดับ high level)
	- ค่อยๆลงรายละเอียด (refine)
- Analysis -> focus on WHAT
- Design -> focus on HOW
#### Software Properties
---
- Software ***Structural properties*** show -> บอกว่า software component มีจำนวนเท่าไหร่ กี่ชิ้น ประกอบกันยังไง เป็นการแบ่งเป็น part / component แล้วระบุ relationship
- Software ***behavioral properties*** show -> ชิ้นส่วนที่ออกแบบมามีพฤตกรรมยังไง ติดต่อสื่อสารกันอย่างไร

#### Software Design approach
---
- Create Design Model 
- Level of Abstraction
- Complexity of design
- Architectural Design -> High level design
- Deatiled Design -> Low level design (detail เยอะ)

#### Design model and level of abstraction
---
- Low level of abstraction -> มีความละเอียดมากๆ เช่นหน้าคนก็เป็นรูปหน้าคนเลย
- High level of abstraction -> ก็คือนามธรรมมากๆ เช่นถ้าเป็นหน้าคนก็จะเป็นแค่ แผนภาพว่าหน้าคนประกอบไปด้วยอะไรบ้าง
- ควรเริ่มออกแบบจาก High level of abstraction เพราะถ้าทำให้ละเอียดไปก่อนมันจะกลับมาแก้ไขยาก

#### Overview of system design
---
- Analysis results :
	- non functional requirement and constants
	- A use case model
	- An object model
	- A sequence diagram for each use case
- Analysis model : 
	- does not contain info about internal structure or sw config
- System design result :

Use case diagram , Activity diagram , Business class diagram 
						|
						V
Class diagram , sequence diagram , package diagram , component diagram , deployment diagram

ถ้าเรามี class diagram & sequence diagram ละเอียด สามารถเขียนโปรแกรมตามได้ทันที

#### System design concepts Subsystem and classes
---
ต้องเริ่มจากการแบ่งเป็น subsystem ก่อน (System decomposition)
###### Subsystem diagram
- Dependency -> เส้นประความสัมพันธ์
- เช่น DispatcherInterface depend on MapManagement , Notification , ResourceManagement , IncidentManagement
- หัวลูกศร -> ฉันใช้บริการคุณ
- Subsystem ที่มีผลที่สุดคืออันที่มี in-degree มากสุด (fan-in)
- subsystem -> ส่วนย่อยของระบบที่ service ได้กับ subsystem อื่นๆ
###### UML component diagram
- Ball and socket notation -> เป็นลูกวงกลม และ วง มาเชื่อมกัน 
	- ball -> provided interface
	- socket -> required interface
	- Ex. [FieldOfficerInterface]--( o--[ResourceManagement]   , resource management ให้บริการ , fieldOfficerInterface ใช้บริการ
###### Service and subsystem interface
- ทุกๆ subsystem จะมี subsystem-interface (api) ให้ชาวบ้านใช้บริการ

###### Coupling & Cohesion
- Coupling 
	- ควรน้อยๆ
	- number of dependencies (degree of interaction) ระหว่าง 2 subsystem
	- types
		- content -> แย่สุด (ถ้ามี subsystem a กับ b แล้ว b ไปใช้บางส่วนของ a ไม่ดีเพราะไปพึ่งคนอื่น ต้องกำจัดทิ้ง)
		- common -> * a กับ b มี common area (global variable)
		- control -> ** คือ a เรียก b แล้ว b ทำตาม flg ที่ตกลงกันไว้
		- stamp -> *** ส่งคล้ายๆ data แต่ต้องเอาไปแกะอีกที
		- data -> ดีสุด (ส่งข้อมูลไปเลยดื้อๆ ไม่สนอะไร ส่งเป็น scalar)
- Cohesion
	- ควรเยอะๆ
	- การทำงานร่วมกัน ควรเชื่อมกันอย่างเหนียวแน่น ไม่ควรมีการแบ่งพรรคแบ่งพวก
	- types
		- coincidental -> แย่สุด (บังเอิญมาเจอกัน รวบเข้ากองแบบมั่วๆ)
		- logical -> มารวมกันแล้วอ้างถึงการทำงานคล้ายๆกัน แต่แยกแยะโดยผู้เรียก
		- temporal -> สัมพันธ์เฉพาะบางช่วงเวลา
		- procedural -> การทำงานแบบต่อเนื่องกัน ใช้ข้อมูลแตกต่างกัน
		- communicational -> การทำงานแบบต่อเนื่องกัน ใช้ข้อมูลชุดเดียวกัน
		- informational -> ข้อมูลชุดเดียวกัน แต่เลือกทำ (คล้ายๆ loigical)
		- functional -> ดีสุด (แต่ละส่วนข้างใน ทำงานเรื่องเดียว)


### API Design
---
- Application programming interface
- เขียน API อยู๋ที่ backend ใช้ส่งต่อข้อมูล
- ที่เราต้องมี API เพราะเหตุผลทางธุรกิจ
	1. API ทำให้สามารถแลกเปลี่ยนข้อมูลกันได้
	2. ทำให้ business ทำ unique product ได้มากขึ้น โดยการแชร์กันใช้ API
#### API history
---
- ใน 1960 เวลาไม่มี internet ต้องใช้ library แชร์ code กัน
- ตอน 1970 - 1980 เกิด api network เรียกผ่าน Remote procedure call (RPCs) 
- 1990 เริ่มมี internet จริงๆแล้วและมี standard คือ COBRA และต่างๆ 
- 2000 มี standard ในการส่ง web api มี standard XML , SOAP 
- ปัจจุบัน ใช้ JSON เป็นมาตรฐาน ไม่ว่าจะ google map , amazon บลาๆ ใช้ api เป็นปกติ

เรียก api จะไปดูที่ cache ก่อน ถ้ามี เอาจาก cache ถ้าไม่มีต้องไปเรียกจากหลังบ้าน การทำงานย่อมต้องมี monitor (Amazon CloudWatch) 

#### Api Paradigms
---
- เป็นรูปแบบการเรียกใช้งาน API แบ่งเป็น 2 ประเภท
	1. Request-Response API
		- REST
		- RPC
		- GraphQL
	2. Event-Driven API เช่นอยู่ๆดีมีไลน์เด้งมา เป็นรูปแบบของ public subscribe คือ push notification
		- WebHooks
		- WebSockets
		- HTTP Streaming
#### REST
---
- Request -> server transfer that to endpoint
- JSON

#### Showing relationship
---
- ตั้งชื่อ sub resource ให้มันมีความหมาย
- ทำให้ relationship มัน clear สำหรับ dev ที่ใช้ API

#### Design best practices
---
- Design for real life use cases
- Design for great dev experience
#### Design for real life use cases
---
ดูบนพื้นฐานในการทำงานจริงในชีวิตจริง จะง่ายสำหรับ dev
พยายามอย่า leak internal structure ของ application

#### Design for great dev experience
---
- Make it fast and easy to understand to get started
- Work toward consistency
	- ชื่อ endpoint ควรสื่อความหมายกับ api
	- dev ควรสามารถเดา api ได้โดยไม่ต้องเปิด doc
	- consistency ทำให้ dev ทำอะไรใหม่ๆได้ง่าย
- Make Troubleshooting easy
	- meaningful errors
- Make API extensible
	- ปกติจะต้องมีการเปลียนแปลงตัว api อยู่แล้ว
	- ควรทำ beta program เพื่อขอ feedback จากผู้ใช้
	- ในบางกรณีอาจะต้องทำ version
	- ในบาง company and product อาจจะต้องใช้เวอร์ชั่นที่ไม่ได้ใหม่สุด
#### REST API Guideline
---
1. Accept and response with JSON
2. ใช้ noun แทน verb ใน endpoint path
3. ตั้งชื่อ collections ของอะไรต่างๆด้วย พหุนาม
4. nesting resource สำหรับ object ที่มีขั้นบรรได
5. เขียน error มีความหมาย
6. ถ้าส่งอะไรไปเยอะๆให้ทำ Filtering , sorting , pagination
7. มี good security
8. ใช้่ cache ให้มีประโยชน์
9. ทำ versioning


### TDD & BDD
---
#### Cherkin and Cucumber
- เป้น business readable language ที่ใช้เขียน requirement เพื่อไว้เขียน business behavior โดยที่ไม่ต้องเข้าไปลงรายละเอียด 
- A domain specific language
- Use plain language to describe Use Cases
Given , When , Then

#### BDD
คือการพัฒนาระบบโดยการเขียน requirement ของ user มาเขียนเป็น user stories แล้วมาเขียนเป็น acceptance criteria แล้วนำมา test บน gherkin ทำให้การ test เข้าถึง business 
Date: 2025-04-17
Tag: 

#### Gherkin Syntax
```
FEATURE: Ttle of the Scenatio
Given [Precondition or Initial Contest]
When [Event or Trigger]
Then [Excepted output]
```
- Gherkin document เขียนในไฟล์ .feature
- cucumber เป็น tool ที่ execute gherkin และทำ test
```
Example
Feature: Place Order

As a consumer of the Order Service
I should be able to place an order

Scenario: Order authorized
	Given a valid consumer
	Given using a valid credit card
	Given the restaurant is accepting orders
	When I place an order for Chicken Vindaloo at Ajanta
	Then the order should be APPROVED
	And an OrderAuthorized event should be publised
```


#### Feature
- เป็นตัวบอกว่าเป็น Gherkin
- ในไฟล์นึงมี Feature ได้คำเดียว

#### Steps
- เริ่มด้วย Given , when then , and or But
- ไม่สามารถมี Given หรือตัวอื่นคนละตัวกัน แต่ text เดียวกันได้

#### Given
#### When
#### Then
- Output สามารถ track ได้
#### And , But

#### Background

#### Advantage of Gherkin
---
- Gherkin ง่ายพอสำหรับคนที่ไม่ใช้ programmer
- programmer สามารถใช้เป็น base ของ tests
- ทำให้ User stories ง่ายขึ้น
- Target business requirements
#### Disadvantage of Gherkin
---
- ต้องมีความร่วมมืออย่างมากจากทาง business
- ไม่ดีสำหรับทุกสถานการณ์
- ถ้าเขียนไม่ดีอาจเพิ่มภาระในการ test
#### Cucumber
---
Testing tool ที่ support BDD

### TDD
---
Developer centric ต่างจาก BDD
Main step
- Create test
- Execute specific test
- Implement code
- Run all test and refactor the codes
Benefit of TDD
- Early bug detection
- Improved code design
- Better documentation
- Increased confidense -> test เพิ่ม confidence ว่า code จะรันได้ตาม test
