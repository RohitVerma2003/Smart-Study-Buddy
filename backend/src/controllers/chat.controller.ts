import { Request, Response } from "express";
import { RetrievalService } from "../services/retrieval.service";
import { AppError } from "../utilities/error";

export class ChatController {
    private retrievalService;

    constructor() {
        this.retrievalService = new RetrievalService();
    }

    topicExplanationChat = async (req: Request, res: Response) => {
        try {
            const query = req.query.query;
            if(!query) throw new Error();

            const result = await this.retrievalService.chatForTopicExplaination(query);

            return res.status(200).json({
                success: true,
                message: result.text,
                metadata: result.usage_metadata
            });
        } catch (error) {
            return this.handleError(error, res);

        }
    }

    private handleError(error: unknown, res: Response) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};