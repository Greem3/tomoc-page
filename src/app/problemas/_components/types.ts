export interface Solution {
    id: number;
    username: string;
    date: string;
    approach: string;
    explanation: string;
    answer: string;
}

export interface OfficialSolution extends Solution {}

export interface Problem {
    id: number;
    title: string;
    statement: string;
    category: string;
    difficulty: string;
    author: string;
    likes: number;
    isLiked: boolean;
    correctSolutions: number;
    incorrectSolutions: number;
    officialSolution: OfficialSolution;
    correctSolutionsList: Solution[];
    incorrectSolutionsList: Solution[];
    explanation: string;
}

export interface SolutionFormData {
    approach: string;
    explanation: string;
    answer: string;
} 