
Date: 2025-01-10
Tag: #2110215-progmeth 

## OOP

Class -> non-primitive data type
Object -> created from class
- Encapsulation (Lecture 1)
- Abstraction (Lecture 2)
- Inheritance (Lecture 3)
- Polymorphism (Lecture 4)


#### Encapsulation
---
Local operation ควรซ่อนจาก user แล้วยอมให้ user access ได้เฉพาะสิ่งที่จำเป็นเท่านั้น การซ่อนส่วนที่ไม่จำเป็นจาก user เรียกว่า access modifier (public , private , protected)

#### Abstraction
---
การทำ template ในการแชร์ code ที่ common เช่นการสร้าง abstract class มาเป็นตัว template 

#### Inheritance
---
สร้าง subclass จาก class ที่มีอยู่แล้วเป็น class ลูก
เช่น Class Vehicle -- (inheritance) --> Class Car
แล้วทุก Car จะเป็น Vehicle แต่ Vehicle ไม่จำเป็นต้องเป็น Car

#### Polymorphism
---
Same code but different action
Object ต่างประเภทกันสามารถทำ method เดียวกันแล้วกระทำต่างกันได้
เช่นสั่ง animal.speak() ก็จะแล้วแต่ว่าเป็นสัตว์ประเภทไหนถ้า Dog ก็ Woof ถ้า Cat ก็ Meow

#### New
---
การจองเนื้อที่ใน Memory เพื่อใช้สำหรับในการเก็บ object

```java
SimpleDice diceA = new SimpleDice(1);
SimpleDice diceB ;
// pointer diceA จะมีการ point ไปที่ memory ที่มีการจอง
// แต่ pointer diceB จะไม่ point ไปที่ไหนเพราะยังไม่ได้ new เพื่อจอง
diceB = diceA ; 
// pointer diceB จะชี้ไปที่ diceA ใน address เดียวกันใน memory
```

#### Method Overloading
---
A class can have more than one method with the same name
Method signature - name + argument list
- add(int m , int n) -> add(int , int)
- add(int a , int b) -> add(int , int)
- add(int x , int y , int z) -> add(int , int , int)

#### Constructor
---
- ต้องมีชื่อเดียวกับชื่อ class 
- สามารถมีหลายตัวได้แต่ method signature ห้ามซ้ำ
- ไม่ต้องมี return type

#### Keyword 
---
- this -> ตัว class ตัวนี้
- final -> ห้ามแก้ไขค่าเด็ดขาด
- static -> belong to class not belong to object

#### Package
---
folder หรือ collection ที่ใช้เก็บ class ที่มีการทำงานคล้ายๆกันหรือในกลุ่มเดียวกัน
```Java
package com.chate.shapes;
public class Oval {
	//...
}

package com.chate.shapes;
public class Rectangle {
	//...
}

Folder structure 
================
Com
	---- chate
			--- shapes
					--- Oval.class
					--- Rectangle.class
```

#### Access modifier
---
- Private --> ใช้ได้เฉพาะใน class
- Package (default) --> ใช้ได้เฉพาะ class ที่อยู่ใน folder package เดียวกันเท่านั้น
- Protected --> อนุญาตให้ class ลูกใช้ได้
- Public --> ใช้ได้หมด

#### Class 
---
1) properties, fields
2) methods, actions
- constructor
- getter & setter
- toString()
- equals()
- my own method, e.g

## Coding style

#### Naming
---
- Class name : Singular noun begins with ***Uppercase*** letter
- Method name : Verb begin with ***Lowercase*** letter
- Variable name : Noun begin with ***Lowercase*** letter
	- For boolean variables, use isXXX or hasXXX
- Constant : Noun with all ***Uppercase*** letter
	- double PI , MAX_SPEED

#### Conditional
---
- if(booleanVariable == true) -> if(booleanVariable)
- if-else can be used instead of series of if's
- use .equals() to compare string/reference not ==

#### Class
---
- use get/set for private fields
	- ***Do not use public field***
- prepare constructor(s)
- don't forget to write equals(), toString()

#### Method
---
- smalll, should be < 20 lines
	- refactor to other private methods if it is long
- make your method perform only one task
- avoid duplicated code

#### Indent style
```java
// preferred
if(x < 0) {
	negative(x);
} else {
	nonnegative(x);
}

// Not like this
if (x < 0)
	negative(x);

// Also not like this
if (x < 0) negative(x);
```

## UML 
- UML is a modeling language created to standardize way to visualize design of the system
- UML has many diagrams to represent various things in the system
- ***Class diagram*** is a UML model that describe the structure of a system by showing the classes attributes and relation between classes or objects

#### Class Diagram
---
- UML provides mechanic to represent class member, such as attributes and methods, and additional information about them

Visibility
- public + (วงกลม)
- protected # (สี่เหลี่ยมข้าวหลามตัด)
- private - (สี่เหลี่ยม)
- package ~ (สามเหลี่ยม)
Static
	มี S ที่ตัวแปรเป็น static

## Exception Handling

#### Common Errors by Java programmers
---
- Syntax error
- Logical error (Exception) (fixable)
- Status of environment (serious problem)

#### Exception
---
- ERROR --> ปัญหา serious เกินความสามารถ programmer 
- EXCEPTION --> ปัญหาที่ serious น้อยลงมาหน่อย สามารถ try/catch or throw
	- Unchecked Exception  --> ไม่จำเป็นที่จะต้องแก้ไข เพราะไม่ตรวจสอบตอน compile 
	- Checked Exception      --> ต้องแก้ไขไม่งั้น compile ไม่ผ่าน
- Throw --> ถ้ามี error ที่เขียนที่ throw ตัว caller จะ aware และส่งต่อไปพูดง่ายๆคือการโยนต่อ คือถ้าไม่ใช้ try catch ในตัว method นี้ก็ให้ throw ออกไปให้ method ที่ call ตัวนี้จัดการแทน ถ้าถึง main แล้วยัง throw อยู่ jvm ก็จะ print error ออกมา




