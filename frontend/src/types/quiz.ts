export interface Quiz {
    createdAt: string;
    durationMinutes: number
    fileId: string
    id: string
    status: string
    title: string
    totalQuestions: number
    updatedAt: string
    userId: string
}

export interface Question {
    type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER',
    id: string,
    quizId: string,
    question: string,
    options: string[] | null | undefined,
    difficulty: string,
    marks: number,
    order: number,
}

export interface QuizAnswer {
    questionId: string,
    answer: string
}