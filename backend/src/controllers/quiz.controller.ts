import { Request, Response } from "express";
import { IngestionService } from "../services/ingestion.service";
import { AppError } from "../utilities/error";

export class QuizController {
    private ingestionService: IngestionService;

    constructor() {
        this.ingestionService = new IngestionService();
    }

    generateQuiz = async (req: Request, res: Response) => {
        try {
            const { userId, fileId } = req.params;
            if (typeof (userId) != 'string' || typeof (fileId) != 'string') throw new Error("Invalid credentials");

            const result = await this.ingestionService.generateQuiz(userId, fileId);
            return res.status(200).json({
                success: true,
                result
            });
        } catch (error) {
            console.log(error)
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
}