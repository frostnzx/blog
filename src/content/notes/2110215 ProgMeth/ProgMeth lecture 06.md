---
title: "ProgMeth lecture 06"
date: "2025-02-09"
published: true
kind: "note"
course: "2110215 ProgMeth"
tags:
  - "2110215-progmeth"
---

#### Set Key Trigger
---
- ปกติเวลากดปุ่ม key นึงค้างไว้มันจะ detect ว่าเรากดหลายรอบ
- ถ้าอยากกดค้างไว้แต่ให้ detect ว่ากดรอบเดียวให้ใช้ trigger
```Java
// create boolean trigger as class variable
boolean trigger = false ; 
area.setOnKeyPressed(new EventHandler<KeyEvent>() {
	@Override
	public void handle(KeyEvent event) {
		if(!trigger) {
			trigger = true ; 
			// do something ...
		 }		
	}
})
```

#### Drag & Drop
---
- ไปดูในคลิป

### Thread
---
- โค้ดที่รันควบคู่ไปกับ main
- การเขียนโปรแกรมทำ multitasking
	- คอมสามารถรันหลายๆ job พร้อมกันได้ เช่น รันทีละหลายๆโปรแกรม
- process (job) คือโปรแกรมที่กำลัง execute อยู่
- Java มี main เป็น job หลัก , สามารถสร้าง thread เป็น job รองๆรันควบคู่กับ job หลักได้
- Thread 2 ตัวใช้ code เดียวกันได้ถ้า execute จาก instance ของ process เดียวกัน
- Thread 2 ตัวใช้ data เดียวันได้ , แต่ถ้าใช้พร้อมกันอาจทำให้สภาพของ data คาดเดาได้ยาก
- Multithreading 
	- เช่น microsoft office ก้มี spell checking thread หรือ auto saving thread รันอยู่ด้วย
	- thread ทำให้ UI responsive
	- บาง library กิน cpu cycle มากถ้าเราไม่ spawn thread ออกมามากๆ มันจะ response ช้า

#### Thread -> Simple Life Cycle
---
			        -------------------   Blocked 
				    |							               |
New - start() --&gt; Runnable &lt;--(Scheduler)--&gt; Running --&gt; run() completes --&gt; Dead

- Runnable พร้อมที่จะ run แล้วแต่อาจจะยังไม่ run เพราะแม้ว่าทุก thread จะทำงานเหมือนควบคู่ไปกับ main แต่จริงๆมันทำงานแบบ interleap คือให้ OS จัดการเปลี่ยนส่วนที่จะ run เช่น แปปเดียว run main อีกแปปเดียวเปลี่ยนไป run thread , มีแค่ 1 thread เท่านั้นจะ run ในเวลาใดเวลาหนึ่ง โดยสลับด้วย OS scheduler
- Running , thread นี้ถูกเลือกโดย scheduler แล้วก็ไปรันได้ เป็นการ execute method run ใน thread
- Blocking / Unblocking -> หยุด thread ไว้ก่อน แล้วค่อยมาทำใหม่ (more advance topic = monitor lock คือให้ thread นึงทำต่อจากอีก thread)
- Method Wait / Notify -> too advance for this class


#### Thread Method Overview
---
###### Simple method
- void setName()
- String getName()
- String getState()
- Thread currentThread()
- void run()
- void start()
###### Advanced Method
- void wait()
- void notify()
- void notifyAll()
- static void sleep(long mills) throws InterruptedException
- void yield

#### OS Scheduling
---
- "Running state " ขึ้นอยู่กับ OS
- Preemptive OS (e.g., Window)
	- ทุก process สามารถรันได้เฉพาะบางช่วงเวลา (time-slice) จากนั้นจะถูกนำเข้า Runnable state เพื่อให้ process อื่นๆรันได้ เพื่อ maximize throughputs (totally forget about this word lol)
- Non-preemptive OS (e.g., Solaris)
	- ไม่มี time slice ทุกๆ process รันไปจนกว่าจะเสร็จ

#### Check States
---
```Java
Thread t = new Thread();
System.out.println(t.getState()); // ยังไม่รันจะได้ state New
t.start(); // สั่งให้มันเริ่มทำงาน (เข้า Runnable)
// main ทำงานต่อ
do {
	s = t.getState();
	System.out.println(s); // จะได้เป็น Runnable ตลอดเพราะถ้ามันทำบรรทัดนี้แปลว่า scheduler มันสลับมาทำ main ดังนั้น thread ก็จะรอบรรทัดนี้ทำงานจึงเป็น runnable
}while(s != Thread.State.TERMINATED);
```

#### Creating & Starting the Thread
---
วิธีสร้าง thread class มีสองแบบทำแบบไหนก็ได้
1. สร้าง myThread แล้วเอาไป extendsx Thread
2. สร้าง myThread แล้วไป implements Runnable
แต่จริงๆ implements Runnable จะดีกว่า เพราะมันจะได้ไป extends ตัวอื่นได้

```Java
public class someThread() extends Thread {
	public void run() {
		// code for thread execution
	}
}
```

```Java
public class RunningClass extends ... implements Runnable {
	public void run() { // must be overridden
		// code for thread execution
	}
}
public class ThreadTester {
	public static void main(String[] args) {
		// creating an instance of a Runnable
		RunningClass rc = new RunningClass();

		// creating a new thread for the Runnable instance
		Thread t = new Thread(rc);

		// starting the thread
		t.start();
	}
}
```

```Java
Thread t = new Thread(new Runnable(){
		public void run() {
			/* fill code */
		} 
});
t.start();
```

#### Basic Control of Threads 
---
```Java
// Testing threads
isAlive();
// Accessing thread priority
getPriority();
setPriority();
// Putting threads on hold
Thread.sleep()
join();
Thread().yield();
```

#### Thread Priority
---
```java
public static final int MIN_PRIORITY; (1)
public static final int NORM_PRIORITY; (5)
public static final int MAX_PRIORITY; (10)
```

#### Thread.sleep()
---
- ให้โอกาส thread อื่นในการรันบ้าง
- เปลี่ยนจาก Running state เป็น TIMED_WAITING state
```java
class SleepThread extends Thread {
	public void run() {
		try {
			Thread.sleep(1);
		}
		catch(InterruptedException e)
	}
}
```
- Interrupt -> กวนให้ตัวที่ sleep ตื่น
```Java
Sleep10Thread t = new Sleep10Thread();
t.start();
t.interrupt();
```
- yield -> เปลี่ยนให้ตัวเองกลับมา Runnable state (แต่ scheduler อาจะเรียกตัวเองกลับมาใหม่อีก)
```Java
Thread.yield();
```


#### Thread.join()
---
```java
class Sleeper extends Thread {
	private int duration ; 
	public Sleeper(String name, int sleepTime) {
		super(name);
		duration = sleepTime ; 
		start(); // เป็นวิธีการเขียนให้มัน start ตอน new เลย
	}
	public void run() {
		try {
			Thread.sleep(duration);
		} catch(InterruptedException e) {
			printStackTrace();
		}
		Sysyem.out.println("awakened");
	}
}
class Joiner extends Thread {
	private Sleepeer sleeper ; 
	public Joiner(String name , Sleeper sleeper) {
		super(name);
		this.sleeper = sleeper ; 
		start();
	}
	public void run() {
		// ส่วนที่รอ
		try {
			sleeper.join(); // thread ทีเราจะรอ
		} catch(InterruptedException e) {
			throw new RuntimeException(e);
		}
		System.out.println("Join completed");
	}
}
// in main
Sleeper sleepy = new Sleeper("Sleepy",1500);
Sleeper grumpy = new Sleeper("Grumpy",1500);
Joiner dopey = new Joiner("Dopey",sleepy); // รอ sleepy ถึงจะเริ่มทำงาน
Joiner doc = new Joiner("Doc",grumpy); // รอ grumpy ถึงจะเริ่มทำงาน
grumpy.interrupt();
```


#### Thread Pools
---
- จริงๆเราไม่ควรสร้าง thread แล้วเอามาใช้ทำ concurrency ตรงๆ
- ใน Java ใหม่ๆจะมี
	- Class ThreadPoolExecutor
	- Intrface Executor
- ใช้ Executor ดีกว่า thread เฉยๆมากๆ
	- สามารถ reuse thread 
	- สมารถ optimize thread เพื่อให้ทำงานตลอดแต่ thread ไม่มากเกินจน out of resources
- แต่ใน class นี้ไม่สอน


#### Threads in JavaFX
---
- TimerWithThread in JavaFX
	- ปกติจะเปลี่ยน GUI ต้องใช้ JavaFX application thread เท่านั้น แต่อันนี้เราใช้ GraphicContext เลยใช้ได้ แต่ปกติห้ามใช้ thread ปกติกับ JavaFX
```Java
public void start(Stage primaryStage) throws Exception {
	this.timerThread = new Thread(() -> {
		// this will be implementation of run function in this thread
		// but using lambda expression it will be this short
		while(true) {
			try {
				Thread.sleep(1000);
				drawCurrentTimeString();
			} catch (InterruptedException e) {
				e.printStackTrace();
				break;
			}
		}
	});
	this.timerThread.start();
}
public void stop() throws Exception {
	this.timerThread.interrupt();
}
```

#### Platform.runLater()
---
- JavaFX application thread
- สำหรับส่วนที่จะมีการ update application inteface
```Java
Platform.runLater(new Runnable() {
	@Override
	public void run() {
		// Access and Modify JavaFX Scene Graph
	}
})
```
- ใช้สำหรับใน thread ปกติเมื่อเราต้องการยุ่งกับ JavaFX UI
```Java
button.setOnAction(new EventHandler<ActionEvent>() {
	@Override
	public void handle(ActionEvent event) {
		Thread thread = new Thread(() -> {
			try {
				Thread.sleep(5000);
				// messing with JavaFX UI
				// running JavaFX application thread
				// ส่วนที่เปลี่ยนหน้าจอเท่านั้น
				Platform.runLater(new Runnable() {
					@Override
					public void run() {
						displayLabel.setText(textField.getText());
					}
				});
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		})
	} 
})
```
