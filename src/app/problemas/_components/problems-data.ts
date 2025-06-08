import { Problem } from "./types"

//!Datos de prueba

export const problems: Problem[] = [
    {
        id: 1,
        title: "Ecuación Diofántica con Restricciones",
        difficulty: "Avanzado",
        category: "Teoría de Números",
        author: "Prof. Ramerlin Castillo",
        date: "2024-01-15",
        likes: 89,
        statement:
            "Encuentra todas las soluciones enteras positivas de la ecuación $$x^3 + y^3 = z^3 + w^3$$ donde $$x, y, z, w$$ son distintos y menores que 100.",
        explanation:
            "Este problema combina teoría de números algebraica con técnicas de búsqueda exhaustiva. La identidad clave es $(a^3 + b^3) = (a + b)(a^2 - ab + b^2)$. Utilizamos congruencias módulo pequeños primos para reducir el espacio de búsqueda.",
        officialSolution: {
            explanation: "Aplicando la parametrización de Ramanujan para sumas de cubos: $$x^3 + y^3 = z^3 + w^3$$ tiene soluciones de la forma $x = a^3 + b^3$, $y = (a+b)^3 - a^3 - b^3$. Analizando módulo 9, podemos reducir significativamente el espacio de búsqueda. Luego, para cada valor posible de $x$ y $y$, buscamos pares $(z,w)$ que satisfagan la ecuación. La búsqueda se puede optimizar notando que $z$ y $w$ también deben seguir patrones similares módulo 9.",
            answer: "Existen exactamente 12 soluciones distintas menores que 100, siendo la más pequeña $(x,y,z,w) = (17, 39, 45, 3)$."
        },
        correctSolutions: 23,
        incorrectSolutions: 67,
        mySolutions: 2,
        mySolutionsList: [
            {
                id: 1,
                userId: "currentUser",
                username: "TúMismo",
                date: "2024-03-11",
                approach: "Teoría de Números",
                status: 'correct',
                explanation: "Primero, observé que por la parametrización de Ramanujan, podemos escribir las soluciones en términos de dos parámetros $a$ y $b$. Luego:\n1) Usé un programa para generar todas las combinaciones de $a$ y $b$ que dan números menores que 100\n2) Filtré las soluciones para asegurar que $x, y, z, w$ sean distintos\n3) Verifiqué cada solución sustituyendo en la ecuación original",
                answer: "Existen exactamente 12 soluciones distintas menores que 100, siendo la más pequeña $(x,y,z,w) = (17, 39, 45, 3)$.",
                feedback: "¡Correcto! Tu solución coincide exactamente con la respuesta esperada."
            },
            {
                id: 2,
                userId: "currentUser",
                username: "TúMismo",
                date: "2024-03-10",
                approach: "Búsqueda Computacional",
                status: 'incorrect',
                explanation: "Desarrollé un programa que busca todas las combinaciones posibles de números menores que 100. Mi proceso fue:\n1) Generar todas las cuádruplas $(x,y,z,w)$ menores que 100\n2) Verificar la ecuación $x^3 + y^3 = z^3 + w^3$\n3) Filtrar para que sean distintos",
                answer: "Encontré 8 soluciones distintas, siendo la más pequeña $(x,y,z,w) = (12, 25, 33, 2)$.",
                feedback: "La respuesta no es correcta. El número de soluciones y la solución más pequeña no coinciden con los valores esperados."
            }
        ],
        incorrectSolutionsList: [
            {
                id: 1,
                userId: "user123",
                username: "Estudiante123",
                date: "2024-03-10",
                approach: "Búsqueda Exhaustiva",
                status: 'incorrect',
                explanation: "Desarrollé un programa que busca todas las combinaciones posibles de números menores que 100. Mi proceso fue:\n1) Generar todas las cuádruplas $(x,y,z,w)$ menores que 100\n2) Verificar la ecuación $x^3 + y^3 = z^3 + w^3$\n3) Filtrar para que sean distintos",
                answer: "Mi programa encontró la solución $(x,y,z,w) = (2,3,4,1)$",
                feedback: "Tu enfoque es correcto, pero hay un error en la verificación. La solución que propones no satisface la ecuación: $2^3 + 3^3 \\neq 4^3 + 1^3$"
            },
            {
                id: 2,
                userId: "user456",
                username: "MatematicoPrincipiante",
                date: "2024-03-09",
                approach: "Teoría de Números",
                content: "Mi solución asumió incorrectamente que si $a^3 + b^3 = c^3 + d^3$, entonces necesariamente $a + b = c + d$. Esto me llevó a buscar solo en un subconjunto muy limitado de posibilidades y me perdí muchas soluciones válidas."
            },
            {
                id: 3,
                userId: "user789",
                username: "AlgebraLearner",
                date: "2024-03-08",
                approach: "Álgebra",
                content: "Cometí un error al considerar que las soluciones debían ser consecutivas. Mi respuesta fue que no existen soluciones porque asumí que $x, y, z, w$ debían formar una secuencia aritmética, lo cual es una restricción que no estaba en el problema original."
            }
        ]
    },
    {
        id: 2,
        title: "Configuración Geométrica Compleja",
        difficulty: "Intermedio",
        category: "Geometría",
        author: "Dr. Ramerlin Castillo",
        date: "2024-01-12",
        likes: 56,
        statement:
            "En un triángulo $ABC$, sea $P$ el punto donde se intersectan las bisectrices internas. Si $AP = BP = CP$, demuestra que el triángulo es equilátero.",
        explanation:
            "Este problema requiere el uso de propiedades del incentro y teoremas sobre triángulos isósceles. La distancia del incentro $I$ al vértice $A$ está dada por: $$AI = \\frac{r}{\\sin(A/2)}$$ donde $r$ es el inradio.",
        officialSolution: {
            explanation: "1) El punto $P$ es el incentro del triángulo.\n2) La distancia desde el incentro a cualquier vértice está dada por la fórmula $\\frac{r}{\\sin(\\theta/2)}$ donde $r$ es el inradio y $\\theta$ es el ángulo en ese vértice.\n3) Si $AP = BP = CP$, entonces $\\frac{r}{\\sin(A/2)} = \\frac{r}{\\sin(B/2)} = \\frac{r}{\\sin(C/2)}$\n4) Esto implica que $\\sin(A/2) = \\sin(B/2) = \\sin(C/2)$\n5) Como $0 < A,B,C < \\pi$, tenemos que $A = B = C$",
            answer: "Por lo tanto, $A = B = C = 60°$ y el triángulo es equilátero."
        },
        correctSolutions: 45,
        incorrectSolutions: 23,
        mySolutions: 1,
        incorrectSolutionsList: [
            {
                id: 1,
                userId: "user234",
                username: "GeometryNewbie",
                date: "2024-03-10",
                approach: "Geometría Básica",
                content: "Mi error fue asumir que si las distancias desde un punto interior a los vértices son iguales, entonces ese punto debe ser el circuncentro. No consideré que el incentro también podría tener esta propiedad bajo ciertas condiciones."
            },
            {
                id: 2,
                userId: "user567",
                username: "TriangleMaster",
                date: "2024-03-09",
                approach: "Trigonometría",
                content: "Intenté usar la ley de senos pero cometí un error al no considerar que las bisectrices dividen los ángulos en partes iguales. Mi demostración asumía incorrectamente que $\\sin A = \\sin B = \\sin C$ implicaba directamente que $A = B = C$."
            }
        ],
        mySolutionsList: []
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
        mySolutions: 0,
        incorrectSolutionsList: [
            {
                id: 1,
                userId: "user890",
                username: "CombinatorialStudent",
                date: "2024-03-10",
                approach: "Conteo Directo",
                content: "Mi error fue contar $\\binom{8}{3}$ para las posiciones en la diagonal y luego multiplicar por $5!$ para las torres restantes. Esto es incorrecto porque no consideré que las torres restantes no pueden estar en las filas ni columnas ya ocupadas por las torres de la diagonal."
            },
            {
                id: 2,
                userId: "user012",
                username: "ChessMaster",
                date: "2024-03-09",
                approach: "Recursión",
                content: "Desarrollé un algoritmo recursivo que daba 18,432 configuraciones. El error estaba en que mi código permitía que las torres fuera de la diagonal principal también pudieran estar en la diagonal, lo cual no debería ser posible según las reglas del problema."
            },
            {
                id: 3,
                userId: "user345",
                username: "MathExplorer",
                date: "2024-03-08",
                approach: "Permutaciones",
                content: "Mi solución dio 10,080 configuraciones porque olvidé incluir el caso donde algunas de las columnas de la diagonal principal quedan vacías. Solo consideré el caso donde todas las columnas debían tener exactamente una torre."
            }
        ],
        mySolutionsList: []
    }
] 