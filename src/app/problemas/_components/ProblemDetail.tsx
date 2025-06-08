"use client"

import { useState } from "react"
import { Problem, Solution, SolutionFormData } from "./types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import LaTexText from "@/components/Texts/LaTexText"
import { ProblemHeader } from "./ProblemHeader"
import { OfficialSolution } from "./OfficialSolution"
import { SolutionItem } from "./SolutionItem"
import { NewSolutionForm } from "./NewSolutionForm"

interface ProblemDetailProps {
    problem: Problem | null
    showSolutionDialog: boolean
    setShowSolutionDialog: (show: boolean) => void
    isFullPage?: boolean
}

export function ProblemDetail({ problem: initialProblem, showSolutionDialog, setShowSolutionDialog, isFullPage = false }: ProblemDetailProps) {
    const [problem, setProblem] = useState(initialProblem)
    const [solutionForm, setSolutionForm] = useState<SolutionFormData>({
        approach: "",
        explanation: "",
        answer: ""
    })
    const [mySolutions, setMySolutions] = useState<Solution[]>([])
    const [showOfficialSolution, setShowOfficialSolution] = useState(false)

    const handleLike = () => {
        if (!problem) return
        setProblem({
            ...problem,
            likes: problem.isLiked ? problem.likes - 1 : problem.likes + 1,
            isLiked: !problem.isLiked
        })
    }

    const handleSubmitSolution = (e: React.FormEvent) => {
        e.preventDefault()

        if (!problem) return

        if (!solutionForm.approach || !solutionForm.explanation || !solutionForm.answer) {
            alert('Por favor completa todos los campos')
            return
        }

        const newSolution: Solution = {
            id: mySolutions.length + 1,
            username: "Usuario",
            date: new Date().toISOString().split('T')[0],
            approach: solutionForm.approach,
            explanation: solutionForm.explanation,
            answer: solutionForm.answer
        }

        setMySolutions([...mySolutions, newSolution])
        setSolutionForm({
            approach: "",
            explanation: "",
            answer: ""
        })
        setShowSolutionDialog(false)
    }

    if (!problem) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-center text-secondary">Selecciona un problema para ver los detalles</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <ProblemHeader
                problem={problem}
                isFullPage={isFullPage}
                onLike={handleLike}
            />

            <Tabs defaultValue="statement" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="statement">Problema</TabsTrigger>
                    <TabsTrigger value="official">Oficial</TabsTrigger>
                    <TabsTrigger value="correct">Correctas</TabsTrigger>
                    <TabsTrigger value="incorrect">Incorrectas</TabsTrigger>
                    <TabsTrigger value="mine">Mis Sol.</TabsTrigger>
                </TabsList>

                <TabsContent value="statement" className="mt-4">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="text-primary leading-relaxed">
                                <LaTexText text={problem.statement} />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="official" className="mt-4">
                    <OfficialSolution
                        solution={problem.officialSolution}
                        showSolution={showOfficialSolution}
                        onToggleSolution={() => setShowOfficialSolution(!showOfficialSolution)}
                    />
                </TabsContent>

                <TabsContent value="correct" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-heading">Soluciones Correctas</h3>
                            <Badge className="bg-green-100 text-green-800">
                                {problem.correctSolutions} soluciones
                            </Badge>
                        </div>
                        <div className="space-y-3">
                            {problem.correctSolutionsList.map((solution) => (
                                <SolutionItem
                                    key={solution.id}
                                    solution={solution}
                                    variant="correct"
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="incorrect" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-heading">Soluciones Incorrectas</h3>
                            <Badge className="bg-red-100 text-red-800">
                                {problem.incorrectSolutions} intentos
                            </Badge>
                        </div>
                        <div className="space-y-4">
                            {problem.incorrectSolutionsList.map((solution) => (
                                <SolutionItem
                                    key={solution.id}
                                    solution={solution}
                                    variant="incorrect"
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="mine" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-heading">Mis Soluciones</h3>
                            <Button onClick={() => setShowSolutionDialog(true)} size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Solución
                            </Button>
                        </div>

                        <Dialog open={showSolutionDialog} onOpenChange={setShowSolutionDialog}>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Nueva Solución</DialogTitle>
                                </DialogHeader>
                                <NewSolutionForm
                                    formData={solutionForm}
                                    onFormChange={(data) => setSolutionForm({ ...solutionForm, ...data })}
                                    onSubmit={handleSubmitSolution}
                                    onCancel={() => setShowSolutionDialog(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <div className="space-y-4">
                            {mySolutions.length > 0 ? (
                                <div className="space-y-4">
                                    {mySolutions.map((solution) => (
                                        <SolutionItem
                                            key={solution.id}
                                            solution={solution}
                                            variant="mine"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-secondary">
                                    <p>Aún no has enviado ninguna solución para este problema.</p>
                                    <Button
                                        className="mt-4"
                                        onClick={() => setShowSolutionDialog(true)}
                                    >
                                        Enviar mi primera solución
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 