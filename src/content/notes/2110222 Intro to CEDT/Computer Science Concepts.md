---
title: "Computer Science Concepts"
date: "2024-08-19"
published: true
kind: "note"
course: "2110222 : Intro to CEDT"
teacher: "Atiwong suchato"
tags:
  - "Bits"
  - "twoComplement"
  - "BiasK"
  - "IEEE754"
---

#### ASCII
---
Can display 256 different characters.

![Pasted image 20240819224153](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240819224153.png>)

#### UTF-8
---
To deal with more character we need utf-8 to encode.

![Pasted image 20240819224343](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240819224343.png>)
###### 1 bytes
---
![Pasted image 20240819224424](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240819224424.png>)

###### 2 bytes
---
![Pasted image 20240819225202](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240819225202.png>)



## Two's Complement
---

![Pasted image 20240820002722](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820002722.png>)

Two's complement positive value is similar to base-2

![Pasted image 20240820002821](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820002821.png>)

Two's complement negative value does something different

![Pasted image 20240820003002](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820003002.png>)
***From Two's complement positive to Decimal***

![Pasted image 20240820003041](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820003041.png>)
***From Two's complement negative to Decimal***

![Pasted image 20240820003341](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820003341.png>)


## Bias-K / Excess-K
---
![Pasted image 20240820003522](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820003522.png>)

> The value of base-2 number is K more than Excess-K with a similar bit pattern.

Thus, N-Bit Excess K can represent integers in the range -K to 2^n -1 - k

![Pasted image 20240820004635](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820004635.png>)


## IEEE 754
---
##### Single Precision
---
![Pasted image 20240820004808](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820004808.png>)

##### Double Precision
---
![Pasted image 20240820004848](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820004848.png>)

![Pasted image 20240820005306](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820005306.png>)

![Pasted image 20240820005037](</content/notes/2110222 Intro to CEDT/assets/Pasted image 20240820005037.png>)
[Computer Science Concepts: IEEE 754 - Learn Freely (youtube.com)](https://www.youtube.com/watch?v=oaf4v4wOuGI&list=PLY7dt-k436CJWg94rNPEtSEeGs464oVDj&index=7)
