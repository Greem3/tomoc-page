"use client"

import MarkdownEditor from "@/components/Editors/MarkdownEditor";
import MarkdownLaTexEditor from "@/components/Editors/MarkdownLaTexEditor";
import TabsSection from "@/components/Tabs/TabsSection";
import { useState } from "react";

export default function Tests() {

    const [text, setText] = useState('Initial Textx')

    return <div className='w-full h-full flex flex-col gap-6 justify-center items-center align-center'>
        <TabsSection
            allTabsContentClassName="mt-4"
            tabsListProps={{className: 'flex w-full gap-4'}}
            tabs={{
                "Problema": {
                    content: <>
                        <p>
                            Un Ejemplo lol
                        </p>
                    </>
                },
                "Soluciones Oficiales": {
                    content: <>
                        <p>
                            Otro ejemplo lol
                        </p>
                    </>
                }
            }}
        />

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