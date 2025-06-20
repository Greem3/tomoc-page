import { AsyncFunction } from "../types/AsyncFunction";
import { TaskOrAsyncFunction } from "../types/TaskOrAsyncFunction";
import { Task } from "./Task";

export class TaskManager {

    constructor () {

    }

    private verifyIsTask(taskList: TaskOrAsyncFunction[]): Task<any>[] {
        
        return taskList.map((task) => {
            
            if (task instanceof Task) {
                return task;
            }

            return new Task(task, undefined)
        })
    }

    /**
     * It runs a process and repeat it 
     * @param task Task to execute
     * @param timeout Time in milliseconds
     */
    public executeTask(task: Task<any>, timeout: number) {
    
        return new Promise<void>(async (resolve) => {
    
            const loop = async (isFirst = true) => {
    
                try {
                    await task.execute();
                }
                catch (error) {
                    console.error(error);
                }
    
                if (isFirst) resolve();
    
                setTimeout(() => loop(false), timeout)
            }
    
            loop()
        })
    }

    /**
     * It runs a list of Tasks
     * @param tasksList List of Tasks
     */
    public async executeTasks(tasksList: Task<any>[]) {

        try {
            await Promise.all(
                tasksList.map(task => task.execute())
            );
        }
        catch (error) {
            console.error(`Task List Error:\n\n${error}`);
        }
    }
    
    /**
     * It runs a list of Tasks with the same timeout, but to run a process again it waits for the others to finish.
     * @param tasksList List of Tasks
     * @param timeout Time in milliseconds
     */
    public async executeSameLevelTasks(tasksList: TaskOrAsyncFunction[], timeout: number) {

        const formattedTaskList = this.verifyIsTask(tasksList);
    
        return new Promise<void>(async (resolve) => {
    
            const loop = async (isFirst = true) => {
                await this.executeTasks(formattedTaskList);
    
                if (isFirst) resolve();
    
                setTimeout(() => loop(false), timeout)
            }
    
            loop()
        });
    }
    
    /**
     * It runs a list of Tasks with the same timeout, but the Tasks do not wait for the others to finish before running again.
     * @param tasksList List of Tasks
     * @param timeout Time in milliseconds
     */
    public async executeDistinctLevelTasks(tasksList: TaskOrAsyncFunction[], timeout: number) {

        const formattedTaskList = this.verifyIsTask(tasksList)
    
        await Promise.all(
            formattedTaskList.map((task) => this.executeTask(task, timeout))
        )
    }
}
