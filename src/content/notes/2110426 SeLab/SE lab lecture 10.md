
Date: 2025-04-22
Tag: #2110426-selab 

#### Docker
---
- เป็น software ที่ทำให้เรา package software ของเราเพื่อ run ใน any hardware
- dev สร้าง *image* , package software จาก *dockerfile* และ run instance ของ image นั้นใน *container*
Dockerfile -> ระบุว่า file ที่เราจะ package software ของเรา , 

#### Build microservices with Docker
---
- docker network create -d bridge my-net -> สร้าง virtual network สำหรับเชื่อม container
- docker images -> list images ในเครื่องเรา
- docker system prune -> อันตราย เพราะมันจะลบทุกอย่าง ยกเว้นพวก container ที่รันอยู่
- docker build -t users_service_db . -> สร้าง docker image
- docker volume create -> สร้าง volume (mount disk ของ local host กับ storage ของ container)
- docker run -p 6002:3306 -v docker_practice: /var/lib/mysql ...... -> run image ด้วย port ได้หลากหลาย port (host port)
- Hypervisor -> Parallel desktop , vmWare , ...
- docker exec -it db1 -> shell เข้าไปหา container 

docker build -> สร้าง image
docker pull -> ดึง image มาจาก global repository
docker run -> instantiate container ของ image
docker scout -> ดู vulnurability , ดูองค์ประกอบ layer และ layer ไหนบ้างมีความเสี่ยง


#### CI/CD
---
CI -> รวมปุ๊ปเทสปั๊ป
CD (Continuous delivery) -> ต้องมีคนมา approve ก่อน deploy
CD (Continuous deployment) -> ไม่ต้องมีคนมา approve ก่อน deploy

CALMS framework
- C -> Culture
- A -> Automation
- L -> Lean -> ปรับปรุงอย่างต่อเนื่อง
- M -> Measurement -> การวัดผล
- S -> Sharing -> การแบ่งปันการรับผิดชอบ

DORA metrics
- ช่วยให้เห็นว่าเราปล่อยของได้บ่อยแค่ไหน -> Deployment frequency
- มีปัญหาเกิดขึ้นใช้เวลาแค่ไหนถึงจะกลับมาปล่อยได้ -> Mean time to recovery

Github Action
- Platform CICD มากับ github สร้าง workflow อัตโนมัติในการ build , test , deployment ง่ายๆ กำหนดได้เลยถ้ามีเหตุการณ์เกิดขึ้นมีคน push ใหม่อะไรใหม่ก็ให้มันทำตามใน yaml
- มี Action สำเร็จรูปใน marketplace เยอะมาก (S -> sharing ใน CALMS)
- ส่วนประกอบ
	- Events
	- Jobs
	- Steps
	- Actions
	- Runners