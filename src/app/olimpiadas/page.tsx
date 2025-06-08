"use server"

import { getOlympiads } from "@/functions/ApiTest"
import IVContests from "@/interfaces/Views/IVContests"
import useJsqlApi, { ISelect } from "jsql-api"

export default async function Olympiads() {

    const olympiads = [
        {
            id: 0,
            name: '',
            short_name: null
        }
    ]

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