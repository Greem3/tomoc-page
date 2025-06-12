"use client"

import { ReactNode, useState } from "react"
import { Problem, Solution, SolutionFormData } from "../../_components/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import LaTexText from "@/components/Texts/LaTexText"
import { ProblemHeader } from "./ProblemHeader"
import { OfficialSolution } from "./OfficialSolution"
import { SolutionItem } from "../../_components/SolutionItem"
import { NewSolutionForm } from "./NewSolutionForm"
import TabsSection from "@/components/Tabs/TabsSection"

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

    const tabs = ['Problema', 'Oficial', 'Correctas', 'Incorrectas', 'Mis Sol.']

    function SpaceDiv({ children }: { children?: ReactNode }) {
        return <div className='space-y-4'>{children}</div>
    }

    return (
        <div className="space-y-6">
            <ProblemHeader
                problem={problem}
                isFullPage={isFullPage}
                onLike={handleLike}
            />

            <TabsSection
                className="w-full"
                tabsListProps={{ className:'flex w-full' }}
                allTabsContentClassName="mt-4"
                tabs={{
                    //region PROBLEMA
                    Problema: {
                        content: <div className='space-y-6'>
                            <SpaceDiv>
                                <div>
                                    <LaTexText>{problem.statement}</LaTexText>
                                </div>
                            </SpaceDiv>
                        </div>
                    },
                    //region OFICIALES
                    Oficial: {
                        content: <OfficialSolution
                            solution={problem.officialSolution}
                            showSolution={showOfficialSolution}
                            onToggleSolution={() => setShowOfficialSolution(!showOfficialSolution)}
                        />
                    },
                    //region CORRECTAS
                    Correctas: {
                        content: <SpaceDiv>
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
                        </SpaceDiv>
                    },
                    //region INCORRECTAS
                    Incorrectas: {
                        content: <SpaceDiv>
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-heading">Soluciones Incorrectas</h3>
                                <Badge className="bg-red-100 text-red-800">
                                    {problem.incorrectSolutions} intentos
                                </Badge>
                            </div>
                            <SpaceDiv>
                                {problem.incorrectSolutionsList.map((solution) => (
                                    <SolutionItem
                                        key={solution.id}
                                        solution={solution}
                                        variant="incorrect"
                                    />
                                ))}
                            </SpaceDiv>
                        </SpaceDiv>
                    },
                    //region MIS SOLUCIONES
                    'Mis Sol.': {
                        content: <SpaceDiv>
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

                            <SpaceDiv>
                                {mySolutions.length > 0 ? (
                                    <SpaceDiv>
                                        {mySolutions.map((solution) => (
                                            <SolutionItem
                                                key={solution.id}
                                                solution={solution}
                                                variant="mine"
                                            />
                                        ))}
                                    </SpaceDiv>
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
                            </SpaceDiv>
                        </SpaceDiv>
                    }
                }}
            />
        </div>
    )
} 