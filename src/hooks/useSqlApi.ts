import { Method } from "axios";
import { IEntity, IQuery, fetchJsqlApi } from "jsql-api";

//! Por alguna razón esto hace que se deje de ejecutar el proyecto XD
//! (No importa si tiene try catch, pasa lo mismo)
export default async function useSqlApi<Query extends IQuery, Table extends IEntity>(
    {
        path,
        method,
        body,
        testMode
    } : {
        path: string,
        method: Method,
        body: Query,
        testMode: boolean
    }
) {
    console.log({
        path: path,
        method: method,
        body: body,
        params: {
            server: testMode ? 'localhost' : process.env.server,
            database: process.env.databaseName,
            uid: process.env.serverUid,
            pwd: process.env.serverPwd,
            encrypt: 'yes'
        },
        isLocal: testMode ? 8000 : undefined
    })

    try {
        const response = await fetchJsqlApi<Query, Table>({
            path: path,
            method: method,
            body: body,
            params: {
                server: testMode ? 'localhost' : process.env.server,
                database: process.env.databaseName,
                uid: process.env.serverUid,
                pwd: process.env.serverPwd,
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