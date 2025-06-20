import { generalUpdate } from './generalUpdate'

export async function updateProblemTypes() {

    await generalUpdate({
        tableName: 'ProblemTypes',
        schema: 'inside'
    })
}