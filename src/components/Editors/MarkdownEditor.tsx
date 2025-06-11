"use client"

import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorProps,
    type MDXEditorMethods
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import type { ForwardedRef } from 'react'

export default function MarkdownEditor({
    editorRef,
    ...props
    }: MDXEditorProps & {editorRef?: ForwardedRef<MDXEditorMethods> | null}) {
    
    return <MDXEditor
        {...props}
        plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin()
        ]}
        ref={editorRef}
    />
}