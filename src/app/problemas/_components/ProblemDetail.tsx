"use client"

import { Problem } from "./types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Plus, Send } from "lucide-react"
import Link from "next/link"
import LatexText from "./latex-text"

interface ProblemDetailProps {
    problem: Problem | null
    showSolutionDialog: boolean
    setShowSolutionDialog: (show: boolean) => void
    isFullPage?: boolean
}

export function ProblemDetail({ problem, showSolutionDialog, setShowSolutionDialog, isFullPage = false }: ProblemDetailProps) {
    if (!problem) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-center text-secondary">Selecciona un problema para ver los detalles</p>
            </div>
        )
    }

    const validateSolution = (answer: string, officialAnswer: string) => {
        // Aquí puedes implementar la lógica de validación específica
        // Por ejemplo, podrías:
        // 1. Normalizar ambas cadenas (eliminar espacios extra, convertir a minúsculas)
        // 2. Comparar números si son respuestas numéricas
        // 3. Comparar expresiones matemáticas si es necesario
        return answer.trim().toLowerCase() === officialAnswer.trim().toLowerCase();
    };

    const handleSubmitSolution = (formData: {
        approach: string;
        explanation: string;
        answer: string;
    }) => {
        if (!problem) return;

        const isCorrect = validateSolution(formData.answer, problem.officialSolution.answer);

        const newSolution: Solution = {
            id: (problem.mySolutionsList?.length || 0) + 1,
            userId: "currentUser",
            username: "TúMismo",
            date: new Date().toISOString().split('T')[0],
            approach: formData.approach,
            status: isCorrect ? 'correct' : 'incorrect',
            explanation: formData.explanation,
            answer: formData.answer,
            feedback: isCorrect
                ? "¡Correcto! Tu solución coincide con la respuesta esperada."
                : "La respuesta no coincide con la solución esperada. Revisa tu procedimiento."
        };

        // Aquí irían las llamadas a la API para guardar la solución
        console.log('Nueva solución:', newSolution);
    };

    const content = (
        <>
            <div className="space-y-6">
                {isFullPage && (
                    <Link href="/problemas" className="inline-flex items-center text-secondary hover:text-primary">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a la lista
                    </Link>
                )}
                <div>
                    <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-secondary">
                        <span>{problem.category}</span>
                        <span>•</span>
                        <span>{problem.difficulty}</span>
                        <span>•</span>
                        <span>{problem.author}</span>
                    </div>
                </div>

                <Tabs defaultValue="statement" className="w-full">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="statement">Problema</TabsTrigger>
                        <TabsTrigger value="explanation">Explicación</TabsTrigger>
                        <TabsTrigger value="official">Oficial</TabsTrigger>
                        <TabsTrigger value="correct">Correctas</TabsTrigger>
                        <TabsTrigger value="incorrect">Incorrectas</TabsTrigger>
                        <TabsTrigger value="mine">Mis Sol.</TabsTrigger>
                    </TabsList>

                    <TabsContent value="statement" className="mt-4">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-heading">Enunciado:</h3>
                            <div className="text-primary leading-relaxed">
                                <LatexText>{problem.statement}</LatexText>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="explanation" className="mt-4">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-heading">Explicación y Pistas:</h3>
                            <div className="text-primary leading-relaxed">
                                <LatexText>{problem.explanation}</LatexText>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="official" className="mt-4">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <h3 className="font-semibold text-heading">Explicación del Proceso:</h3>
                                </div>
                                <div className="text-primary leading-relaxed">
                                    <LatexText>{problem.officialSolution.explanation}</LatexText>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-heading">Solución Final:</h3>
                                </div>
                                <div className="text-primary leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <LatexText>{problem.officialSolution.answer}</LatexText>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="correct" className="mt-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <h3 className="font-semibold text-heading">Soluciones Correctas</h3>
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                    {problem.correctSolutions} soluciones
                                </Badge>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-green-800">Usuario: MathGenius2024</span>
                                        <span className="text-sm text-green-600">Hace 2 días</span>
                                    </div>
                                    <div className="text-green-700 text-sm">
                                        <LatexText>
                                            Excelente enfoque usando la identidad $a^3 + b^3 = (a+b)(a^2-ab+b^2)$...
                                        </LatexText>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="incorrect" className="mt-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <h3 className="font-semibold text-heading">Soluciones Incorrectas</h3>
                                </div>
                                <Badge className="bg-red-100 text-red-800">
                                    {problem.incorrectSolutions} intentos
                                </Badge>
                            </div>
                            <div className="space-y-4">
                                {problem.incorrectSolutionsList.map((solution) => (
                                    <div key={solution.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="space-y-1">
                                                <span className="font-medium text-red-800">
                                                    Usuario: {solution.username}
                                                </span>
                                                <div className="flex items-center space-x-2 text-sm text-red-600">
                                                    <span>Enfoque: {solution.approach}</span>
                                                    <span>•</span>
                                                    <span>{solution.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-red-700">
                                            <p className="text-sm font-medium mb-2">Error Identificado:</p>
                                            <div className="text-sm">
                                                <LatexText>{solution.content}</LatexText>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="mine" className="mt-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-heading">Mis Soluciones</h3>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-button-primary hover:bg-default-400">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Nueva Solución
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>Enviar Solución</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="problem-title" className="text-heading font-medium">
                                                    Problema
                                                </Label>
                                                <div id="problem-title" className="mt-1 text-primary">
                                                    {problem.title}
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="solution-approach">Enfoque de Solución</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona tu enfoque" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="algebraic">Algebraico</SelectItem>
                                                        <SelectItem value="geometric">Geométrico</SelectItem>
                                                        <SelectItem value="combinatorial">Combinatorio</SelectItem>
                                                        <SelectItem value="number-theory">Teoría de Números</SelectItem>
                                                        <SelectItem value="other">Otro</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="solution-explanation">Explicación del Proceso</Label>
                                                <Textarea
                                                    id="solution-explanation"
                                                    rows={8}
                                                    placeholder="Explica detalladamente el proceso que seguiste para resolver el problema. Usa $...$ para matemáticas inline y $$...$$ para ecuaciones centradas."
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="solution-answer">Solución Final</Label>
                                                <Textarea
                                                    id="solution-answer"
                                                    rows={3}
                                                    placeholder="Escribe tu respuesta final de forma concisa. Por ejemplo: 'La solución es x = 5' o 'Existen exactamente 3 configuraciones posibles'."
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-secondary">
                                                <input type="checkbox" id="solution-public" className="rounded text-button-primary" />
                                                <Label htmlFor="solution-public">Hacer mi solución pública si es correcta</Label>
                                            </div>
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="outline">
                                                    Cancelar
                                                </Button>
                                                <Button className="bg-button-primary hover:bg-default-400">
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Enviar Solución
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {problem.mySolutionsList && problem.mySolutionsList.length > 0 ? (
                                <div className="space-y-6">
                                    {problem.mySolutionsList.map((solution) => (
                                        <div
                                            key={solution.id}
                                            className={`p-6 rounded-lg border ${solution.status === 'correct'
                                                ? 'bg-green-50 border-green-200'
                                                : 'bg-red-50 border-red-200'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium">Intento #{solution.id}</span>
                                                        <Badge
                                                            className={
                                                                solution.status === 'correct'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }
                                                        >
                                                            {solution.status === 'correct' ? 'Correcto' : 'Incorrecto'}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-secondary">
                                                        <span>Enfoque: {solution.approach}</span>
                                                        <span>•</span>
                                                        <span>{solution.date}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Explicación del Proceso:</h4>
                                                    <div className="text-sm">
                                                        <LatexText>{solution.explanation}</LatexText>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium mb-2">Tu Respuesta:</h4>
                                                    <div className="text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                                                        <LatexText>{solution.answer}</LatexText>
                                                    </div>
                                                </div>

                                                {solution.feedback && (
                                                    <div className={`mt-4 p-4 rounded-lg ${solution.status === 'correct'
                                                        ? 'bg-green-50 text-green-800'
                                                        : 'bg-red-50 text-red-800'
                                                        }`}>
                                                        <h4 className="font-medium mb-2">Resultado de la Validación:</h4>
                                                        <div className="text-sm">
                                                            <LatexText>{solution.feedback}</LatexText>
                                                        </div>
                                                    </div>
                                                )}

                                                {solution.status === 'incorrect' && (
                                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                        <h4 className="font-medium mb-2 text-blue-800">Solución Esperada:</h4>
                                                        <div className="text-sm text-blue-700">
                                                            <LatexText>{problem.officialSolution.answer}</LatexText>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-secondary">
                                    <p>Aún no has enviado ninguna solución para este problema.</p>
                                    <Button
                                        className="mt-4 bg-button-primary hover:bg-default-400"
                                        onClick={() => setShowSolutionDialog(true)}
                                    >
                                        Enviar mi primera solución
                                    </Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )

    if (isFullPage) {
        return <div className="p-8 bg-white rounded-lg shadow-sm">{content}</div>
    }

    return <div className="p-6 bg-white rounded-lg shadow-sm">{content}</div>
} 