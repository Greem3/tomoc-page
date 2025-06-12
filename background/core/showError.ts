/**
 * Show a error of a individual task
 * @param task Process to execute
 * @param index Index of the process
 * @returns Nothing
 */
export async function showError(task: (...args: any[]) => Promise<void>, index: number) {
    try {
        return await task();
    }
    catch (error) {
        console.error(`Task ${index} ${task.name && `(${task.name})`} Error: `, error);
    }
}