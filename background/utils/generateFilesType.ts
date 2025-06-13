import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";

interface IGenerateFilesTypeProps {
    filesPath: string;
    typeName: string;
    saveFile?: string;
}

export function generateFilesType({ filesPath, typeName, saveFile }: IGenerateFilesTypeProps) {

    const files = readdirSync(filesPath)
        .filter(name => name.endsWith('.json'))
        .map(name => `"${name.replace(/\.json$/, '')}"`)
        .join(' | ')
    
    const type = `export type ${typeName} = ${files}`

    writeFileSync(resolve(filesPath, `${saveFile}/${typeName}.d.ts`), type)
}