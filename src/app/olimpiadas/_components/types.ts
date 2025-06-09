import { Problem } from "../../problemas/_components/types"

export type OlympiadYear = {
    year: number
    location: string
    problems: Problem[]
}

export type Olympiad = {
    id: string
    name: string
    shortName: string
    description: string
    level: "Nacional" | "Internacional" | "Regional"
    country?: string
    website?: string
    years: OlympiadYear[]
} 