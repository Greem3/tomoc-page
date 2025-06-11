"use client"

import LaTexText from "@/components/Texts/LaTexText"
import { Solution } from "./types"

interface SolutionItemProps {
    solution: Solution
    variant: "correct" | "incorrect" | "mine"
}

const variantStyles = {
    correct: {
        container: "bg-green-50 border-green-200",
        text: "text-green-800",
        subtext: "text-green-600"
    },
    incorrect: {
        container: "bg-red-50 border-red-200",
        text: "text-red-800",
        subtext: "text-red-600"
    },
    mine: {
        container: "bg-blue-50 border-blue-200",
        text: "text-blue-800",
        subtext: "text-blue-600"
    }
}

export function SolutionItem({ solution, variant }: SolutionItemProps) {
    const styles = variantStyles[variant]

    return (
        <div className={`p-4 rounded-lg border ${styles.container}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                    <span className={`font-medium ${styles.text}`}>
                        {variant === "mine" ? `Solución #${solution.id}` : `Usuario: ${solution.username}`}
                    </span>
                    <div className={`flex items-center space-x-2 text-sm ${styles.subtext}`}>
                        <span>Enfoque: {solution.approach}</span>
                        <span>•</span>
                        <span>{solution.date}</span>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Explicación del Proceso:</h4>
                    <div className="text-sm">
                        <LaTexText text={solution.explanation} />
                    </div>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Solución Final:</h4>
                    <div className="text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                        <LaTexText text={solution.answer} />
                    </div>
                </div>
            </div>
        </div>
    )
} 