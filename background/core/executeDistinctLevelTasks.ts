import { executeTask } from "./executeTask";

/**
 * It runs a list of Tasks with the same timeout, but the Tasks do not wait for the others to finish before running again.
 * @param tasksList List of Tasks
 * @param timeout Time in milliseconds
 */
export function distinctLevelTasks(tasksList: ((...args: any[]) => Promise<void>)[], timeout: number) {

    tasksList.forEach((task, index) => {
        executeTask(task, timeout, index);
    })
}