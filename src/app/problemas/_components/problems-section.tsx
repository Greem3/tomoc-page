"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import { ProblemCard } from "./ProblemCard"
import { problems } from "./problems-data"

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
                        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-button-primary hover:bg-default-400">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Subir Problema
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Subir Nuevo Problema</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Título del Problema</Label>
                                        <Input id="title" placeholder="Ingresa el título del problema" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="category">Categoría</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona categoría" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="algebra">Álgebra</SelectItem>
                                                    <SelectItem value="geometria">Geometría</SelectItem>
                                                    <SelectItem value="teoria-de-numeros">Teoría de Números</SelectItem>
                                                    <SelectItem value="combinatoria">Combinatoria</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="difficulty">Dificultad</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona dificultad" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="principiante">Principiante</SelectItem>
                                                    <SelectItem value="intermedio">Intermedio</SelectItem>
                                                    <SelectItem value="avanzado">Avanzado</SelectItem>
                                                    <SelectItem value="experto">Experto</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="statement">Enunciado del Problema</Label>
                                        <Textarea
                                            id="statement"
                                            rows={4}
                                            placeholder="Usa $...$ para matemáticas inline y $$...$$ para ecuaciones centradas. Ejemplo: $x^2 + y^2 = z^2$"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="explanation">Explicación/Pistas</Label>
                                        <Textarea
                                            id="explanation"
                                            rows={3}
                                            placeholder="Proporciona pistas usando LaTeX. Ejemplo: La identidad $(a+b)^2 = a^2 + 2ab + b^2$..."
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="solution">Solución Oficial</Label>
                                        <Textarea
                                            id="solution"
                                            rows={4}
                                            placeholder="Escribe la solución completa con LaTeX. Usa $$...$$ para ecuaciones importantes."
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                                            Cancelar
                                        </Button>
                                        <Button className="bg-button-primary hover:bg-default-400">Publicar Problema</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>




                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex-1 min-w-[300px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                                <Input
                                    placeholder="Buscar problemas..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="algebra">Álgebra</SelectItem>
                                <SelectItem value="geometría">Geometría</SelectItem>
                                <SelectItem value="teoría de números">Teoría de Números</SelectItem>
                                <SelectItem value="combinatoria">Combinatoria</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
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
