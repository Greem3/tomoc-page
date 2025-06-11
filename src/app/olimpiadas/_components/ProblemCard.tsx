import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { Problem } from "../../problemas/_components/types"
import Link from "next/link"

interface ProblemCardProps {
    problem: Problem
}

export function ProblemCard({ problem }: ProblemCardProps) {
    return (
        <Link href={`/problemas/${problem.id}`} className="block">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{problem.title}</h3>
                        <Badge
                            variant={
                                problem.difficulty === "Fácil"
                                    ? "default"
                                    : problem.difficulty === "Intermedio"
                                        ? "secondary"
                                        : "destructive"
                            }
                        >
                            {problem.difficulty}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Badge variant="outline">{problem.category}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            <span>{problem.correctSolutions} soluciones correctas</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
} 