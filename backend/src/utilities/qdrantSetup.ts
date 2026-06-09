import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
    url: 'https://dc306967-d253-4d73-800d-c83c6476f378.eu-west-2-0.aws.cloud.qdrant.io',
    apiKey: process.env.QDRANT_API_KEY,
    checkCompatibility: false
});

const setQdrantDB = async () => {
    await client.createPayloadIndex(
        "study-materials",
        {
            field_name: "userId",
            field_schema: "keyword"
        }
    );

    await client.createPayloadIndex(
        "study-materials",
        {
            field_name: "fileId",
            field_schema: "keyword"
        }
    );
}

setQdrantDB();
