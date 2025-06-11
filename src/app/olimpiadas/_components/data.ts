import { problems } from "../../problemas/_components/problems-data"
import { Olympiad } from "./types"

export const olympiads: Olympiad[] = [
    {
        id: "imo",
        name: "Olimpiada Internacional de Matemáticas",
        shortName: "IMO",
        description: "La competencia matemática más prestigiosa para estudiantes de secundaria a nivel mundial.",
        level: "Internacional",
        website: "https://jhjhhhjhjh",
        years: [
            {
                year: 2024,
                location: "Bath, Reino Unido",
                problems: problems.filter(p => p.id <= 2) // Primeros 2 problemas
            },
            {
                year: 2023,
                location: "Chiba, Japón",
                problems: problems.filter(p => p.id >= 2) // Últimos 2 problemas
            }
        ]
    },
    {
        id: "omm",
        name: "Olimpiada Mexicana de Matemáticas",
        shortName: "OMM",
        description: "La competencia nacional de matemáticas más importante de México para estudiantes de secundaria y preparatoria.",
        level: "Nacional",
        country: "México",
        years: [
            {
                year: 2024,
                location: "Ciudad de México",
                problems: problems.slice(0, 3) // Todos los problemas
            }
        ]
    }
] 