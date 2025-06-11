"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import problemTypes from '@/data/problemTypes.json'

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
                    >
                        {problemType.name}
                    </SelectItem>)
                    }
                </SelectContent>
            </Select>
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