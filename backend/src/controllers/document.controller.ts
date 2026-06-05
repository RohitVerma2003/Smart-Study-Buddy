import { Request, Response } from "express";
import { IngestionService } from "../services/ingestion.service";
import { AppError } from "../utilities/error";

export class DocumentController {
    private ingestionService;

    constructor() {
        this.ingestionService = new IngestionService();
    }

    startChat = async (req: Request, res: Response) => {
        try {
            const { fileId } = req.body;
            const userId = req.user?.userId

            const result = await this.ingestionService.startChat(userId || "", fileId);

            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    checkStatus = async (req: Request, res: Response) => {
        try {
            const fileId = Array.isArray(req.params.fileId) ? req.params.fileId[0] : req.params.fileId;

            const result = await this.ingestionService.docStatus(fileId);

            return res.status(200).json({
                success: true,
                data: result
            })
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
}