import { showError } from "./showError";

/**
 * It runs a process and repeat it 
 * @param task Task to execute
 * @param timeout Time in milliseconds
 */
export async function executeTask(task: (...args: any[]) => Promise<void>, timeout: number, index: number) {

    await showError(task, index)

    setTimeout(() => executeTask(task, timeout, index), timeout);
}