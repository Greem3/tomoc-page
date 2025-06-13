import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import { updateProblemTypes } from './updates/updateProblemTypes';
import { executeSameLevelTasks } from './core/executeSameLevelTasks';
import { executeDistinctLevelTasks } from './core/executeDistinctLevelTasks';
import { updateProblems } from './updates/updateProblems';
import { updateSimpleProblems } from './updates/updateSimpleProblems';
import { generateFilesType } from './utils/generateFilesType';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

// Secondary Information Level
const secondaryLevel = executeSameLevelTasks([
    updateProblemTypes
], 600000); // 10 minutes (600000)

// Problems Data Level
const problemLevel = executeSameLevelTasks([
    updateProblems,
    updateSimpleProblems
], 60000); // 1 minute (60000)

await Promise.all([
    problemLevel,
    secondaryLevel
])

generateFilesType({
    filesPath: path.resolve(__dirname, '../src/data/liveData'),
    typeName: 'DataFiles',
    saveFile: '../../types'
})