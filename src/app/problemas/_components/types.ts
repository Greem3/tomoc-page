export type Solution = {
    id: number
    userId: string
    username: string
    date: string
    approach: string
    status?: 'correct' | 'incorrect'
    explanation?: string
    answer?: string
    feedback?: string
    content?: string;
}

export type Problem = {
    id: number
    title: string
    difficulty: string
    category: string
    author: string
    date: string
    likes: number
    statement: string
    explanation: string
    officialSolution: {
        explanation: string
        answer: string
    }
    correctSolutions: number
    incorrectSolutions: number
    mySolutions: number
    incorrectSolutionsList: Solution[]
    mySolutionsList: Solution[]
} 