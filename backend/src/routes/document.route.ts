import { Router } from "express";
import { DocumentController } from "../controllers/document.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const documentController = new DocumentController();

router.post('/start-chat' , authMiddleware , documentController.startChat);
router.get('/check-status/:fileId' , authMiddleware , documentController.checkStatus);
router.get('/files' , authMiddleware , documentController.getDocuments);

export default router;