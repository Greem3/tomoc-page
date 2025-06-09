import axios, { AxiosResponse, Method } from "axios";
import { IEntity, IQuery } from "jsql-api";


interface IFetchSqlApiProps<Query extends IQuery> {
    path: string,
    method: Method,
    body?: Query,
    params: {
        server: string;
        database?: string;
        uid: string;
        pwd: string;
        encrypt?: 'yes'|'no';
        trust_server_certificate?: 'yes'|'no';
    },
    headers?: Record<string, string>,
    isLocal?: number
}

/**
 * Make a query to the database
 * @param {string} [path] - API path to query
 * @param {Method} [method] - API method
 * @param {JSON | null | { [key: string]: any} | undefined} [body] - Request Body
 * @param {Record<string, any> | undefined} [params] - Request params
 * @param {Record<string, string> | undefined} [headers] - Request headers
 * @param {number | undefined} [isLocal] - Use localhost for the request (save the local port)
 * @returns {Promise<T>}
 */
export async function fetchJsqlApi<Query extends IQuery, Table extends IEntity = any>(
    {
        path,
        method = 'GET',
        body,
        params,
        headers = {
            'Content-Type': 'application/json'
        },
        isLocal
    } : IFetchSqlApiProps<Query>)
    : Promise<AxiosResponse<Table, any>> {

    const config = {
        method,
        url: `http${isLocal ? '' : 's'}://${isLocal ? `localhost:${isLocal}` : 'jsql-api'}/${path}`,
        headers: headers,
        params: params,
        data: body
    }

    try {
        const response: AxiosResponse<Table> = await axios(config);

        return response
    }
    catch (error) {
        
        if (axios.isAxiosError(error)) {
            console.error("Jsql Api Error:", error.response?.data || error.message);
            throw error;
        }

        console.error('Jsql Api Unknown Error:', error);
        throw error;
    }
}