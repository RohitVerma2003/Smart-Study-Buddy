import { getVectorStore } from "../db/qdrant"
import { promptForQuizGeneration, promptForTopicExplanation } from "../utilities/prompts";
import { LLMService } from "./llm.service";

export class RetrievalService {
    private llmService;

    constructor() {
        this.llmService = new LLMService();
    }

    chatForTopicExplaination = async (query: any) => {
        const vectorStore = await getVectorStore();
        const retriever = vectorStore.asRetriever({
            k: 2,
        });

        const data = await retriever.invoke(`${query}`);
        const prompt = promptForTopicExplanation(data);
        console.log(prompt)

        const result = await this.llmService.chatWithGemini(prompt, query);
        return result;
    }

    generateQuiz = async (fileId: string) => {
        const vectorStore = await getVectorStore();
        const retriever = vectorStore.asRetriever({
            k: 50,
            filter: {
                must: [
                    {
                        key: "metadata.fileId",
                        match: {
                            value: fileId
                        }
                    }
                ]
            }
        });

        const data = await retriever.invoke("Document Overview");

        const context = data
            .map(doc => doc.pageContent)
            .join("\n\n");

        const prompt = promptForQuizGeneration(context);

        const result = await this.llmService.quizWithGemini(prompt);
        return result;
    }
}