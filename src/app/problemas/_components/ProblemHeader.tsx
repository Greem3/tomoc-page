"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Problem } from "./types"

interface ProblemHeaderProps {
    problem: Problem
    isFullPage?: boolean
    onLike: () => void
}

export function ProblemHeader({ problem, isFullPage, onLike }: ProblemHeaderProps) {
    return (
        <div className="space-y-6">
            {isFullPage && (
                <Link href="/problemas" className="inline-flex items-center text-secondary hover:text-primary">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a la lista
                </Link>
            )}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">{problem.title}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onLike}
                        className={`flex items-center gap-2 ${problem.isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
                    >
                        <Heart className={`h-5 w-5 ${problem.isLiked ? 'fill-current' : ''}`} />
                        <span>{problem.likes}</span>
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-secondary">
                    <span>{problem.category}</span>
                    <span>•</span>
                    <span>{problem.difficulty}</span>
                    <span>•</span>
                    <span>{problem.author}</span>
                </div>
            </div>
        </div>
    )
} 