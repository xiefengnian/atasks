const path = require('path');
const _Tasks = require(
    path.resolve(__dirname,'../dist/atasks.js')
).default;
console.log(_Tasks)
// create a task group
const group = _Tasks('a task');
// this task group has 2 child task
const t1 = group.add('child task 1');
const t2 = group.add('child task 2');

setTimeout(()=>{
    t1();
},1000)

setTimeout(()=>{
    t2();
},2000)

// in a runing function which will process after t1 and t1 done 
const someFunction = async()=>{
    await group.wait();
    console.log('next move'); // afer 2s
}
someFunction();