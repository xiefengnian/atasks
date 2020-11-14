# atasks

一个基于Promise和async特性封装的异步操作控制库，为使用者提供了舒适且清晰的异步控制语法。

An asynchronous operation control library encapsulated based on Promise and Async features provides users with a comfortable and clear asynchronous control syntax.

## install

```
> npm i atasks
```


## usage

```javascript
// browser
import _Tasks from 'atasks';

// node 
const _Tasks = require('atasks').default;
```


## example 

```js
// create a task group
// 创建一个任务组
const group = _Tasks('a task');
// this task group has 2 child task
// 这个任务组存在两个子任务
const t1 = group.add('child task 1');
const t2 = group.add('child task 2');

setTimeout(()=>{
    t1();
},1000)

setTimeout(()=>{
    t2();
},2000)

// In a function that needs to continue execution after T1 and T2 have completed
// 需要在T1和T2完成后继续执行的函数
const someFunction = ()=>{
    await group.wait();
    console.log('next move'); // afer 2s
}
someFunction();
```

## api

1. `const group = _Task(taskGroupName:string):{wait ()=> Promise<any>, add(childTaskName)=>resolve}`

    Create a task group that can add countless subtasks.


    创建一个任务组，这个任务组可以添加无数的子任务。

2. `group.wait():promise`

    This returns the Promise.all of the missions.
    
    这个返回全部任务的Promise.all。
    

3. `group.add(childTaskName:string):resolve`

    Add a subtask that returns the resolve used to complete the task.

    添加一个子任务，该任务会返回用于完成该任务的resolve。

4. `const val:any[] = await group.wait()`

    Val will retrieve all the values of resolve and return them as an array.

    val会获取全部resolve的value，作为数组返回。

