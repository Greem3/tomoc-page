import { MathJax } from "better-react-mathjax";
import { ILaTexProps } from "./ILaTexProps";

export default function LaTexText({ text, children, className, inline, dynamic, onInitTypeset, onTypeset }: ILaTexProps) {

    return <MathJax
        className={className}
        inline={inline}
        dynamic={dynamic}
        onInitTypeset={onInitTypeset}
        onTypeset={onTypeset}
    >
        {children ?? text}
    </MathJax>
}