"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import LaTexText from "@/components/Texts/LaTexText"
import { SolutionFormData } from "./types"

interface NewSolutionFormProps {
    formData: SolutionFormData
    onFormChange: (data: Partial<SolutionFormData>) => void
    onSubmit: (e: React.FormEvent) => void
    onCancel: () => void
}

export function NewSolutionForm({ formData, onFormChange, onSubmit, onCancel }: NewSolutionFormProps) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-2">
                <Label>Enfoque</Label>
                <Select
                    value={formData.approach}
                    onValueChange={(value) => onFormChange({ approach: value })}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un enfoque" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="algebraic">Algebraico</SelectItem>
                        <SelectItem value="geometric">Geométrico</SelectItem>
                        <SelectItem value="numeric">Numérico</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Explicación del Proceso</Label>
                <div className="space-y-1">
                    <Textarea
                        placeholder="Explica paso a paso cómo resolviste el problema..."
                        value={formData.explanation}
                        onChange={(e) => onFormChange({ explanation: e.target.value })}
                        required
                        rows={6}
                        className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                        Usa LaTeX para las fórmulas matemáticas. Por ejemplo: $x^2$ o $$\frac{1}{2}$$
                    </p>
                    {formData.explanation && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium mb-1">Vista previa:</p>
                            <LaTexText>{formData.explanation}</LaTexText>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Solución Final</Label>
                <div className="space-y-1">
                    <Textarea
                        placeholder="Escribe tu respuesta final..."
                        value={formData.answer}
                        onChange={(e) => onFormChange({ answer: e.target.value })}
                        required
                        rows={3}
                        className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                        Escribe tu respuesta de forma clara y concisa. Usa LaTeX para las fórmulas.
                    </p>
                    {formData.answer && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium mb-1">Vista previa:</p>
                            <LaTexText>{formData.answer}</LaTexText>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
                <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Solución
                </Button>
            </div>
        </form>
    )
} 