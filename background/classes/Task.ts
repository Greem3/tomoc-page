import { AsyncFunction } from "../types/AsyncFunction";

export class Task<F extends AsyncFunction> {
    
    public readonly taskName: string;
    private task: F;
    private args?: Parameters<F>;

    private abortController = new AbortController();

    constructor (task: F, args?: Parameters<F>, customTaskName?: string){

        this.task = task;
        
        this.taskName = customTaskName
            ?? this.task.name;
        
        if (this.taskName === '') {
            this.taskName = 'AnonymousTask'
        }
        
        this.args = args;
    }
    
    public async execute(): Promise<0|1> {

        try {

            if (this.args) {
                await this.task(...this.args);
            }
            else {
                await this.task();
            }
        }
        catch (error) {

            if (error instanceof Error) {
                error.message = `Task error from ${this.taskName}:\n\n${error.message}`;
                throw error
            }
            else {

                throw new Error(`Task error from ${this.taskName}:\n\n${error}`);
            }
        }
        
        return 0;
    }

    public async stop() {
        this.abortController.abort();
        this.abortController = new AbortController();
    }
}