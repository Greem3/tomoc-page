"use server"

import fs from 'fs';
import path from 'path';

export async function getLatestData<FileType>(filePath: string) {
    const finalPath = path.join(process.cwd(), `src/${filePath}`);
    
    const rawData = fs.readFileSync(finalPath, 'utf-8');

    return JSON.parse(rawData) as FileType;
}