
Date: 2025-04-09
Tag: #2110426-selab 

### Software Testing Techniques
---
#### Testing fundamentals
- Is a critical element of quality assurance
- Organization spends 30-40% of total project effort for testing
- Human related software spends 3-5 times as much as other se activities combined

#### Testing Objective
- Testing is the process of executing program with intend of finding error
- Good test case has high chance of finding undiscovered error
- Successful test is one that found undiscovered error

#### Testing Definition
- Error (Mistake) -> a mistake made by Software dev or a misconception
- Fault/Defect/Bug -> manifestation of an error in the software or its documentation เป็นผลของ human error ที่ dev สร้างขึ้น , is a result of error

#### Testing Objectives
- To design tests in order to uncover different classes of error with minimum amount of time and effort
- Testing cannot show the absence of defects it can shows that software errors are present -> สามารถรู้ได้ว่ามี bug แต่ไม่สามารถ guarantee ได้ว่าไม่เหลือ bug อยู่แล้ว

#### Who tests the software
- Developer -> Understand the system but will test gently and is driven by delivery
- Independent Tester -> must learn about system , will try to break , driven by quality

#### Level of testing
- V model

#### Test Case Design
- White Box Testing ->  การสร้าง testcase base ตาม code
- Black Box Testing -> เสมือนกับว่าระบบเราเป็นกล่องเรา เราไม่เห็นเลยว่า code เราเขียนยังไง ไม่ต้องไปดู code แค่ test ไปเลย ไม่ได้ gen testcase ตาม code แต่ gen ตาม specification

#### White Box
- ***Test cases are derived so that*** -> แปลว่าเราดู control structure พวก logic ใน code เช่น if else for while แล้วเอามาเขียน test case base ตามนั้น (derive)
	- All statements are exercised -> ทุก statement ต้องถูกทดสอบ
	- logical decisions (true / false) are exercised -> ทุก Logic ถูกทดสอบ
	- independent paths are exercised at least once -> แต่ละ flow แต่ละทิศทางถูก execute อย่างน้อยหนึ่งครั้ง
- ***Coverage criteria***
	- Statement coverage -> ทุก statement ต้องถูก execute อย่างน้อยครั้งนึง , code ทุก line ถูกทดสอบ 100%
	- Branch coverage -> ทุกๆ T และทุกๆ F ของทุก decision ต้องถูกทดสอบอย่างน้อยหนุงครั้ง -> 100% branch coverage
	- Path coverage -> ทุกๆ control flow path ทั้ง program ถูก execute อย่างน้อยหนึ่งครั้ง
	- Path coverage > Branch coverage > Statement coverage
- ***Control flow notation***
	- circles (nodes) -> program statement
	- arrows (edges) -> flow of control 
	- region -> bounded by edges and nodes
- ***McCabe's Cyclomatic Complexity (C)
	- Edges -> เส้นบนกราฟ
	- Nodes -> วงกลม
	- C = /#edges - /#nodes + 2
	- C = /#regions + 1
	- C -> independent paths
	- will put lowerbound (>=) of independent path , must move along at least one edge that has not been traversed before path is defined) อย่างน้อยต้องมีซัก edge ที่ไม่เคยถูก traversed มาก่อนเลย

#### Black Box (Functional Testing)
- inputs , outputs
- requirements , events
- Domain , Range of input & output
- focus on functional requirements of software
- tester develop input condition ที่ทดสอบทุกๆ functional requirement
- ไม่ใช่ alternative ของ white box และควรทำด้วยกัน
- incorrect or missing function can be found
- ใช้ equivalence classes partitioning , boundary value analysis และ decision table เพื่อสร้าง test cases
- ***Input equivalence Classes Partitioning***
	- แบ่งทุก set input domain เป็น subset ย่อย คือ equivalence classes
	- แล้วเลือกตัวแทนมาตัวนึงทำหน้าที่แทน set นั้น success ของตัวที่เลือกมานั้นต้อง หมายถึงตัวอื่นจะ success ด้วย
	- equivalence class represent set ของ valid / invalid state สำหรับ input condition
- ***Boundary Value Analysis***
	- Programmer ชอบเขียนผืดที่ค่าขอบ เลย ควร test ค่าขอบ
	- โดย test value ดังนี้
		- min-
		- min
		- min+
		- nom
		- max-
		- max
		- max+
- ***Decision Table***
	- เป็น truth table T/F -> ใช้ออกแบบ tc
	- ในกรณีที่มีเงื่อนไขซับซ้อน

### Software Testing Steps 
---
Unit test -> Integration test -> High order test
code -> design -> requirement

Unit testing -> interface , local data structure , boundary พวก code
Stub's complexity
Integration testing -> ทำได้ 2 แบบ 
	- Incremental approaches
		- Top-down -> มีแบบ bfs / dfs
		- Bottom-up
	- Non-Incremental 
		- Big-bang

### System Testing
---
- Starts after integration
- Ends when successfully determined system capabilities , have identified and corrected problems , confidence that system is ready for acceptance 

### Components of System Testing
---
- Requirement based functional tests
- Performance capabilities 

### Requirement-Based System Test
---
- to demonstrate that all functions are available
- test case มาจาก requiremnt , exercise ทุก functions , classes of output , system status
- valid input data -> accepted
- invalid input data -> rejected (without system failure ซึ่งเป็นไปตามระบบ)
- test ว่า system สามารถคุยกับ system อื่นได้ เช่น test api
- ต้องการ systematic coverage -> functional coverage matrix
- coverage matrix ไม่เหมือน unit-testing
- เรากำลัง planning test สำหรับโปรแกรมไม่ใช่แค่อันเดียว

### Requirement Validation Matrix
---
- เป็น matrix สำหรับ requirement กับ test cases
- เพื่อจัดระเบียบทุกๆ requirement และรับประกันว่า tests เจาะจงสำหรับทุกอัน
- matrix มีทุกๆ requirement และ refer ไปหา test cases หรือ situations ที่ถูกสร้างเพื่อนำมา test ตัวมัน

### Performance Capability Tests
---
- ตรวจว่าระบบเป็นไปตาม response time ที่กำหนดไหม
- ด้วยการทดสอบแบบ normal load (load ปกติทั่วไป)

### Stress or Volume Testing
---
- เหมือนอันก่อนแต่ทำเยอะๆ ให้ระบบมัน break เพื่อหา limitation

### Recovery and Security Testing
---
- ดูว่าการ recovery กลับมาถูกไหม แล้ว resume process ได้ถูกต้องตามหลักไหม
- เทส security ด้วย

### Acceptance Testing
---
- เทสก่อนการส่งมอบงาน เพื่อ insure ว่า software ready
- ทำหลัง system test complete
- test cases เป็น subset ของ system test
- based on functionality and performance requirements
- typical day transactions
- เอาระบบเก่ามารันด้วย เพื่อดูว่าเหมือนกันไหม
- ต้อง test ใน hardware ของ user
- รันแบบ full cycle

### Alpha Test
---
- ทำใน dev's site
- เชิญ user
- dev คุยกับ users
- record erros and usage problems

### Beta Test
---
- ทำใน customer's site
- dev ไม่ค่อยเกี่ยว
- user เก็บ record และ report problems  , dev แก้ แล้วค่อยปล่อย

### Regression Test
---
- ทำเมื่อมีอะไรเปลียนไป


