import { Router } from "express";
import { upload } from "../configs/multer";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UploadController } from "../controllers/upload.controller";

const router = Router();
const uploadController = new UploadController();

router.post("/upload", authMiddleware, upload.single("file"), uploadController.uploadFile);

export default router;