
Date: 2025-01-31
Tag: #2110215-progmeth 

## Interface

- มองว่า class ต่างๆมีความสามารถหรือ interface behavior ได้หลายตัว
- มันคล้าย abstract แต่มันจะถูกใช้เพื่อกำหนด behavior ของ object
- Usage
	- ประกาศด้วย interface keyword
	- คลาส implement interface 
	- ไม่สามารถ instantiate interface ได้
- ทุก field ที่อยู่ใน interface เป็น constant และ public โดยอัตโนมัติ (เป็น public static final)
- ทุกๆ method ที่อยู๋ใน interface เป็น abstract และ public  , ดังนั้น class ลูกต้อง override method ให้ครบทุกตัว
- interface ไม่สามารถ extend จาก class แต่ extend จาก interface ได้

```Java
public interface Shapable {
	// public static final
	String LABLE = "Shape" ; 

	// public abstract
	void draw();
	double getArea();
}

public class Rectangle implements Shapeable {
	private double width ; 
	private double height ; 
	public Rectangle(double w,double h) {
		this.width = w ;
		this.height = h ; 
	}
	// overrided the interface
	public void draw() {
		System.out.println("Drawing Rectangle");
	}
	// overrided the interface
	public double getArea() {
		return this.height * this.width ; 
	}
}
public class Circle implements Shapeable {
	private double radius;
	public Circle(double r) {
		this.radius = r ; 
	}
	public void draw() {
		System.out.println("Drawing Rectangle");
	}
	public double getArea() {
		return Math.PI * this.radius * this.radius ; 
	}
}

// เราสามารถเรียกใช้ class ทั้งคู่เป็น Shapeable ได้
// ถึงจะ instantiate interface ไม่ได้ แต่เราประกาศตัวแปรมันได้

public static void main(String[] args) {
	Shapeable shape = new Circle(10);
	Shapeable shape2 = new Rectangle(10 , 10);
	shape1.draw();
	shape2.draw();
}
```

- ข้อยกเว้น -> ถ้า implement interface จาก abstract class ไม่ต้อง override method ทั้งหมดก็ได้


```JAVA
public class Car extends Vehicle implements Turnable , Movable {}
// แปลว่า 
// Car "is a" Vehicle
// Car "is able to" Turn and Move
```

#### Interface extends Interface
---
```Java
public interface Turnable {
	void turnLeft();
	void turnRight();
}
public interface Movable {
	void forward();
	void backward();
}

interface Relocatable extends Turnable , Movable {
...
}
```

#### Polymorphism
---
- Same code different action
- Early binding : รู้ผลลัพธ์ในช่วง compilation time
- Late binding : รู้ผลลัพธ์ในช่วง runtime

```Java
// BAD CODE
public void uTurn(Car c) {
	c.turnRight();
	c.turnRight();
}
public void uTurn(Human h) {
	h.turnRight();
	h.turnRight();
}

// GOOD CODE
public void uTurn(Turnable m) {
	m.turnRight();
	m.turnRight();
}
```



## Common Java Interface

#### Iterator
---
- iterator interface ใน java.util ใช้กับ collections

```Java
myShapes = getSomeCollectionOfShapes();
Iterator itr = myShapes.iterator();
while(itr.hasNext()) {
	Shape s = (Shape) iter.next(); // downcast
	s.draw(); 
}
```

#### Comparable
---
- อยู่ใน java.lang
- return negative , zero , positive int สำหรับถ้า object นี้ น้อยกว่า , เท่ากับ , มากกว่า ตามลำดับ
- มีประโยชน์ก็ต่อเมื่อสมมุติเราจะใช้ Arrays.sort(myClass) ถ้า myClass เราไม่ได้กำหนด compare function เราก็จะไม่สามารถ sort ได้, เพราะ sort มันใช้้ compare 

```Java
public class Fruit implements Comparable<Fruit> {
	...
	public int compareTo(Fruit compareFruit) {
		int compareQuantity = ((Fruit) compareFruit).getQuantity();
		if(this.quantity > compareQuantity)
			return 1 ; 
		else 
			return -1;
	}
}
// เอาจริงๆไม่ต้องมี <Fruit> ก็ได้ แต่ compareTo ต้องรับ Object
```

#### Cloneable
---
- การสร้าง object ขึ้นมาใหม่แล้ว copy properties ต่างๆเอามาใส่อีกก้อนนึง
- อยากให้ class ไหน clone ได้, ต้องใส่ implements Cloneable 

```Java
public class Person2 implements Cloneable {
...
}
Person2 p = new Person2("Sam",new Department(1,"HR"));
try {
	// need to cast when clone
	Person2 pClone = (Person2) p.clone();
} catch (CloneNotSupportedException e) {
	e.printStackTrace();
}
```

- Cloneable ปกติ clone แบบ shallow clone ซึ่งจะมีปัญหากับพวก member variable ที่เป็น object ซึ่งมันจะแค่ก็อป address มาทำให้มันแค่ไป reference ที่เดียวกัน, ไม่ได้ clone มาจริงๆ
- วิธีแก้ ต้องไป override clone() , แล้วไป clone แยกตัวที่เป็น non-primitive

```java
public Person2 clone() {
	// deep clone
	try {
		Person2 p = (Person2) super.clone();
		p.department = (Department) this.department.clone();
		return p ; 
	} catch(CloneNotSupportedException e) {
		e.printStackTrace();
		throw new RuntimeException();
	}
}
```


#### Seirializable
---
- ถ้า class X implements Serializable interface แปลว่า X object สามารถถูกเก็บใน file หรือสื่ออื่นๆได้ (object สามารถอ้างถึงได้ด้วย sequence of bytes)

```Java
public class Car implements Serializable {
	...
}
Car myToyota , anotherToyota ; 
myToyota = new Car("Toyota" , "Carina" , 42312);
ObjectOutputStream out = getOutput();
out.writeObject(myToyota);

```

#### Tag / Marker Interface
---
- Interface ที่ไม่มี method
- เหมือนการติด tag
- เช่น Cloneable , Serializable

#### Functional Interface
---
- มี method เดียวเท่าน้น
```Java
public interface Perform {
	int compute(int a,int b);
}

Perform mul = (x,y) -> x * y;  
Perform add = (x,y) -> x + y;
int c = mul.compute(2,5) ; 
int d = add.compute(2,5) ; 
```

#### Strategy pattern
---
Strategy
- เป็น interface ตัวกลางที่จะรับ option (ConcreteStrategy) มาเพื่อที่จะรู้ว่า interface นี้จะทำอะไร
ConcreteStrategy
- strategy ที่มี detail ครบแล้ว
Context
- เรียกใช้ strategy
- ผลการรันมาจาก concrete strategy ว่าเอาอันไหนเข้าไปใน strategy

```Java
// strategy
public interface TextFormatter {
	public void format(String text);
}
// concrete strategy
public class CapTextFormatter implements TextFormatter {
	@Override
	public void format(String text) {
		System.out.println("[CapTextFormatter]: "+ text.toUpperCase());
	}
}
public class LowerTextFormatter implements TextFormatter {
	@Override
	public void format(String text) {
		System.out.println("[LowerTextFormatter]: "+ text.toLowerCase());
	}
}

// context
public class TextEditor {
	private final TextFormatter textFormatter ; 
	public TextEditor(TextFormatter textFormatter) {
		this.textFormatter = textFormatter ; 
	}
	public void publishText(String text) {
		textFormatter.format(text);
	}
}
```



