import { ISelect } from 'jsql-api'
import useSqlApi from '../../src/hooks/fetchSqlApi'
import { editFile } from '../utils/editFile'

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

    editFile(`../src/data/${file ?? tableName}.json`, response?.data ?? [])
}