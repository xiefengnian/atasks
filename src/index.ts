interface ITask {
    taskName: string;
    _resolve: (reason?: any) => void | null;
    _reject: { (arg0: any): void; (value?: any): void; } | null;
    promise: Promise<any>;
}
interface ITasks {
    taskList: Promise<any>[];
    taskGroupName: string;
}
type TReturnOfTask = {
    promise: Promise<any>;
    resolve: () => void;
}
type TReturnOfTasks = {
    wait(): Promise<any>;
    add(taskGroupName: string): (() => void);
}

function Tasks(taskGroupName: string): TReturnOfTasks {
    function Task(taskName: string): TReturnOfTask {
        class T implements ITask {
            public _reject: (reason?: any) => void;
            public _resolve: { (arg0: any): void; (value?: any): void; };
            public taskName;
            public promise;
            constructor(taskName: string) {
                this.taskName = taskName;
                this.promise = new Promise<any>((resolve, reject) => {
                    this._resolve = resolve;
                    this._reject = reject;
                })
            }
            resolve(val: any) {
                this._resolve(val);
            }
        }
        const t = new T(taskName);
        return { promise: t.promise, resolve: t.resolve.bind(t) };
    }
    class Ts implements ITasks {
        public taskList: Promise<any>[];
        public taskGroupName;
        constructor(taskGroupName: string) {
            this.taskList = [];
            this.taskGroupName = taskGroupName;
        }
        add(taskName: string) {
            const t = Task(taskName);
            this.taskList.push(t.promise);
            return t.resolve;
        }
    }
    const ts = new Ts(taskGroupName);
    return {
        add: (taskName: string) => ts.add(taskName),
        wait: () => Promise.all(ts.taskList),
    }
}
export default Tasks;