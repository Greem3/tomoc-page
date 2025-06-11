import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import { updateProblemTypes } from './updates/updateProblemTypes';
import { executeSameLevelTasks } from './core/executeSameLevelTasks';
import { executeDistinctLevelTasks } from './core/executeDistinctLevelTasks';
import { updateProblems } from './updates/updateProblems';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

//Secondary Information Level
executeSameLevelTasks([
    updateProblemTypes
], 600000);

executeDistinctLevelTasks([
    updateProblems
], 60000)