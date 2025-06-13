"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProblemCard } from "./ProblemCard"
import { SearchFilters } from "./SearchFilters"
import { UploadProblemDialog } from "./UploadProblemDialog"
import Loading from "@/components/Loading"
import { getLatestData } from "@/data/getLatestData"
import IVProblems from "@/interfaces/Views/IVProblems"
import { inRange } from "@/functions/inRange"
import { RangeList } from "@/types/RangeList"

export default function ProblemsSection() {
    const [problems, setProblems] = useState<IVProblems[]>([]);
    const [showUploadDialog, setShowUploadDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    
    const defaultDifficultyFilter: RangeList = [0, 10]
    const [difficultyFilter, setDifficultyFilter] = useState<RangeList>(defaultDifficultyFilter)

    const [isLoading, setIsLoading] = useState(true);

    const filteredProblems = useMemo(() => {
        let result = [...problems]

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (problem) =>
                    query && problem.problem_name.toLowerCase().includes(query) ||
                    problem.explication.toLowerCase().includes(query) ||
                    problem.problem_type_name.toLowerCase().includes(query) ||
                    problem.author.toLowerCase().includes(query),
            )
        }

        if (categoryFilter !== "all") {
            result = result.filter((problem) => problem.problem_type_name.toLowerCase() === categoryFilter.toLowerCase())
        }

        result = result.filter((problem) => inRange(problem.difficulty, difficultyFilter))

        return result
    }, [searchQuery, categoryFilter, difficultyFilter, problems])

    const clearFilters = () => {
        setSearchQuery("")
        setCategoryFilter("all")
        setDifficultyFilter(defaultDifficultyFilter)
    }

    useEffect(() => {

        const getProblems = async () => {

            const answer = await getLatestData<IVProblems[]>('VProblems')

            setProblems(answer);
            setIsLoading(false);
        }

        getProblems()
    }, [])

    if (isLoading) {
        return <Loading/>
    }

    if (!problems) {
        return;
    }

    console.log(problems)

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
