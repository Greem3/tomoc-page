"use client"

import MarkdownEditor from "@/components/Editors/MarkdownEditor";
import MarkdownLaTexEditor from "@/components/Editors/MarkdownLaTexEditor";
import { useState } from "react";

export default function Tests() {

    const [text, setText] = useState('Initial Textx')

    return <div className='w-full h-full flex flex-col gap-6 justify-center items-center align-center'>
        <MarkdownEditor
            markdown={text}
            onChange={setText}
        />
        <MarkdownLaTexEditor
            value={text}
            onChange={(e) => setText(e ?? '')}
        />
    </div>
}