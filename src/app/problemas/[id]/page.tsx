"use client"

import { Problem } from "../_components/types"
import { ProblemDetail } from "../_components/ProblemDetail"
import { problems } from "../_components/problems-data"
import { notFound, useParams } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}

export default function ProblemPage() {
    const { id } = useParams()

    const problemId = Number(id)

    // Validar que el ID sea un número válido
    if (isNaN(problemId)) {
        notFound()
    }

    const problem = problems.find((p) => p.id === problemId)

    // Si no se encuentra el problema, redirigir a 404
    if (!problem) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <ProblemDetail
                        problem={problem}
                        showSolutionDialog={false}
                        setShowSolutionDialog={() => { }}
                        isFullPage={true}
                    />
                </div>
            </main>
        </div>
    )
} 