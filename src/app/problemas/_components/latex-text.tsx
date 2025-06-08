"use client"

import { useEffect, useRef } from "react"

interface LatexTextProps {
    children: string
}

declare global {
    interface Window {
        MathJax: any
    }
}

export default function LatexText({ children }: LatexTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.MathJax && containerRef.current) {
            // Limpiar el contenedor
            containerRef.current.innerHTML = children

            // Procesar las fórmulas
            window.MathJax.typesetPromise([containerRef.current]).catch((err: any) =>
                console.error('Error al renderizar LaTeX:', err)
            )
        }
    }, [children])

    return (
        <div
            ref={containerRef}
            className="latex-container prose prose-slate max-w-none"
        />
    )
} 