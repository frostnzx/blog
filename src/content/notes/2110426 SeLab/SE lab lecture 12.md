
Date: 2025-04-24
Tag: #2110426-selab 

#### Design for security
---
##### 1. Reject unexpected form input
- Untrusted input -> ต้องไม่เชื่อถือ input เอาไว้ก่อน , บางคนสามารถ markup ได้ก่อนส่งมา server , อาจใช้ cli พวก curl ส่งมา , บางคนอาจถูกหลอกให้ใช้หน้าเว็ปปลอม
- *จะมีปัญหาหรือไม่ขึ้นกับ logic ของเรา*
###### Input validation
- bad input -> ทำระบบพัง , ค่านอกช่วง , trigger fault , โค้ดให้ฝั่ง server ไปลบข้อมู,
- ถ้า input fail ทำไงดี -> reject ไปเลย ไม่ต้องบอกว่าทำไม เดี๋ยว hacker เดาได้ แต่เก็บ log ไว้ด้วย
- negative validation หรือ blacklisting -> ค่าข้อมูลแบบไหนอันตรายก็ไม่รับทั้งหมด , เขียน test ให้ครอบคลุม , built in validation ก็ควรนำมาใช้
- สรุป ถ้าทำ whitelist ได้ให้ทำ ถ้าไม่ได้ blacklist , contract จำกัดที่สุด , มีการแจ้งเตือนเมื่อเหมือนจะถูกบุกรุก 
- หลีกเลี่ยงจะสงinput กลับไปยังผู้ส่ง , ปฎิเสธ bad input ให้เร็วที่สุด

##### 2. Cross site scripting (XSS)
---
- hacker หลอกล่อให้ผู้ใช้กด link ปลอม , รัน code อันตรายโดยไม่รู้ตัว โดยแอบขโมยข้อมูลสำคัญของผู้ใช้ไป
- XSS type
	1. Reflected XSS attack -> hacker ส่ง code อันตรายไปผ่าน query เป็นส่วนหนึ่งของ URL , โดย URL นี้ถูกส่งไปผ่านช่องทางต่างๆ email , social media , 
		- เมื่อผู้ใช้กด URL นั้น , script ที่ถูกฝัังอยู่กับ URL ก็จะ execute ที่ browser ในอุปกรณ์ของผู้ใช้
		- EX. 
```
ผู้ใช้ค้นข้อมูล -> ".../search?q=greencurry" , 
ระบบส่งกลับ -> <p>Search Term: greencurry</p>

แต่ถ้า hacker ทำ
hacker ค้นข้อมูล -> ".../search?q=<script>*some malicious script*</script>g"
ระบบส่งกลับ -> <p>Search Term: <script>/*some malicious script*/</script></p>

```
- ถ้า ระบบเรา validate input ก็จะลดโอกาสที่จะเกิดเหตุการณ์นี้ได้
	2. Persistent XSS attack -> ฝังอยู่ , ไม่ได้หายไป
		- hacker เจอช่องโหว่ใน server เลยส่ง code อันตรายมาฝังไว้เลย 
		- เช่น hacker พิม comment เป็น script ก็จะถูกส่งลง DB
		- code อันตรายถูกรันโดย web browser
		- ถ้ามีการตรวจ input ก่อนก็จะไม่สามารถ comment แบบนี้ได้
	3. DOM based XSS attack -> เป็นฝั่ง frontend
		- DOM เป็น interface จัดการ HTML
		- hacker เพิ่ม code อันตรายไปใน page ได้
		- ส่ง frontend -> browser แต่ระหว่างทางโดนแก้ไข
		- ต้องป้องกันฝั่ง client
		- ป้องกันโดย escape any untrusted data & sanitize HTML
		- sanitize -> script เป็น string (clean จาก script เป็น text ให้หมด)
		- ใช้ CSP
		- การ automate test XSS ใน build pipeline
- CSP :
	- เซ้ตที่ http response header
	- บอก browser ว่าให้โหลด resource เฉพาะจาก same origin
	- บอก browser ให้โหลด image จาก same origin หรือจาก example.com

##### 3. Encode HTML ouput
- การ render markup (HTML) ที่ไม่ถูกต้องเป็นสาเหตุหลักที่ทำให้ *ไม่ปลอดภัย*
- web content มีทั้ง html , css , script และ มีการ execute content ซ้อนๆกัน โดยม่ีการ embed url เข้ามา หลายๆชั้น
- render จากแหล่งไม่น่าเชื่อถือ
- Output encoding
	- ก่อนส่งข้อมูลออกต้อทำให้เป็น finished version , มีการ encode อักขระต่างๆ
```
***OUTPUT ENCODING***

HTML
<p> The Honorable Justice Sandra Day O'Connor </p>
ผลการ render
The Honorable Justice Sandra Day O'Connor

hacker จะไปใส่ตรงหลังทีี่ไม่ได้ escape character
```
- ถ้าเป็น dynamic ui ก็ไม่สามารถ encode ให้เหมาะสมได้ แต่ framework  สมัยใหม่มีการ render content อย่างปลอดภัยแล้ว

- Cautions and caveats 
	- เลือก framework ที่มี doc เกี่ยวกับ safe output functions
	- ระวังมัน render pdf หรือ js ไม่ได้
	- เลี่ยง nested context
	- OWASP
- Summary 
	- ส่งข้อมูล framework ที่ถูกต้อง
	- ถ้ามี framework ที่หนับหนุนการเข้ารหัสให้ถูกก็ใช้ไปอย่า turn off
	- เลี่ยง nested rendering context
	- ไม่ใช้ framework ที่ไม่ปลอดภัย

##### 4. Bind parameters for database queries
- SQL injection -> inject sql เข้าไป
- ใช้ parameter binding ยังไง
	- เป็นวิธีแยก executable code อย่าง sql ออกจากส่วนที่เป็น content
		- เช่น VALUES (? , ?)  ; stmt.setString(1 , lastName);
- Stored procedure ป้องกันได้ไหม ? ไม่ได้ เพราะถ้ามี string concatenate จะแตก
- ORM บางตัวก็ไม่ช่วยถ้าไม่ทำ parameter binding
- mongoose ก็มีโหว่ คือ $where
- Blind and Nonblind SQL injection
	- Nonblind -> เมื่อใส่ inject ข้อมูลเข้าไปแล้ว ปรากฎมี constraint primary key พอ insert เข้าไปดันบอกออกมา ทำให้ hacker รู้ เช่นลองใส่ email ไป แล้วมันบอก this email address already exist in users table 
	- ควรทำไงดี ?
	- ให้มันแค่บอก unexpected error พอ
- File upload vulnerabilities -> ไฟล์ที่ upload มาก็อาจจะไม่ใช่ image ก็ได้ , อาจะเป็น script
	- วิธีแก้ 
		- Host file บน secure system เช่น CDN , cloud storage
		- เช็คให้ชัวร์ว่า uploaded file ไม่สามารถ execute ได้
		- validate content ของ ไฟล์ที่ upload มา
		- รัน antivirus
- Summary
	- เลี่ยง SQL หรือ NoSQL จาก input ของ user
	- ทำ parameter binding ตลอด
	- ใช้ native driver binding function แทนที่จะ encode เอง
	- อย่าคิดว่า stored procedure หรือ ORM จะกันได้ ต้องทำ parameter binding เลี่ยง string concatenation
	- NoSQL กันการ injection ไม่ได้ 100%

##### 5. Protect data in transit
Can we trust connection -> ไม่
1. Use HTTPs
	- คือ secure http protocal มี s มาด้วย (secure)
	- ถ้าใช้แค่ HTTP เสี่ยงหลายอย่าง
		- แอบดูระหว่างทาง
		- ขโมย session หรือข้อมูลส่วนบุคคล
		- man-in-the-middle
		- ถูกเพิ่ม code ไม่ดีให้ browser เอาไปรัน
		- Free wifi โดยส่งโฆษณาเพิ่มเข้ามา
	- HTTPS and transport layer security
		- HTTPS เพิ่ม security โดยเพิ่ม protocal เช่น TLS (Transport layer security) โดยพัฒนาจาก protocal SSL (Secure socket layer)
		- https://www.youtube.com/watch?v=j9QmMEWmcfo
	- Get a server certificate -> ต้องทำ certificate ก่อนในการทำ https เพื่อใช้ tls
		- เป็นการยืนยันว่าเป็นเว็ปนั้นจริงๆ
		- client ไม่รู้จัก cert ของเว็ปนั้นมาก่อน client ก้ต้องหาทาง verify ว่าเชื่อไ้ไหม
		- ปกติจะใช้บริการจาก Certificate Authority (CA) เป็น third party
		- CA มีหลายระดับ
			- Domain validation (VA)
			- Organization Validation (OV) -> โดเมนนี้เป็นของ บริษัทนี้
			- Extended Validation (EV)
			- VA ถูกสุด
	- Configure your server -> ก็ทำ TLS ที่ server เซตนู่นนี่ให้ใช้ TLS ทุกๆ incoming หรือ out ต้อง encrypt
	- Use HTTPS for everything -> ให้ใช้ https ในทุกๆหน้า ถ้าใช้บ้างไม่ใช้บ้างหน้าที่เป็น form ก็จะถูกเจาะโดย man-in-the-middle โดยเปลี่ยนค่าในฟอร์ม
	- Use HSTS -> ห้าม request มาจาก http ต้องมาจาก https เท่านั้น หรือ third party ก็ต้องเป็น https เท่านั้น , ทุกๆการพูดคุย
		- enable HSTS ต้องแน่ใจก่อนว่าเป็นของเราทุกอย่างเข้าได้ด้วย https จริงๆ อาจะทำ proxy
	- Protect cookies -> browser มี builtin security เลี่ยงไม่ให้คุกกี้ที่มีข้อมูลอ่อนไหวถูกอ่านโดยมทือที่สามได้ , เซตให้ส่ง cookie ให้เฉพาะ HTTPS
	- Prevent caching of sensitive data , -> ไม่ให้ cache อะไร (set ที่ http header เหมือนเดิม) , no-store -> ไม่ cache เลย แต่ no-cache -> คือ cache ไว้แต่ตอนใช้ต้องมาถาม user , must-revalidate -> ใช้ได้ถ้า younger กว่า max age
	- Other risks -> ดูใน OWASP
	- Verify configuration 
		- หลังติดตั้ง SSL / TLS ให้ server ทดสอบด้วย
		- ลองใช้ immuniweb และ พวก ตัวเทส
		- SSLtest ทุกเดือน
	- Summary
		- HTTPS ทุกอย่าง
		- HSTS ถ้าพร้อม
		- ตัองมี certificate จาก CA ที่ไว้ใจได้
		- เก็บ private key ให้ดี
		- ใช้ configuration tool เพื่อติดตั้ง HTTPS
		- อย่าลืม secure flag , HTTPOnly flag เป็นต้นใน คุกกี้
		- อย่าทำข้อมูลสำคัญรั่วทาง URLs 
		- ตรวจ SSLTest ทุกเดือน
##### 6. Hash and salt
- เก็บ pw ที่ hash แล้ว ห้าม plain text
- salt คือ -> string ที่เอาไว้ hash เพิ่ม length & uniqueness
- OWASP แนะให้ salt 32 หรือ 64 bit
- NIST ให้ 128 bit
- สามารถใช้ UUID ได้เลย แต่ถึงจะ gen ได้ง่ายก็มี cost ในการเก็บมากกว่า
- ใช้แค่ scrypt , bcrypt , argon2id อันอื่นอย่าใช้ (เก่า)

##### 7.Authenticate users safely
- Authentication -> ใช่ตัวจริงไหม
- Authorization -> ทำได้ป่าว
- 2FA
- Single Sign-On (SSO)
- OAuth2 -> มาตรฐานเปิดของ authorization (ใช่ทำ SSO ได้)
- OpenID Connect (OIDC) -> อนุญาตให้ app authenticate user (ส่งมาจาก google เป็นต้น)
- Refresh token (ของ OAuth2) -> เช็คว่าถ้า access token expire ตัว refresh token จะไปขอ access token ใหม่

##### 8.Protect user sessions
- OWASP บอกว่า session id อย่างน้อย 128 bit (16 byte) สร้างจาก pseudorandom number generator
- don't expose session identifier
	- ใช้ HTTPS ป้องกันใครมาแอบดักดู session id
	- อย่าส่ง link ผลการ search ไปให้คนอื่น อาจมี session id อยู่
	- บางครั้ง session id ก็ถูกส่งเป็นส่วนหนึ่งของ HTTP header หรือไม่ก็ใน body ของ POST ส่งผ่าน cookie ดีกว่า
	- เช็คให้ชัวร์ว่า session id ไม่ถูกเปิดผ่าน URLs , logs , ผ่านลิงค์

##### 9.Authorization actions
- Authorize on the server -> บางคนเขียน app โดยที่ส่งไป fe ทุกอย่าง , แล้วเช็คเงื่อนไขบน client แทน
- Deny by default -> authorization denied ไว้ก่อนเสมอ
- Use policy to authorize
	- RBAC (role based access control) -> แต่ละ acc มี role อะไรบ้างและแต่ละ role ทำไรได้ เหมือน discord
	- ABAC (attribute based access control) -> ไม่ได้แยกแค่ role แต่แยก role admin ทำได้ไม่เท่ากัน เป็นการระบุ attribute


