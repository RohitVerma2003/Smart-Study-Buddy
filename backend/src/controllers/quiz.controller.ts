import { Request, Response } from "express";
import { IngestionService } from "../services/ingestion.service";
import { AppError } from "../utilities/error";
import { QuizService } from "../services/quiz.service";
import { QuizAnswer } from "../types/quiz.types";

export class QuizController {
    private ingestionService: IngestionService;
    private quizService: QuizService;

    constructor() {
        this.ingestionService = new IngestionService();
        this.quizService = new QuizService();
    }

    generateQuiz = async (req: Request, res: Response) => {
        try {
            const { fileId } = req.params;
            const userId = req.user?.userId;
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

    attemptQuiz = async (req: Request, res: Response) => {
        try {
            const { quizId } = req.params;
            const userId = req.user?.userId;

            if (typeof (quizId) !== 'string' || !userId) throw new Error("Invalid credentials");

            const attempt = await this.quizService.attemptQuiz(quizId, userId);
            return res.status(200).json({
                success: true,
                attempt
            });
        } catch (error) {
            console.log(error);
            return this.handleError(error, res);
        }
    }

    getQuizQuestions = async (req: Request, res: Response) => {
        try {
            const { quizId, attemptId } = req.params;
            const userId = req.user?.userId;

            if (typeof (quizId) !== 'string' || typeof (attemptId) !== 'string' || !userId) throw new Error("Invalid credentials");

            const data = await this.quizService.getQuizQuestions(quizId, attemptId, userId);
            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            console.log(error);
            return this.handleError(error, res);
        }
    }

    submitQuiz = async (req: Request, res: Response) => {
        try {
            const { quizId, attemptId } = req.params;
            const userId = req.user?.userId;
            const answers: QuizAnswer[] = req.body.answers;

            if (!answers || !userId || typeof (quizId) != 'string' || typeof (attemptId) != 'string') {
                throw new Error("Invalid Credentials");
            }

            const result = await this.quizService.submitQuizResponse(quizId, attemptId, userId, answers);
            return res.status(200).json({
                success: result,
            });
        } catch (error) {
            console.log(error);
            return this.handleError(error, res);
        }
    }

    getAllQuizzes = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;
            if (!userId) throw new AppError(404, "User not found");

            const data = await this.quizService.getAllQuizzes(userId);
            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            console.log(error);
            return this.handleError(error, res);
        }
    }

    getQuiz = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;
            const { quizId } = req.params;

            if (!userId) throw new AppError(404, "User not found");
            if (!quizId || typeof (quizId) != "string") throw new AppError(409, "Invalid credentials");

            const data = await this.quizService.getQuiz(userId, quizId);
            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            console.log(error);
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