"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ProblemCard } from "./ProblemCard"
import { problems } from "./problems-data"
import { SearchFilters } from "./SearchFilters"
import { UploadProblemDialog } from "./UploadProblemDialog"

export default function ProblemsSection() {
    const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
    const [showUploadDialog, setShowUploadDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [difficultyFilter, setDifficultyFilter] = useState("all")

    const filteredProblems = useMemo(() => {
        let result = [...problems]

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (problem) =>
                    problem.title.toLowerCase().includes(query) ||
                    problem.statement.toLowerCase().includes(query) ||
                    problem.category.toLowerCase().includes(query) ||
                    problem.author.toLowerCase().includes(query),
            )
        }

        if (categoryFilter !== "all") {
            result = result.filter((problem) => problem.category.toLowerCase() === categoryFilter.toLowerCase())
        }

        if (difficultyFilter !== "all") {
            result = result.filter((problem) => problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase())
        }

        return result
    }, [searchQuery, categoryFilter, difficultyFilter])

    const clearFilters = () => {
        setSearchQuery("")
        setCategoryFilter("all")
        setDifficultyFilter("all")
    }

    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-heading">Problemas de Olimpiada</h1>
                        <UploadProblemDialog
                            open={showUploadDialog}
                            onOpenChange={setShowUploadDialog}
                        />
                    </div>

                    <SearchFilters
                        searchQuery={searchQuery}
                        categoryFilter={categoryFilter}
                        difficultyFilter={difficultyFilter}
                        onSearchChange={setSearchQuery}
                        onCategoryChange={setCategoryFilter}
                        onDifficultyChange={setDifficultyFilter}
                    />
                </div>

                <div className="grid gap-4">
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map((problem) => (
                            <ProblemCard
                                key={problem.id}
                                problem={problem}
                                isSelected={selectedProblem === problem.id}
                                onClick={() => setSelectedProblem(problem.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-secondary">
                            <p>No se encontraron problemas con los filtros seleccionados.</p>
                            <Button variant="outline" className="mt-4" onClick={clearFilters}>
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
