"use client"

import { useState } from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { olympiads } from "./_components/data"
import { OlympiadCard } from "./_components/OlympiadCard"
import { YearCard } from "./_components/YearCard"
import { ProblemCard } from "./_components/ProblemCard"

export default function OlympiadSection() {
    const [selectedOlympiad, setSelectedOlympiad] = useState<string | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(null)

    const selectedOlympiadData = olympiads.find((o) => o.id === selectedOlympiad)
    const selectedYearData = selectedOlympiadData?.years.find((y) => y.year === selectedYear)

    const goBack = () => {
        if (selectedYear) {
            setSelectedYear(null)
        } else if (selectedOlympiad) {
            setSelectedOlympiad(null)
        }
    }

    const getBreadcrumb = () => {
        const parts = ["Olimpiadas"]
        if (selectedOlympiadData) parts.push(selectedOlympiadData.shortName)
        if (selectedYear) parts.push(selectedYear.toString())
        return parts.join(" > ")
    }

    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 flex items-center gap-4">
                    {(selectedOlympiad || selectedYear) && (
                        <Button variant="ghost" onClick={goBack} className="p-2">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    )}
                    <p className="text-sm text-muted-foreground">{getBreadcrumb()}</p>
                </div>

                {!selectedOlympiad ? (
                    // Lista de olimpiadas
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {olympiads && olympiads.map((olympiad) => (
                            <OlympiadCard
                                key={olympiad.id}
                                olympiad={olympiad}
                                onClick={() => setSelectedOlympiad(olympiad.id)}
                            />
                        ))}
                    </div>
                ) : !selectedYear && selectedOlympiadData ? (
                    // Lista de años de una olimpiada
                    <div>
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedOlympiadData.name}</h2>
                                        <p className="text-muted-foreground">{selectedOlympiadData.description}</p>
                                    </div>
                                    {selectedOlympiadData.website && (
                                        <a
                                            href={selectedOlympiadData.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Sitio web oficial
                                        </a>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {selectedOlympiadData.years && selectedOlympiadData.years.map((year) => (
                                <YearCard
                                    key={year.year}
                                    year={year}
                                    onClick={() => setSelectedYear(year.year)}
                                />
                            ))}
                        </div>
                    </div>
                ) : selectedYearData ? (
                    // Lista de problemas de un año específico
                    <div>
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {selectedOlympiadData?.shortName} {selectedYear}
                                        </h2>
                                        <p className="text-muted-foreground">{selectedYearData.location}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {selectedYearData.problems && selectedYearData.problems.map((problem) => (
                                <ProblemCard key={problem.id} problem={problem} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
