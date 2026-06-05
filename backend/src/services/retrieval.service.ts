import { getVectorStore } from "../db/qdrant"
import { promptForTopicExplanation } from "../utilities/prompts";
import { LLMService } from "./llm.service";

export class RetrievalService {
    private llmService;

    constructor(){
        this.llmService = new LLMService();
    }

    chatForTopicExplaination = async (query: any) => {
        const vectorStore = await getVectorStore();
        const retriever = vectorStore.asRetriever({
            k: 2,
        });

        const data = await retriever.invoke(`${query}`);
        const prompt = promptForTopicExplanation(data);

        const result = await this.llmService.chatWithGemini(prompt , query);
        return result;
    }
}