import { executeTasks } from "./executeTasks";

/**
 * It runs a list of Tasks with the same timeout, but to run a process again it waits for the others to finish.
 * @param tasksList List of Tasks
 * @param timeout Time in milliseconds
 */
export function executeSameLevelTasks(tasksList: ((...args: any[]) => Promise<void>)[], timeout: number ) {

    return new Promise<void>(async (resolve) => {

        const loop = async (isFirst = true) => {
            await executeTasks(tasksList);

            if (isFirst) resolve();

            setTimeout(() => loop(false), timeout)
        }

        loop()
    });
}