import { z } from "zod";

export const QuestionSchema = z.object({
    type: z.enum([
        "MCQ",
        "TRUE_FALSE",
        "SHORT_ANSWER"
    ]),

    question: z.string(),

    options: z.array(z.string()).nullable(),

    correctAnswer: z.string().nullable(),

    modelAnswer: z.string().nullable(),

    explanation: z.string().nullable(),

    difficulty: z.enum([
        "EASY",
        "MEDIUM",
        "HARD"
    ]),

    marks: z.number(),

    order: z.number()
});

export const QuizSchema = z.object({
    title: z.string(),

    durationMinutes: z.number(),

    totalQuestions: z.number(),

    questions: z.array(QuestionSchema)
});

export type QuizOutput = z.infer<typeof QuizSchema>;