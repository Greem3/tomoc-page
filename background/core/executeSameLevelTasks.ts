import { executeTasks } from "./executeTasks";

/**
 * It runs a list of Tasks with the same timeout, but to run a process again it waits for the others to finish.
 * @param tasksList List of Tasks
 * @param timeout Time in milliseconds
 */
export async function executeSameLevelTasks(tasksList: ((...args: any[]) => Promise<void>)[], timeout: number ) {
    
    await executeTasks(tasksList);

    setTimeout(() => executeSameLevelTasks(tasksList, timeout), timeout)
}