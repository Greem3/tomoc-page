import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import 'katex/dist/katex.css';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

export default function MarkdownLaTexEditor({...rest}: MDEditorProps) {

    return (
    <MDEditor
        {...rest}
        previewOptions={
        {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [rehypeKatex]
        }}
    />
  );
}