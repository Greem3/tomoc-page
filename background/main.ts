import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import { updateProblemTypes } from './updates/updateProblemTypes';
import { updateProblems } from './updates/updateProblems';
import { generateFilesType } from './utils/generateFilesType';
import { TaskManager } from './classes/TaskManager';
import { Task } from './classes/Task';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

const taskManager = new TaskManager();

// Secondary Information Level
const secondaryLevel = taskManager.executeSameLevelTasks([
    updateProblemTypes
], 600000) // 10 minutes (600000)

// Problems Data Level
const problemLevel = taskManager.executeSameLevelTasks([
    updateProblems
], 60000); // 1 minute (60000)

// This waits for all task files to be generated to generate the DataFiles type file.
await Promise.all([
    problemLevel,
    secondaryLevel
])

generateFilesType({
    filesPath: path.resolve(__dirname, '../src/data/liveData'),
    typeName: 'DataFiles',
    saveFile: '../../types'
})