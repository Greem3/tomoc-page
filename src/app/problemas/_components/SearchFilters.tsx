"use client"

import Loading from "@/components/Loading"
import RangeInput from "@/components/Sliders/RangeSlider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLatestData } from "@/data/getLatestData"
import { IProblemTypes } from "@/interfaces/Views/IProblemTypes"
import { RangeList } from "@/types/RangeList"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface SearchFiltersProps {
    searchQuery: string
    categoryFilter: string
    difficultyFilter: RangeList;
    onSearchChange: (value: string) => void
    onCategoryChange: (value: string) => void
    onDifficultyChange: (value: RangeList) => void
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

            const answer = await getLatestData<IProblemTypes[]>('ProblemTypes')

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

            {/*TODO: Arreglar el range Input por que no se como diseñarlo XD */}
            <div className='w-64 self-center flex flex-col items-center -mt-4'>
                <p className='opacity-40 transition-opacity duration-700 hover:opacity-100'>Rango de dificultad</p>

                <div className='max-w-64 w-full flex items-center gap-2'>
                    <span>
                        {difficultyFilter[0]}
                    </span>
                    <RangeInput
                        min={0}
                        max={10}
                        defaultValue={[0, 10]}
                        onInput={onDifficultyChange}
                        className='w-full'
                    />
                    <span>
                        {difficultyFilter[1]}
                    </span>
                </div>
            </div>
        </div>
    )
} 