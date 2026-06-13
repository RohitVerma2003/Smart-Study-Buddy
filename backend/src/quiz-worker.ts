import { Worker } from 'bullmq';
import dotenv from 'dotenv';
import { RetrievalService } from './services/retrieval.service';
import prisma from './db/prisma';
import { Difficulty, Prisma, QuestionType } from './generated/prisma/client';

dotenv.config();

const retrievalService = new RetrievalService();

const worker = new Worker('smart-buddy-quiz-queue', async (job) => {
    const data = job.data;
    console.log('🔄 Processing job:', job.id, data);
    const { quizId } = data;

    const aiResponse = await retrievalService.generateQuiz(data.fileId);
    console.dir(aiResponse, {
        depth: null,
        colors: true
    });

    await prisma.$transaction(
        async (tx) => {

            await tx.quiz.update({
                where: {
                    id: quizId
                },
                data: {
                    title:
                        aiResponse.title,

                    durationMinutes:
                        aiResponse.durationMinutes,

                    totalQuestions:
                        aiResponse.totalQuestions,

                    status: "READY"
                }
            });

            await tx.question.createMany({
                data:
                    aiResponse.questions.map(
                        (question) => ({
                            quizId,

                            type:
                                question.type as QuestionType,

                            question:
                                question.question,

                            options:
                                question.options || [],

                            correctAnswer:
                                question.correctAnswer,

                            modelAnswer:
                                question.modelAnswer,

                            explanation:
                                question.explanation,

                            difficulty:
                                question.difficulty as Difficulty,

                            marks:
                                question.marks,

                            order:
                                question.order
                        })
                    )
            });
        }
    );

    return { success: true, message: 'Quiz job processed successfully' };
}, {
    connection: {
        host: 'localhost',
        port: 6379
    },
    concurrency: 1
});

worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
    console.error(`❌ Job ${job?.id} failed after retries:`, err.message);
});

worker.on("error", (err) => {
    console.error("🚨 Worker crashed:", err);
});

worker.on("ready", () => {
    console.log("✅ Quiz Worker ready and pulling jobs from queue");
});

process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down worker...');
    await worker.close();
    process.exit(0);
});