import prisma from "../db/prisma"
import { QuizAnswer } from "../types/quiz.types";
import { AppError } from "../utilities/error";

export class QuizService {
    attemptQuiz = async (quizId: string, userId: string) => {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId
            }
        });

        if (!quiz) throw new AppError(404, "No quiz found");

        const prevAttemps = await prisma.quizAttempt.findFirst({
            where: {
                quizId, userId
            }
        });

        if (prevAttemps) throw new AppError(409, "Quiz attempted in past");

        const attempt = await prisma.quizAttempt.create({
            data: {
                quizId,
                userId,
                status: "IN_PROGRESS",
                startedAt: new Date()
            }
        });

        return attempt;
    }

    getQuizQuestions = async (quizId: string, quizAttemptId: string, userId: string) => {
        const quiz = await prisma.quiz.findFirst({
            where: {
                id: quizId
            }
        });

        if (!quiz) throw new AppError(404, "No quiz found");

        if (quiz.status !== "READY") {
            throw new AppError(
                400,
                "Quiz is not ready"
            );
        }

        const attempt = await prisma.quizAttempt.findFirst({
            where: {
                id: quizAttemptId,
                quizId,
                userId
            }
        });

        if (!attempt) throw new AppError(404, "No quiz attempt found");

        if (attempt.status === 'COMPLETED') throw new Error("Attempt already made in past");
        if (attempt.status === 'EXPIRED') throw new AppError(400, "Attempt expired");

        const questions = await prisma.question.findMany({
            where: {
                quizId
            },
            orderBy: {
                order: 'asc'
            },
            select: {
                id: true,
                quizId: true,
                question: true,
                options: true,
                difficulty: true,
                marks: true,
                order: true,
                type: true
            }
        });

        return { questions, attemptId: attempt.id, quizId: quiz.id }
    }

    submitQuizResponse = async (quizId: string, quizAttemptId: string, userId: string, answers: QuizAnswer[]) => {
        const quiz = await prisma.quiz.findFirst({
            where: {
                id: quizId
            }
        });

        if (!quiz) throw new AppError(404, "No quiz found");

        const attempt = await prisma.quizAttempt.findFirst({
            where: {
                id: quizAttemptId,
                quizId,
                userId
            }
        });

        if (!attempt) throw new AppError(404, "No quiz attempt found");

        if (attempt.status === 'COMPLETED') throw new Error("Attempt already made in past");
        if (attempt.status === 'EXPIRED') throw new AppError(400, "Attempt expired");
        const expiresAt = attempt.startedAt.getTime() + quiz.durationMinutes * 60 * 1000;

        if (Date.now() > expiresAt) {
            await prisma.quizAttempt.update({
                where: {
                    id: quizAttemptId
                },
                data: {
                    status: "EXPIRED"
                }
            });

            throw new AppError(
                400,
                "Quiz attempt expired"
            );
        }

        await prisma.quizResponse.createMany({
            data: answers.map(answer => ({
                attemptId: quizAttemptId,
                questionId: answer.questionId,
                answer: answer.answer
            }))
        });

        await prisma.quizAttempt.update({
            where: {
                id: quizAttemptId
            },
            data: {
                status: "COMPLETED",
                submittedAt: new Date()
            }
        });

        return true;
    }
}