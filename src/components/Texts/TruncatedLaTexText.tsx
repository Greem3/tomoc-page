import { MathJax } from "better-react-mathjax";
import { ILaTexProps } from "./ILaTexProps";

interface ITruncatedLaTexProps extends ILaTexProps {
    truncateLine?: number
}

export default function TruncatedLatexText({ text, truncateLine = 1, children, className, inline, dynamic, onInitTypeset, onTypeset } : ITruncatedLaTexProps) {
    return <MathJax
        className={className}
        inline={inline}
        dynamic={dynamic}
        onInitTypeset={onInitTypeset}
        onTypeset={onTypeset}
        style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: truncateLine
        }}
    >
        {children ?? text}
    </MathJax>
}