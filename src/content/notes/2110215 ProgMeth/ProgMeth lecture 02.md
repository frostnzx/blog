
Date: 2025-01-15
Tag: #2110215-progmeth 

## Inheritance & Composition

#### Creating new class
---
- From scratch
- From existing class (reuse)
	- Inheritance --> extend จากของเก่า
	- Composition --> ให้ class ใหม่มี instant variable ที่เป็น type ของ class เก่า

#### Inheritance
---
- reuse methods and data
- tells that one data type is also another data type
Base class 
- Use as a basis for inheritance
- Ex. student
Derived class
- Inherit all ***non-private member*** from base class
- always have "is a"  case or example of more general base class
- Ex. UndergratStudent , GraduatedStudent
UndergratStudent and GraduatedStudent are also student
ทุกคลาสจะมี Superclass ได้แค่คลาสเดียวไม่เหมือน c++

#### Up/Down Casting
---
```java
// upcasting (auto)
Student s1 = new GraduateStudent("Nat");
s1.printName();

// downcasting (manually) - may have problem
Student s = new Student("Luck");
UndergraduateStudent s2 = s ; 
// casting ด้านขวาต้องเรียก method ของด้านซ้ายได้ทุกตัวถึงจะไม่ error
```

#### Keyword Super
---
- เข้าถึง method / attribute ของ superclass ซึ่งเป็น field ที่ถูก hide ไว้ (ถูก override)

```java
class Vehicle1 {
	int speed = 50;
}
class Bike1 extends Vehicle1 {
	int speed = 100;
	void display() {
		System.out.println(super.speed) // will print 50
	}
}
```

#### Protected
---
- Can be use within own class or in any class extended from it
- Cannot be used by outside classes
- in UML is #

#### Methods You Cannot Override
---
- static methods
- final methods
- Method within final classes
	- cannot be superclasses 

#### Instance creation mechanism and default constructor
---
ขี้เกียจเขียนอธิบาย ไปดูตัวอย่างใน lecture02 inheritance02
#### Static constraints
---
- ใน function static เราไม่สามารถใช้ variable ธรรมดาได้ เพราะเวลาเราเรียก function static เราไม่ได้ new instance ขึ้นมาใหม่ดังนั้นเราก็จะไม่มีการสร้าง variable ธรรมดาขึ้นมา
- ถึง child class จะไม่ได้ inherit static method ของ parent มา
	- แต่สามารถใช้้ static method ของ parent ได้ ด้วย -> SuperclassName.method()
- ไม่สามารถ overwrite static method ได้ แต่สามารถสร้าง static method ขึ้นมาใน child ให้ชื่อเหมือน static method ของ parent ได้
- เวลาเรียกจะดูแค่ประเภท object, polymorphism ไม่ apply กับ static

#### Dynamic method Binding
---
```Java
Student s ; 
GraduateStudent g = new GraduateStudent("Nat");
UndergraduateStudent u = new UnderGraduateStudent("Toey");

// This is called Dynamic binding, as the compiler will never know
// which version of printName() is going to called at runtime.

s = g ; 
s.printName();
s = u ; 
s.printName(); 

// Output :
// --------
// GraduateStudent [Nat]
// UndergraduateStudent [Toey]


// more about how java decide to run method (dynamic binding)
Student a = new GraduateStudent("jeen");
a.printName();
// 1. java will check if class Student (class on the left side) has method
// called printName if so it passed the first check
// 2. after that, java will run method called printName in an actual data block 
// that was created by "new" keyword on the right side
```

#### Creating Arrays of Subclass Objects
---
- สามารถเก็บค่าของ subclass ที่ derived มาจาก superclass ชนิดเดียวกันใน array เดียวกันได้
```Java
Animal[] ref = new Animal[3];
// Reserve memory for three Animal object references (*reference not object*)
```

#### Instanceof
---
```Java
// B is derived from A
A x = new B();
if(x instanceof B) {
	System.out.println("x is B");
} else if(x instanceof A) {
	System.out.println("x is A");
}
// it will print out "x is B"
// if you check A first it will print out "x is A" because "instanceof" 
// can satisfy when it's their parent class
// so write subclass before parent class
```

#### getClass()
---
```Java
// B is derived from A
A x = new B();
Class xClass = x.getClass();
if(xClass.equals(A.class)) {
	System.out.println("x is A");
} else if(xClass.equals(B.class)) {
	System.out.println("x is B");
}
// it will print out "x is B"
```
