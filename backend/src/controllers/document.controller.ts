import { Request, Response } from "express";
import { IngestionService } from "../services/ingestion.service";
import { AppError } from "../utilities/error";
import prisma from "../db/prisma";
import { UploadService } from "../services/upload.service";

export class DocumentController {
    private ingestionService;
    private uploadService;

    constructor() {
        this.ingestionService = new IngestionService();
        this.uploadService = new UploadService();
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

    getDocuments = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const skip = (page - 1) * limit;
            const result = await this.uploadService.getFiles(userId, page, skip, limit);

            return res.status(200).json({
                success: true,
                result
            });

        } catch (error) {
            return this.handleError(error, res)
        }
    };

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