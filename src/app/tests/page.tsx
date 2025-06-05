"use client"

import MarkdownEditor from "@/components/Editors/MarkdownEditor";
import { useState } from "react";

export default function Tests() {

    const [text, setText] = useState('Initial Textx')

    return <div className='w-full h-full flex justify-center items-center align-center'>
        <MarkdownEditor
            markdown={text}
            onChange={setText}
        />
    </div>
}