import { showError } from "./showError";

/**
 * Save a list of Tasks into the showError function
 * @param taskList List of Tasks
 * @returns List of Tasks
 */
export function saveTask(taskList: ((...args: any[]) => Promise<void>)[]) {
    return taskList.map((task, index) => showError(task, index))
}