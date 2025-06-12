import { generalUpdate } from './generalUpdate'

export async function updateProblems() {

    await generalUpdate({
        tableName: 'VProblems',
        schema: 'content'
    })
}