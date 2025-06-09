"use client"

import MarkdownEditor from "@/components/Editors/MarkdownEditor";
import MarkdownLaTexEditor from "@/components/Editors/MarkdownLaTexEditor";
import { fetchJsqlApi } from "@/functions/fetchJsqlApi";
import { useEffect, useState } from "react";

export default function Tests() {

    const [text, setText] = useState('Initial Textx')
    const [contests, setContests] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchContests = async () => {

            const answer = await fetchJsqlApi({
                path: 'select',
                method: 'post',
                params: {
                    server: 'localhost',
                    uid: 'ServerTomocAdmin',
                    pwd: 'Tomoc@Db.2025',
                    database: 'TomocDb'
                },
                body: {
                    table: { name: 'VContests', sql_schema: 'content'}
                },
                isLocal: 8000
            })

            setContests(answer);
            setIsLoading(false);
        }

        fetchContests()
    }, [])

    if (isLoading) {
        return <p>Loading...</p>;
    }

    console.log(contests);

    // useSqlApi({
    //             path: 'select',
    //             method: 'post',
    //             body: {
    //                 table: { name: 'VContests', sql_schema: 'content'}
    //             },
    //             testMode: true
    //         })

    return <div className='w-full h-full flex flex-col gap-6 justify-center items-center align-center'>
        <MarkdownEditor
            markdown={text}
            onChange={setText}
        />
        <div className="flex gap-6">
            <MarkdownLaTexEditor
                value={text}
                onChange={(e) => setText(e ?? '')}
                className='
                    [&>*]:bg-gray-200
                '
                preview='edit'
            />

            <MarkdownLaTexEditor
                value={text}
                className='
                    w-100
                '
                hideToolbar={true}
                preview="preview"
                
            />
        </div>
    </div>
}