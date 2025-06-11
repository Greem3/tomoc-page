import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Globe, BookOpen } from "lucide-react"
import { OlympiadYear } from "./types"

interface YearCardProps {
    year: OlympiadYear
    onClick: () => void
}

export function YearCard({ year, onClick }: YearCardProps) {
    return (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <CardHeader>
                <h3 className="text-xl font-semibold">{year.year}</h3>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{year.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{year.problems.length} problemas</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 