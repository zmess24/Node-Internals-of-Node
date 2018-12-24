/**
|--------------------------------------------------
| What is this?
|
| This is psuedocode meant to mimic the event 
| loop whenever a JS file is run via Node.
|--------------------------------------------------
*/

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, oeprations are recorded from myFile running.
// Node myFile.js
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (ex: HTTP server listening on some port)
  // Check three: Any pending long running operations (like fs module) 
  // If there's nothing pending, return false and exit while loop, kick back over to the terminal.
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
};

// Entire body executes in one 'tick'
// If `shouldContinue` returns true, continue.
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions
  // are ready to be called. setTimeout, setInterval

  // 2) Node looks at pendingOSTasksa and pendingOperations
  // and calls relevant callbacks.

  // 3) Pause execution, Continue when...
  //  - a new pendingOSTask is done
  //  - a new pendingOperation is done
  //  - a timer is about to complete

  // 4) Look at pendingTimers. Call any setImmediate.

  // 5) Handle any 'close events'
  // Example: readStream.on('close, () => console.log('Cleanup code') }
}
