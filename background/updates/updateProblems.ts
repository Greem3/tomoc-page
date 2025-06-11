import useSqlApi from '../../src/hooks/useSqlApi'
import { ISelect } from 'jsql-api'
import { editFile } from '../utils/writeFile'
import IVProblems from '@/interfaces/Views/IVProblems'

export async function updateProblemTypes() {
    
    const response = await useSqlApi<ISelect<IVProblems>, IVProblems[]>({
        path: 'select',
        method: 'post',
        body: {
            table: {
                name: "VProblems"
            }
        }
    })

    editFile('../src/data/problems.json', response?.data ?? [])
}