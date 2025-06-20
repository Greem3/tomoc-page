import { Task } from "../classes/Task";
import { AsyncFunction } from "./AsyncFunction";


export type TaskOrAsyncFunction = Task<any>|AsyncFunction;