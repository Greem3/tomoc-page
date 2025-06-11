import { saveTask } from "./saveTask";


/**
 * It runs a list of Tasks
 * @param tasksList List of Tasks
 */
export async function executeTasks(tasksList: ((...args: any[]) => Promise<void>)[]) {

    try {
        await Promise.all(saveTask(tasksList));
    }
    catch (error) {
        console.error('Task error: ', error);
    }
}