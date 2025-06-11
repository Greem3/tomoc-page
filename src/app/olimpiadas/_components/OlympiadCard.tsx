import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe } from "lucide-react"
import { Olympiad } from "./types"

interface OlympiadCardProps {
    olympiad: Olympiad
    onClick: () => void
}

export function OlympiadCard({ olympiad, onClick }: OlympiadCardProps) {
    return (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{olympiad.shortName}</h3>
                        <p className="text-sm text-muted-foreground">{olympiad.name}</p>
                    </div>
                    <Badge variant={olympiad.level === "Internacional" ? "default" : "secondary"}>
                        {olympiad.level}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-4">{olympiad.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    {olympiad.country && (
                        <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <span>{olympiad.country}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{olympiad.years.length} años</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 