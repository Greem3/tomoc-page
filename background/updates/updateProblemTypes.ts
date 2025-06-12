import useSqlApi from '../../src/hooks/fetchSqlApi'
import { IProblemTypes } from '../../src/interfaces/Views/IProblemTypes'
import { ISelect } from 'jsql-api'
import { editFile } from '../utils/writeFile'

export async function updateProblemTypes() {
    
    const response = await useSqlApi<ISelect<IProblemTypes>, IProblemTypes[]>({
        path: 'select',
        method: 'post',
        body: {
            table: {
                name: "ProblemTypes"
            }
        }
    })

    editFile('../src/data/problemTypes.json', response?.data ?? [])
}