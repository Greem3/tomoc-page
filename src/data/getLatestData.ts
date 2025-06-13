"use server"

import fs from 'fs';
import path from 'path';
import { DataFiles } from '@/types/DataFiles';

export async function getLatestData<FileType>(filePath: DataFiles) {
    const finalPath = path.join(process.cwd(), `src/data/${filePath}.json`);
    
    const rawData = fs.readFileSync(finalPath, 'utf-8');

    return JSON.parse(rawData) as FileType;
}