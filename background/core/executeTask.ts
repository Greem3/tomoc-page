import { showError } from "./showError";

/**
 * It runs a process and repeat it 
 * @param task Task to execute
 * @param timeout Time in milliseconds
 */
export function executeTask(task: (...args: any[]) => Promise<void>, timeout: number, index: number) {

    return new Promise<void>(async (resolve) => {

        const loop = async (isFirst = true) => {

            await showError(task, index);

            if (isFirst) resolve();

            setTimeout(() => loop(false), timeout)
        }

        loop()
    })
}