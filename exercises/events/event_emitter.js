const EventEmitter = require('events');
const fs = require('fs');

/**
|--------------------------------------------------
| Event Emitters:
|
|    Benefit of using events instead of regular callbacks
|    is that we can react to the same signal multiple times by defining
|    mulitple listeners. 
|    
|    Events are a great way for applications to allow multiple external 
|    plugins to build to build functionality on top of the applications core.
|    
|    They act as hook points to allow for customizing
|    the story around a state change.
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Sync Event.
|--------------------------------------------------
*/

class WithLog extends EventEmitter {
    execute(taskFunc) {
        console.log('Before executing');
        this.emit('begin');
        taskFunc();
        this.emit('end');
        console.log('After executing');
    }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing Task ***'));

/**
|--------------------------------------------------
| Async Event
|--------------------------------------------------
*/

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        console.time('execute');
        this.emit('begin');
        asyncFunc(...args, (err, data) => {
            if (err) return this.emit('error', err);
            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end')
        });
    }
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fs.readFile, __filename);``