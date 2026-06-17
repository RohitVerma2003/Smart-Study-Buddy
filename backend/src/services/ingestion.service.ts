import prisma from "../db/prisma"
import { Queue } from 'bullmq';
import { AppError } from "../utilities/error";

export class IngestionService {
    private queue: Queue;
    private quiz_queue: Queue;

    constructor() {
        this.queue = new Queue('smart-buddy-queue', {
            connection: {
                host: 'localhost',
                port: 6379
            }
        });

        this.quiz_queue = new Queue('smart-buddy-quiz-queue', {
            connection: {
                host: 'localhost',
                port: 6379
            }
        })
    }

    startChat = async (userId: string, fileId: string) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) throw new AppError(404, "User not exists");

        const file = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        });

        if (!file) throw new AppError(404, "File not exists");

        if (file.embeddingStatus === "COMPLETED") {
            return { status: "COMPLETED" };
        }

        if (file.embeddingStatus === "PROCESSING") {
            return { status: "PROCESSING" };
        }


        await prisma.file.update({
            where: {
                id: fileId,
                userId
            },
            data: { embeddingStatus: "PROCESSING" }
        });

        await this.queue.add('pdf-job', {
            fileId: file.id,
            filename: file.fileName,
            path: file.path,
            userId
        });

        return {
            status: "PROCESSING"
        }
    }

    generateQuiz = async (userId: string, fileId: string) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) throw new AppError(404, "User not exists");

        const file = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        });

        if (!file) throw new AppError(404, "File not exists");

        if (file.embeddingStatus != "COMPLETED") {
            throw new AppError(400, "File is not yet embedded.");
        }

        const activeQuiz = await prisma.quiz.findFirst({
            where: {
                fileId,
                status: {
                    in: ["PROCESSING"]
                }
            }
        });

        if (activeQuiz) {
            throw new AppError(409, "A quiz is already being generated for this document.");
        }

        const quiz = await prisma.quiz.create({
            data: {
                title: `Quiz ${file.fileName} - ${Date.now()}`,
                userId,
                fileId,
                status: "PROCESSING",
                totalQuestions: 20,
                durationMinutes: 25
            }
        });

        await this.quiz_queue.add('quiz-job', {
            quizId: quiz.id,
            userId,
            fileId,
            path: file.path
        })

        return quiz;
    }

    docStatus = async (fileId: string) => {
        const doc = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        });

        if (!doc) throw new AppError(404, "No document found");

        return { status: doc.embeddingStatus };
    }
};