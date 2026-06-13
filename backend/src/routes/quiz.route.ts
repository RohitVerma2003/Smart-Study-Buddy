import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const quizController = new QuizController();

router.post('/generate-quiz/:userId/:fileId' , authMiddleware , quizController.generateQuiz);

export default router;