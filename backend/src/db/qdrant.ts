import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from 'dotenv';

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001",
});

export const getVectorStore = async () => {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: 'https://dc306967-d253-4d73-800d-c83c6476f378.eu-west-2-0.aws.cloud.qdrant.io',
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "study-materials"
    });

    return vectorStore;
}
