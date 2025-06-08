import { Problem } from "./types"

export const problems: Problem[] = [
    {
        id: 1,
        title: "Derivada de una Función Exponencial",
        category: "Cálculo",
        difficulty: "Intermedio",
        author: "Prof. García",
        statement: `En una investigación sobre el crecimiento poblacional de bacterias, se ha observado que la población sigue una función exponencial combinada con un término cuadrático:

cachu
$$
P(t) = e^{2t} + 3t^2
$$

donde:
- cachu $$P(t)$$ representa la población de bacterias (en miles)
- cachu $$t$$ es el tiempo transcurrido (en horas)

Se necesita:
1) Encontrar la tasa de crecimiento de la población en cualquier momento cachu $$t$$, es decir, hallar cachu $$P'(t)$$.
2) Explicar el significado de cada término en la derivada resultante.

**Nota**: Recuerda que la derivada nos dará la velocidad instantánea de crecimiento de la población.`,
        explanation: "Para resolver este problema, aplicaremos las reglas de derivación paso a paso, interpretando cada término en el contexto del crecimiento poblacional.",
        correctSolutions: 2,
        incorrectSolutions: 1,
        likes: 15,
        isLiked: false,
        officialSolution: {
            username: "Prof. García",
            date: "2024-03-15",
            explanation: `Resolveremos esto paso a paso:

1) Primero, identificamos las partes de la función:
   - Término exponencial: cachu $$e^{2t}$$
   - Término cuadrático: cachu $$3t^2$$

2) Derivamos cada término:
   - Para cachu $$e^{2t}$$, usamos la regla de la cadena:
     * La derivada de cachu $$e^x$$ es cachu $$e^x$$
     * Como tenemos cachu $$e^{2t}$$, multiplicamos por la derivada del exponente (2)
     * Por lo tanto:
     cachu
     $$
     \\frac{d}{dt}(e^{2t}) = 2e^{2t}
     $$
   
   - Para cachu $$3t^2$$, usamos la regla de la potencia:
     * La derivada de cachu $$t^n$$ es cachu $$nt^{n-1}$$
     * Por lo tanto:
     cachu
     $$
     \\frac{d}{dt}(3t^2) = 6t
     $$

3) Sumamos los términos:
cachu
$$
P'(t) = 2e^{2t} + 6t
$$

Interpretación biológica:
- El término cachu $$2e^{2t}$$ representa el crecimiento exponencial rápido inicial
- El término cachu $$6t$$ representa un crecimiento adicional que aumenta linealmente con el tiempo`,
            answer: "cachu $$P'(t) = 2e^{2t} + 6t$$"
        },
        correctSolutionsList: [
            {
                id: 1,
                username: "Ana",
                date: "2024-03-16",
                approach: "algebraic",
                explanation: `Primero derivé cachu $$e^{2t}$$ usando la regla de la cadena, obteniendo cachu $$2e^{2t}$$. Luego derivé cachu $$3t^2$$ usando la regla de la potencia, obteniendo cachu $$6t$$.`,
                answer: "cachu $$P'(t) = 2e^{2t} + 6t$$"
            },
            {
                id: 2,
                username: "Carlos",
                date: "2024-03-17",
                approach: "algebraic",
                explanation: `Apliqué las reglas de derivación por separado para cada término:
cachu
$$
\\begin{align*}
\\frac{d}{dt}(e^{2t}) &= 2e^{2t} \\\\
\\frac{d}{dt}(3t^2) &= 6t
\\end{align*}
$$
Y luego sumé los resultados.`,
                answer: "cachu $$P'(t) = 2e^{2t} + 6t$$"
            }
        ],
        incorrectSolutionsList: [
            {
                id: 3,
                username: "Luis",
                date: "2024-03-16",
                approach: "algebraic",
                explanation: `Intenté aplicar la regla de la cadena pero me confundí con el exponente en cachu $$e^{2t}$$, olvidando multiplicar por la derivada del exponente.`,
                answer: "cachu $$P'(t) = e^{2t} + 6t$$"
            }
        ]
    },
    {
        id: 2,
        title: "Límite de una Función Racional",
        category: "Cálculo",
        difficulty: "Avanzado",
        author: "Dra. Martínez",
        statement: `Analiza el comportamiento de la siguiente función racional cuando se aproxima a un punto crítico:

cachu
$$
f(x) = \\frac{x^2 - 4}{x - 2}
$$

Encuentra el límite cuando cachu $$x \\to 2$$.

**Pista**: Observa que este es un caso de indeterminación del tipo cachu $$\\frac{0}{0}$$ que requiere factorización.`,
        explanation: "Este es un caso de indeterminación que requiere factorización del numerador para resolver la forma indeterminada.",
        correctSolutions: 1,
        incorrectSolutions: 2,
        likes: 8,
        isLiked: false,
        officialSolution: {
            username: "Dra. Martínez",
            date: "2024-03-14",
            explanation: `Resolvamos esto paso a paso:

1) Cuando cachu $$x \\to 2$$, tenemos:
   cachu
   $$
   \\frac{2^2 - 4}{2 - 2} = \\frac{0}{0}
   $$
   
2) Factorizamos el numerador:
   cachu
   $$
   x^2 - 4 = (x+2)(x-2)
   $$

3) Simplificamos la fracción:
   cachu
   $$
   \\frac{x^2 - 4}{x - 2} = \\frac{(x+2)(x-2)}{x - 2} = x + 2
   $$

4) Ahora podemos evaluar el límite:
   cachu
   $$
   \\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} (x + 2) = 4
   $$`,
            answer: "cachu $$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$$"
        },
        correctSolutionsList: [
            {
                id: 1,
                username: "María",
                date: "2024-03-15",
                approach: "algebraic",
                explanation: `Factorizé el numerador:
cachu
$$
\\frac{x^2 - 4}{x - 2} = \\frac{(x+2)(x-2)}{x - 2}
$$

Cancelé el factor común cachu $$(x-2)$$ y evalué el límite de la expresión simplificada:
cachu
$$
\\lim_{x \\to 2} (x + 2) = 4
$$`,
                answer: "cachu $$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$$"
            }
        ],
        mySolutionsList: [],
    },
    {
        id: 3,
        title: "Problema de Conteo Avanzado",
        difficulty: "Experto",
        category: "Combinatoria",
        author: "Prof. Ramerlin Perez",
        date: "2024-01-10",
        likes: 134,
        statement:
            "¿De cuántas maneras se pueden colocar $8$ torres en un tablero de ajedrez $8 \\times 8$ de tal forma que no se ataquen entre sí y exactamente $3$ de ellas estén en la diagonal principal?",
        explanation:
            "Este problema combina el clásico problema de las 8 reinas con restricciones adicionales. El número total de permutaciones es $8!$, pero debemos considerar las restricciones de la diagonal principal.",
        officialSolution: {
            explanation: "1) Primero, elegimos 3 posiciones en la diagonal principal ($\\binom{8}{3}$ formas)\n2) Para cada elección en la diagonal, debemos colocar 5 torres en el resto del tablero\n3) Las torres restantes no pueden estar en las filas ni columnas ya ocupadas\n4) Usando el principio de inclusión-exclusión y los números de desarreglos $D_n$, calculamos: $$\\sum_{k=0}^{3} \\binom{8}{k} \\cdot D_{8-k}$$\n5) Aplicando la fórmula de los números de desarreglos: $D_n = n!\\sum_{k=0}^n \\frac{(-1)^k}{k!}$",
            answer: "El número total de configuraciones válidas es 14,200."
        },
        correctSolutions: 12,
        incorrectSolutions: 89,
        incorrectSolutionsList: [
            {
                id: 2,
                username: "Pedro",
                date: "2024-03-15",
                approach: "numeric",
                explanation: `Intenté sustituir directamente cachu $$x=2$$ en la función original, lo que me llevó a la indeterminación cachu $$\\frac{0}{0}$$ y concluí erróneamente que el límite no existía.`,
                answer: "El límite no existe"
            },
            {
                id: 3,
                username: "Juan",
                date: "2024-03-16",
                approach: "algebraic",
                explanation: `Factorizé incorrectamente el numerador como cachu $$(x-2)^2$$ en lugar de cachu $$(x+2)(x-2)$$, lo que me llevó a un resultado incorrecto.`,
                answer: "cachu $$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 2$$"
            }
        ],
        mySolutionsList: []
    }
]