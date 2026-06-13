import { ChatGoogle } from "@langchain/google";
import { HumanMessage, SystemMessage } from "langchain";
import { QuizSchema } from "../utilities/zod";

export class LLMService {
    private llm;

    constructor() {
        this.llm = new ChatGoogle({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-2.5-flash",
        });
    }

    chatWithGemini = async (prompt: string , query: string) => {
        const aiMessage = await this.llm.invoke([
            new SystemMessage(`${prompt}`),
            new HumanMessage(`${query}`)
        ]);

        return aiMessage;
    }

    quizWithGemini = async (prompt: string)=>{
        const model = this.llm.withStructuredOutput(QuizSchema);
        const aiResponse = await model.invoke(prompt);
        return aiResponse;
    }
}