import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const chatController = new ChatController();

router.get('/chat-topic-explain/:documentId' , authMiddleware , chatController.topicExplanationChat);

export default router;