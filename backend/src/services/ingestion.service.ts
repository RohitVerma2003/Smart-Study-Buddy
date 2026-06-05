import prisma from "../db/prisma"
import { Queue } from 'bullmq';
import { AppError } from "../utilities/error";

export class IngestionService {
    private queue: Queue;

    constructor() {
        this.queue = new Queue('smart-buddy-queue', {
            connection: {
                host: 'localhost',
                port: 6379
            }
        });
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
            path: file.path
        });

        return {
            status: "PROCESSING"
        }
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