
//TODO: Probar por que este codigo deja de ejecutar la pagina

import IVContests from "@/interfaces/Views/IVContests";
import { fetchJsqlApi, ISelect } from "jsql-api"

export async function getOlympiads() {
    try {
        console.log("Iniciando consulta...");
        const data = await fetchJsqlApi<ISelect<IVContests>, IVContests>({
            path: 'select',
            method: 'post',
            params: {
                server: 'localhost',
                database: 'TomocDb',
                uid: 'ServerTomocAdmin',
                pwd: 'Tomoc@Db.2025',
                encrypt: 'no',
                trust_server_certificate: 'yes'
            },
            isLocal: 8000,
            body: {
                table: {
                    name: 'VContests',
                    sql_schema: 'content'
                }
            }
        });
        console.log("Consulta finalizada:", data);
        return data;
    } catch (err) {
        console.error("Error al obtener olimpíadas:", err);
        return [];
    }
}
