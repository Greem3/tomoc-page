"use client"

import { Problem } from "./types"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProblemCardProps {
    problem: Problem
    isSelected: boolean
    onClick: () => void
}

export function ProblemCard({ problem, isSelected, onClick }: ProblemCardProps) {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(`/problemas/${problem.id}`)
        onClick()
    }

    return (
        <div
            onClick={handleClick}
            className={`block p-4 rounded-lg transition-all ${isSelected ? "bg-primary-100 border-primary" : "bg-white hover:bg-gray-50"
                } shadow-sm cursor-pointer`}
        >
            <div className="space-y-2">
                <div>
                    <h3 className="font-semibold text-lg">{problem.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-secondary mt-1">
                        <span>{problem.category}</span>
                        <span>•</span>
                        <span>{problem.difficulty}</span>
                    </div>
                </div>
                <p className="text-sm text-secondary line-clamp-2">{problem.statement}</p>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">{problem.author}</span>
                    <div className="flex items-center gap-4">
                        <span className="text-secondary">{problem.correctSolutions} soluciones</span>
                        <span className="text-secondary">{problem.likes} likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 