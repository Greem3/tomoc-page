"use client"

import LaTexMarkdown from "@/components/Texts/LaTexMarkdown"
import { Problem } from "./types"
import { useRouter } from "next/navigation"
import IVProblems from "@/interfaces/Views/IVProblems"

interface ProblemCardProps {
    problem: IVProblems
}

export function ProblemCard({ problem }: ProblemCardProps) {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(`/problemas/${problem.id}`)
    }

    return (
        <div
            onClick={handleClick}
            className={`block p-4 rounded-lg transition-all shadow-sm cursor-pointer`}
        >
            <div className="space-y-2">
                <div>
                    <h3 className="font-semibold text-lg">{problem.problem_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-secondary mt-1">
                        <span>{problem.problem_type_name}</span>
                        <span>•</span>
                        <span>{problem.difficulty}</span>
                    </div>
                </div>
                <LaTexMarkdown className="text-sm text-secondary line-clamp-2">{problem.explication}</LaTexMarkdown>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">{problem.author}</span>
                    <div className="flex items-center gap-4">
                        {/* <span className="text-secondary">{problem.correctSolutions} soluciones</span>
                        <span className="text-secondary">{problem.likes} likes</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
} 