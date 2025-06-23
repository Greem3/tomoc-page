import { ISelect } from 'jsql-api'
import useSqlApi from '../../src/functions/fetchSqlApi'
import { editJsonFile } from '../utils/editJsonFile'

interface IGeneralUpdateProps {
    tableName: string,
    schema?: string,
    file?: string
}

export async function generalUpdate({tableName, schema, file}: IGeneralUpdateProps) {
    
    const response = await useSqlApi<ISelect, any>({
        path: 'select',
        method: 'post',
        body: {
            table: {
                name: tableName,
                sql_schema: schema
            }
        }
    })

    editJsonFile(`../src/data/liveData/${file ?? tableName}.json`, response?.data ?? [])
}