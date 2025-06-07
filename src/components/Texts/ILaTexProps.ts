import { MathJaxProps } from "better-react-mathjax";

export interface ILaTexProps extends MathJaxProps {
    children?: string[]|string;
    className?: string;
}