"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Eye, EyeOff } from "lucide-react"
import LaTexText from "@/components/Texts/LaTexText"
import { OfficialSolution as OfficialSolutionType } from "../../_components/types"

interface OfficialSolutionProps {
    solution: OfficialSolutionType
    showSolution: boolean
    onToggleSolution: () => void
}

export function OfficialSolution({ solution, showSolution, onToggleSolution }: OfficialSolutionProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-heading">Solución Oficial</h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-secondary">
                        <span>Por: {solution.username}</span>
                        <span className="mx-2">•</span>
                        <span>{solution.date}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onToggleSolution}
                        className="flex items-center gap-2"
                    >
                        {showSolution ? (
                            <>
                                <EyeOff className="h-4 w-4" />
                                Ocultar Solución
                            </>
                        ) : (
                            <>
                                <Eye className="h-4 w-4" />
                                Ver Solución Completa
                            </>
                        )}
                    </Button>
                </div>
            </div>
            {showSolution ? (
                <>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-heading">Explicación del Proceso:</h3>
                        </div>
                        <div className="text-primary leading-relaxed">
                            <LaTexText text={solution.explanation} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-heading">Solución Final:</h3>
                        </div>
                        <div className="text-primary leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <LaTexText text={solution.answer} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-12 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Eye className="h-8 w-8 mx-auto text-blue-400 mb-3" />
                    <p className="text-blue-600 font-medium mb-1">La solución está oculta</p>
                    <p className="text-sm text-blue-500">
                        Intenta resolver el problema por tu cuenta antes de ver la solución oficial
                    </p>
                </div>
            )}
        </div>
    )
} 