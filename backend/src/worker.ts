import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from 'dotenv';
import prisma from './db/prisma';

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001",
});

const worker = new Worker('smart-buddy-queue', async (job) => {
    const data = job.data;
    console.log('🔄 Processing job:', job.id, data);

    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: 'https://dc306967-d253-4d73-800d-c83c6476f378.eu-west-2-0.aws.cloud.qdrant.io',
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "study-materials"
    });
    console.log("store initialized");

    const loader = new PDFLoader(data.path);
    const docs = await loader.load();
    console.log("pdf loaded");


    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })
    const texts = await splitter.splitDocuments(docs);

    await vectorStore.addDocuments(texts);
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
    concurrency: 5
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