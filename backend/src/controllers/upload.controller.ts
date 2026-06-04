import { Request, Response } from "express";
import { UploadService } from "../services/upload.service";

export class UploadController {
    private uploadService: UploadService;

    constructor() {
        this.uploadService = new UploadService();
    }

    uploadFile = async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const userId = req.user!.userId;

        const file = await this.uploadService.upload(
            userId,
            req.file
        );

        return res.status(201).json(file);
    }
};
