"use server"

import useSqlApi from "@/hooks/useSqlApi"
import { fetchJsqlApi } from "jsql-api"

export default async function Olympiads() {

    const olympiads = [
        {
            id: 0,
            name: '',
            short_name: null
        }
    ]

    //! Sigue explotando igualmente
    await useSqlApi({
        path: 'select',
        method: 'post',
        testMode: true,
        body: {
            table: {
                name: 'VContests',
                sql_schema: 'content'
            }
        }
    })
    // await fetchJsqlApi({
    //     path: 'select',
    //     method: 'post',
    //     params: {
    //         server: 'localhost',
    //         database: process.env.databaseName,
    //         uid: process.env.serverUid,
    //         pwd: process.env.serverPwd,
    //         encrypt: 'yes'
    //     },
    //     isLocal: 8000,
    //     body: {
    //         table: {
    //             name: 'VContests'
    //         }
    //     }
    // })

    //! Por alguna razón esto hace que se deje de ejecutar el proyecto XD
    //! (No importa si tiene try catch, pasa lo mismo)
    // const data = await useJsqlApi<ISelect<IVContests>, IVContests>({
    //     path: 'select',
    //     method: 'post',
    //     params: {
    //         server: 'localhost',
    //         database: 'TomocDb',
    //         uid: 'ServerTomocAdmin',
    //         pwd: 'Tomoc@Db.2025',
    //         encrypt: 'no'
    //     },
    //     isLocal: 8000,
    //     body: {
    //         table: {
    //             name: 'VContests',
    //             sql_schema: 'content'
    //         }
    //     }
    // })

    // console.log(data);

    return <div>

    </div>
}