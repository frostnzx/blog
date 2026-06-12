---
title: "Central Processing Unit"
date: "2024-08-18"
published: true
kind: "note"
course: "2110222 : Intro to CEDT"
teacher: "Natawut Nupairoj"
tags:
  - "CentralProcessingUnit"
---

### CPU Overview
---
- Consists of lots (billions) of transistors working synchronously in clock cycle (higher clock usually means faster CPU)
-  There's an advance technique in which we can optimize clock to have better performance despite not having high clock rate
- Main purpose is to execute instructions (in low-level machine language) of computer program
- Some CPUs have multiple cores (processing units), some have special purpose cores (GPU , neural)
##### CPU Package
- CPU comes in package : CPU die and pins
- ***CPU die*** - contains transistors and circuit of processor cores
- ***CPU pins*** - connect CPU die to external components
##### CPU Die
![Pasted image 20240818234903](<./assets/Pasted image 20240818234903.png>)
CPU differences

### Basic CPU Components
---
Have 3 main parts CPU , BUS and Main memory (RAM)
	
![Pasted image 20240818235722](<./assets/Pasted image 20240818235722.png>)
CPU connects to Main memory (RAM) via BUS        ***Von Neumann Architecture***

![Pasted image 20240819000258](<./assets/Pasted image 20240819000258.png>)
***Inside CPU***
- ALU - Arithmetic / Logic Unit
- Control Unit - Conducting all cpu units 
- Register Unit - Memory inside cpu speed equals to other cpu compartment
- ---
- All calculations in ALU must be done using values from registers; we cannot calculate using data
  in memory directly
- Thus , we usually load data from memory to registers, calculate placing result in a register, and store results back to memory
- This is called "Load-Store Architecture"

##### Example : Adding 2 Numbers @03 &lt;- @00 + @FE
---
![Pasted image 20240819001348](<./assets/Pasted image 20240819001348.png>)
***Step 1*** : Get one of the values to be added from memory and place it in a register
***Step 2*** : Get the other value to be added from memory and place it in another register
***Step 3*** : Activate the addition circuitry with the registers used in Steps 1 and 2 as inputs
and another register designated to hold the result
***Step 4*** : Store the result in memory


### CPU Execution
---
##### CPU Instruction Set
-  To make a CPU runs, we must create a program using CPU instruction set or machine language
-  Machine language is a low-level programming language, which can be executed directly by CPU
- We usually write a program in "high-level programming language" e.g. Python, Java, C etc.
- Thus, all programs in high-level languages must be "translated" (compiled or interpreted) into
  machine language

##### Brookshere's Simple Machine

![Pasted image 20240819003309](<./assets/Pasted image 20240819003309.png>)
16 general-purpose registers (r0 - rF)
***Program Counter ($PC)*** - contains memory address that we will execute in the next step
***Instruction Register ($IR)*** - contains program that is currently executing
***256 bytes main memory*** - (@00 - @FF)
- **Memory Locations**: The BSM has 256 memory locations, with addresses ranging from `00` to `FF`. Each of these memory locations can store 1 byte of data.
- **Addressing**: The address itself is just a label or a reference used to identify a specific memory location. The address is not stored within the memory—it simply points to a location in memory.

##### Machine Cycle: Fetch-Decode-Execute
---
![Pasted image 20240819005722](<./assets/Pasted image 20240819005722.png>)
##### Machine : Fetch
---
![Pasted image 20240819010248](<./assets/Pasted image 20240819010248.png>)
IR stores 2 bytes at a time ( opcode + operand requires 2 bytes (16 bits) )

##### Instruction Types
---
- Data Transfer
	 - LOAD from memory, STORE to memory
	 - LOAD from constant
	 - MOVE between registers
- Arithmetic / Logic
	- Arithmetic operations (ADD integer, ADD floating points)
	- Boolean operations (AND , OR , XOR)
	- Bit-wise operations (ROTATE) 
- Control
	- Conditional jumps / branches
	- HALT execution (Exit)
##### Parts of Instruction (Machine : Decode)
---
- Op-code (Operation code) - 4 bits
	 - Specify the operation to execute
- Operand - 12 bits
	- Additional details about operation -> address ,register , constant
	
		![Pasted image 20240819012805](<./assets/Pasted image 20240819012805.png>) ![Pasted image 20240819013429](<./assets/Pasted image 20240819013429.png>)
				***Decoding***                                                  ***Executing***

##### Add Instruction
---
![Pasted image 20240819013646](<./assets/Pasted image 20240819013646.png>) 
![Pasted image 20240819013930](<./assets/Pasted image 20240819013930.png>)


##### Op-code
---
![Pasted image 20240819014010](<./assets/Pasted image 20240819014010.png>)

![Pasted image 20240819015122](<./assets/Pasted image 20240819015122.png>)

![Pasted image 20240819015136](<./assets/Pasted image 20240819015136.png>)

![Pasted image 20240819015725](<./assets/Pasted image 20240819015725.png>)

```

Prob1
-----
1020 -> get value of 0x20 at R0
21FF -> assign FF as a mask at R1
9001 -> R0 XOR R1 and place in R0
3022 -> store value at R0 to 0x22
C000 -> halt

Prob2
-----
1021 -> get value of 0x21 to R0
1122 -> get value of 0x22 to R1
B1F0 -> if R1 == R0 jump to F0 (store value 0x20 as 1)
***At F0*** 
2201 -> assign value 01 to R2
3220 -> store value at R2(01) to 0x20
C000 -> HAL
***********
2200 -> assign value 00 to R2
3220 -> store value at R2(00) to 0x20
C000 -> HAL

Prob3
-----
1150 -> get value of 0x50 to R1
1251 -> get value of 0x51 to R2

2300 -> assign 3 with 0 -> sum = 0 
2E00 -> assign E with 0 -> i = 0  
2D01 -> assign D with 1 -> i += 1 
1F51 -> assign F with value of 0x51 -> sum += F
1050 -> assign 0 with value of 0x50 -> sum < 0

---begin loop---

R3 += RF : 533F ; ValueAt3 += ValueAtF
RE += RD : 5EED ; ValueAtE += ValueAtD
	 : B3F0 ; jump to F0 if R3 == R0
	 : B00E ; always jump to 0E
*** At F0 ***
3E52 -> store divided value from RE to 0x52
C000 -> HAL
 

```
