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
            return { status: file.embeddingStatus };
        }

        // const quiz = await prisma.quiz.create({
        //     data: {
        //         title: `Quiz ${file.fileName} - ${Date.now()}`,
        //         userId,
        //         fileId,
        //         status: "PROCESSING",
        //         totalQuestions: 20,
        //         durationMinutes: 25
        //     }
        // });

        await this.quiz_queue.add('quiz-job', {
            quizId: "cmqc2zpsp0000y0uh4w34bl96",
            userId,
            fileId,
            path: file.path
        })

        return {
            "id": "cmqc2zpsp0000y0uh4w34bl96",
            "title": "Quiz 1781245864685-sql interview questions.pdf - 1781338570578",
            "userId": "cmpz54uom0000msuh41nchogp",
            "fileId": "cmqajsphg0000fkuh5hlordaa",
            "status": "PROCESSING",
            "totalQuestions": 20,
            "durationMinutes": 25,
            "createdAt": "2026-06-13T08:16:10.585Z",
            "updatedAt": "2026-06-13T08:16:10.585Z"
        };
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