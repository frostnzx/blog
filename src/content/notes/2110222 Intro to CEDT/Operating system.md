Class : [[2110222 : Intro to CEDT]]
Subject/Topics : #OS
Date : 2024-08-28
Teacher : Narawit Team

Notes : 

#### Operating systyem
---
(manages the hardware and running programs)

- load and manage processes
- provide interfaces to hardware via sysyem calls
- provide a filesystem
- provide a basic user interface


#### Unix
---
a family of OS's
- linux
- BSD
- OS X

#### Device driver
---
OS plug-in module for controlling a particular device

![[Pasted image 20240828003614.png]]


### Pre-emptive multitasking
---
A primary purpose for modern OS is to allow for multiple processes to run at the same time , but the CPU core can only execute the code of one process at a time and the  "***os's own code can't run on a core at the same time as any process***"   ->  the solution is to have each CPU core alternate between running each open process and Alternate running processes with running OS code

![[Pasted image 20240828004056.png]]<p style="color:green;">Process -> Green </p>
<p style="color:blue;">OS -> Green </p>

OS code always run on each core in between each process , the portion of the OS called   
**THE SCHEDULAR**   runs after each process to decide what OS work it should be done and which process should run next

But how does the currently running process get interrupted , left on its own the running process would run indefinitely , when any hardware interrupt is triggered -> the interrupt handler passes off control to the scheduler rather than handing the processor core back to the interrupted process
this calls    ***Pre-emptive multitasking***
and works in this following order

1. CPU receives interrupt
2. interrupt stores program counter
3. interrupt invokes handler
4. handler saves rest of state of the CPU for the process
5. handler does its business
6. handler invokes the scheduler
7. scheduler selects a process to run
8. scheduler restores state of the CPU for that process
9. scheduler jumps execution to that process

An **interrupt** is a signal sent to the CPU by hardware or software indicating that an event needs immediate attention. he interrupt can be triggered by various sources, such as a timer indicating the current task's time slice is over, I/O operations, or other system events that require attention.

***The clock device on the main board is configured to send an interrupt on a regular basis***

The scheduler using     "round robin algorithm"    the scheduler simply runs each process in turn one after the other while this ensures that every process gets run on a regular basis , modern OS attempt to take into account which processes need processor time more than other.


#### Memory
---
a ,b and c have been allocated their own portions of system memory , while OS can access every portion of memory because OS in charge of memory. Each process can only access its own portion of memory.

but processes must be able to invoke certain routines at fixed addresses in the OS's portion of memory these routines called system calls, means that processes initiate request to the operating system, system call provide functionality for things like say reading and writing files or for sending and receiving data over the network.

To invoke the system call a process must use a specific CPU instruction called CIS call in which the process specifies a system call number

![[Pasted image 20240828014126.png]]

When the CIS call is invoke the processor looks in the system call table for the address in the routine corresponding to the number and jump execution to that address

![[Pasted image 20240828014359.png]]

The CPU run on 2 priviledge levels.

When OS code runs the CPU runs on the priviledge level that allows access of the io devices and any address of memory.

When the process run CPU is put into priviledge level that triggers a hardware exception , when the code attempts to access the IO devices or addresses that is not allowed for that process, proccesses supposed to directly touch only their own memory not anything else in the system

![[Pasted image 20240828014612.png]]


### How process uses memory
---
![[Pasted image 20240828015019.png]]

each process use its portion of the memory for stack , heap and text (storing processes code in binary form but for some reason they call it text wtf).

***Stack***    stores the local variables used by the process 
***Heap***    stores everything else


#### Stack
---
![[Pasted image 20240828015622.png]]

![[Pasted image 20240828015812.png]]

Stack size usually keep tracks with the     ***Stack boundary***    and when the stack pointer run past the stack boundary , it triggers a hardware exception and the exception handler may increase the stack space by moving the stack boundary. but at some point the exception handler may think that the stack is grown too large and may simply terminate the process.
Generally a processes stack should only get so big a megabyte or two at the high end , the common cause of an overly large stack is an overly long chain of recursive function calls.

In embedded system , the stack doesn't have stack boundary, so the stack might overflow into other portion of memory causing bugs.

#### How memory portion arranges
---
![[Pasted image 20240828020428.png]]

The process must request chunks of Heap storage from the OS with a system call.
The system call tell OS how much space it want , the OS decide where to stores it.

![[Pasted image 20240828020727.png]]

As the process allocates and deallocates chunks memory the memory space can become more and more fragmented. shrinking the size of heap chunks, good allocation algorithm can minimize the fragmentation, but the problem can't be avoided entirely.

Failing to deallocate unneeded memory is a bug called     ***Memory Leak***

![[Pasted image 20240828021141.png]]

The memory addresses of the process do not actually refers directly to actual bytes of system memory, instead chunks of the process address space are mapped by the OS to chunks of system memory, but not neccessarily continuously or in the same order.

If a memory address try to access the system memory that are not mapped to its process in the "process memory table", the OS call error message complaining about "Page fault" because the mapped chunks of memory are called "pages". (virtual memory on process and physical memory on RAM are both called Pages)

Each page is usually a set size which depends upon the CPU 32-bit x86 usually use 4 kb pages

To free up ram usually OS may decide to swap out pages of a process to storage usually a 
Hard Drive.

![[Pasted image 20240828022344.png]]

These heap pages have been marked swapped.
An attempt by the process to access an address in a swapped page will trigger an exception, and the OS will copy the swapped page back to RAM and adjust the memory table before allowing the process to proceed.


### Process states
---
![[Pasted image 20240828023540.png]]

***create*** -> OS does all the process it needs at time of creation
***waiting*** -> Waiting to be selected by the scheduler
***running*** -> Run 
 If the scheduler selects different process to run on the same core it goes back to waiting state 
***blocked*** -> The process is waiting for some external event in the system before it can proceed


### Partition
---
![[Pasted image 20240828023934.png]]

Most commonly a drive is formatted to have just one partition occupying its entire storage area,
still creating multiple partitions serves some niche use cases such as installing multiple OS on a single drive.


### IPC (Interprocess Communication)
---
- files
- pipes
- sockets
- signals
- shared memory
Is a term for any mechanism on the CPU that facilitates communication between processes.



