import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from 'dotenv'

dotenv.config();

const client = new QdrantClient({
    url: 'https://dc306967-d253-4d73-800d-c83c6476f378.eu-west-2-0.aws.cloud.qdrant.io',
    apiKey: process.env.QDRANT_API_KEY,
    checkCompatibility: false
});

const setQdrantDB = async () => {
    const data = await client.createPayloadIndex(
        "study-materials",
        {
            field_name: "metadata.fileId",
            field_schema: "keyword"
        }
    );

    console.log("Qdrant DB setup completed: ", data);
}

setQdrantDB();
