import { Worker } from 'bullmq';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from 'dotenv';
import prisma from './db/prisma';
import { getVectorStore } from './db/qdrant';

dotenv.config();

const worker = new Worker('smart-buddy-queue', async (job) => {
    const data = job.data;
    console.log('🔄 Processing job:', job.id, data);

    const vectorStore = await getVectorStore();

    const loader = new PDFLoader(data.path);
    const docs = await loader.load();
    console.log("pdf loaded");


    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })
    const texts = await splitter.splitDocuments(docs);

    const chunks = texts.map((doc, index) => ({
        pageContent: doc.pageContent,
        metadata: {
            fileId: data.fileId,
            userId: data.userId,
            fileName: data.filename,
            chunkIndex: index,
            uploadedAt: new Date().toISOString()
        }
    }));

    await vectorStore.addDocuments(chunks);
    console.log("job done");

    await prisma.file.update({
        where: {
            id: data.fileId
        },
        data: {
            embeddingStatus: "COMPLETED",
            embeddedAt: new Date()
        }
    });

    return { success: true, message: 'Job processed successfully' };
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

    await prisma.file.update({
        where: {
            id: job?.data.fileId
        },
        data: {
            embeddingStatus: "FAILED"
        }
    });
});

worker.on("error", (err) => {
    console.error("🚨 Worker crashed:", err);
});

worker.on("ready", () => {
    console.log("✅ Worker ready and pulling jobs from queue");
});

process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down worker...');
    await worker.close();
    process.exit(0);
});