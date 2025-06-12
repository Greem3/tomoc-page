"use client"

import Loading from "@/components/Loading"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLatestData } from "@/data/getLatestData"
import { IProblemTypes } from "@/interfaces/Views/IProblemTypes"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface SearchFiltersProps {
    searchQuery: string
    categoryFilter: string
    difficultyFilter: string
    onSearchChange: (value: string) => void
    onCategoryChange: (value: string) => void
    onDifficultyChange: (value: string) => void
}

export function SearchFilters({
    searchQuery,
    categoryFilter,
    difficultyFilter,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange
}: SearchFiltersProps) {

    const [problemTypes, setProblemTypes] = useState<IProblemTypes[]>()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getData = async () => {

            const answer = await getLatestData<IProblemTypes[]>('problemTypes.json')

            setProblemTypes(answer ?? []);
            setIsLoading(false);
        }

        getData()
    }, [])

    if (isLoading) {
        // TODO: Change this loading circle to a loading bar, or something better.
        return <Loading/>
    }

    if (!problemTypes) {
        return;
    }

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[300px]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                    <Input
                        placeholder="Buscar problemas..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {problemTypes.map((problemType) => <SelectItem
                            value={problemType.name}
                            key={problemType.id}
                        >
                            {problemType.name}
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>

            {/*TODO: Reemplazar este Select con un rango de dificultad que vaya del 1 al 10 */}
            <Select value={difficultyFilter} onValueChange={onDifficultyChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Dificultad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                    <SelectItem value="experto">Experto</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
} 