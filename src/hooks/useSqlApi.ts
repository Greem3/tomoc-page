import { verifyMode } from "@/functions/verifyMode";
import { IEntity, IQuery, fetchJsqlApi } from "jsql-api";

export default async function useSqlApi<Query extends IQuery, Table extends IEntity>(
    {
        path,
        method,
        body
    } : {
        path: string,
        method: 'get'|'post'|'put'|'delete',
        body: Query
    }
) {
    const testMode = verifyMode()

    try {
        const response = await fetchJsqlApi<Query, Table>({
            path: path,
            method: method,
            body: body,
            params: {
                server: testMode ? 'localhost' : process.env.server as string,
                database: process.env.databaseName as string,
                uid: process.env.serverUid as string,
                pwd: process.env.serverPwd as string,
                encrypt: 'yes',
                trust_server_certificate: 'yes'
            },
            isLocal: testMode ? 8000 : undefined
        })

        return response
    }
    catch (error) {
        console.error('Jsql Api Error:', error)
    }
}