import { Method } from "axios";
import useJsqlApi, { IEntity } from "jsql-api";
import _IQuery from "jsql-api/dist/objects/src/internal/abstract/IQuery";

//! Por alguna razón esto hace que se deje de ejecutar el proyecto XD
//! (No importa si tiene try catch, pasa lo mismo)
export default async function useSqlApi<Query extends _IQuery, Table extends IEntity>(
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

    const response = await useJsqlApi<Query, Table>({
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

    return response
}