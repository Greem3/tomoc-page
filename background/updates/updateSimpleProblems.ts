import { generalUpdate } from "./generalUpdate";

export async function updateSimpleProblems() {
    await generalUpdate({
        tableName: 'VSimpleProblems',
        schema: 'content'
    })
}