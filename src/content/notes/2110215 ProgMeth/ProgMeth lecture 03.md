
Date: 2025-01-23
Tag: #2110215-progmeth 

## Abstract classes

- Class แม่ที่เราให้เป็น template class
- ซึ่งมันมีข้อมูลไม่ครบถ้วน แต่เป็นต้นแบบให้กับ class ลูก ที่จะนำไป implement ต่อให้ครบถ้วน

```Java
public abstract class MyAbstractClass {...}

MyAbstractClass myClassInstance = new MyAbstractClass();
// not valid เพราะ เป็น abstract class
```

- มีการ define abstract method -> บังคับให้ class ลูก ที่มา extend ต่อจะต้อง overwrite abstractmethod ตัวนี้
```Java
public abstract void abstractMethod();
// ห้ามมี body และ {} เด็ดขาด
```

#### Using the "object" class
---
- เป็นแม่ของทุกๆ class ใน java
- พวก method equals , getClass , toString จะแอบถูก extend มาจาก class object
- อยู่ใน java.lang.package (ไม่ต้อง import เพิ่มเติม)

#### The equals() method
---
สมมุติเขียน equals ใน class Employee ก็ไม่ควรที่จะรับ Employee เข้ามา, แต่ควรรับ Object เข้ามาแทน

```java
Public boolean equals(Object o) {
	// step 1 --> by data type and null
	if(this == o) return true ; 
	if(o == null) return false ; 
	if(o.getClass() != this.getClass()) return false ; 
	// step 2 --> own rules
	Employee other = (Employee) o ;
	if(this.employeeId != other.employeeId) return false;
	if(! this.firstName.equals(other.firstName)) return false ;
	if(! this.lastName.equals(other.lastName)) return false  ;
	return true ;  
}
```

#### Clone() method
---
- เพื่อสร้าง object จาก object ที่มีอยู่แล้ว
- aCloneableObject.clone()
	```java
	x.clone() != x
	x.clone().getClass() == x.getClass()
	x.cone().equals(x)
	// all of this return true
```
- การที่เราจะทำให้ object ใน class .clone() ได้, เราต้องสร้าง interface cloneable
```Java
public class Stack implements Cloneable { // <--(1)
// ... for Stack's method and constructor

protected Object clone() { // <--(2)
	try {
		Stacks = (Stack)super.clone();
		s.items = (Vector)items.clone();
		return s;
	} catch (CloneNotSupportedException e) { // <--(3)
		throw new InternalError();
	}
}
```

#### Copy constructor (better than clone)
---
```Java
// default constructor
public A4(int i) {
	this.x = i ; 
}
// copy constructor
public A4(A4 other) {
	this.x = other.getx();
}
```

#### Finalize() method
---
- ถูกเรียกก่อน garbage collected, เรียก finalize() ก่อน ก่อนที่จะ release system resource
- แต่จริงๆใน java จะแอบ garbage collect อยู่ตลอด, ทำให้ถ้าเขียน finalize แบบไม่ดีจะส่งผลต่อ performance เป็นอย่างมาก
- ถูก deprecate ไปแล้ว
```java
protected void finalize() throws Throwable {
	super.finalize();
	if(aFile != null) {
		aFile.close();
		aFile = null ; 
	}
}
```




