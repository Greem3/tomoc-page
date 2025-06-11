"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface UploadProblemDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UploadProblemDialog({ open, onOpenChange }: UploadProblemDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button className="bg-button-primary hover:bg-default-400">Publicar Problema</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 