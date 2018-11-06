## Node.js

JavaScript code that we write: 100% JS.

Node.js 50%JS/50% C++

V8 30% JS
libuv C++

Node provides series of wrappers for modules.

Working with node extracts away the need to work on top of C++

i.e http, crypto, fs, path

process.binding() connects JS and C++ functions.

V8 converts values between JS and C++.

Node's C++ Side (src folder in Node Repo)

libuv - gives node easy access to underlying OS.

## Threads

Process - Instance of a computer program that is being executed.

Within a single process, we can have multiple threads.

A thread is a 'todo' list of instructions that neeed to be executed by the CPU of a computer.

Starts from Top Down.

Scheduling - which thread the OS should run at any given time.

CPU's can only run only run so many threads per second.

Two ways to increase theads:

1. More CPU cores -> More threads.
2. Each CPU core can handle multiple threads through multi-threading. CPU's have the ability to pause and resume threads based on async I/O operations (such as reading a file from the HD).

## Node Event Loop

Node auto creates one thread, and executes all of our code in that single thread.

Event Loop is a control structure that decides what the one thread should be doing at any given time.

Node **Event Loop** - Single Threaded.

**Some** of Node **Framework/Std Lib** - **NOT** single Threaded. i.e some functions run outside the event loop. 

## Threadpool

Node libuv side delegates expensive functions to C++. Libuv runs whats called a thread pool.

By default, libuv creates 4 threads in the thread pool.

Q: Can we use the threadpool for JS code or can only nodeJS functions use it?

A: We can wrtite custom JS that uses the thread pool.

Q: What functions in node std library use the threadpool

A: All `fs` module functinos. Some cypto stuff. Depends on OS (windows vs unix based).

Q: How does the threadpol fit into the event loop?

A: Tasks running in the threadppol are the `pendingOperations` in our code example.