/* eslint-disable */
import { HTMLAttributes } from "react";
import Markdown, { Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";

interface MarkdownComponentProps extends HTMLAttributes<HTMLElement> {
    node: any
    children: React.ReactNode;
}

interface ITOMOCMarkdownProps {
    children: string;
    className?: string;
    components?: Components
}

export default function LaTexMarkdown({ className, components, children }: ITOMOCMarkdownProps) {
    return <div className={className}>
        <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                //@ts-expect-error Actually, this don't throw a error
                h1: ({node, ...props}: MarkdownComponentProps) => {
                    const text = node.children.map((child: any) => child.value).join("");
                    return <strong style={{fontSize: '1.5rem'}} {...props}>{text}</strong>
                },
                //@ts-expect-error Actually, this don't throw a error
                h2: ({node, ...props}: MarkdownComponentProps) => {
                    const text = node.children.map((child: any) => child.value).join('');
                    return <strong style={{fontSize: '1.0rem'}} {...props}>{text}</strong>
                },
                ...components
            }}
        >
            {children}
        </Markdown>
    </div> 
}