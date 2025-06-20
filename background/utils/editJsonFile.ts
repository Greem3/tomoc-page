import { join } from "path";
import { __dirname } from "../main";
import { Dictionary } from "../types/Dictionary";
import { writeFileSync } from "fs";

export function editJsonFile(path: string, data: Dictionary|Dictionary[]) {
    const outputPath = join(__dirname, path);
    writeFileSync(outputPath, JSON.stringify(data, null, 4))
}