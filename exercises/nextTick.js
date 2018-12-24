let count= 0;

function cb() {
  count++;
  console.log(`Processed in the ${count} iteration`);
}

process.nextTick(cb);
console.log('Processed in the first iteration');
console.log('Processd in the first iteration');
process.nextTick(cb);
console.log('Processed in the first iteration');
