import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const quizController = new QuizController();

router.post('/generate-quiz/:fileId' , authMiddleware , quizController.generateQuiz);
router.post('/attempt-quiz/:quizId' , authMiddleware , quizController.attemptQuiz);
router.get('/get-quiz-questions/:quizId/:attemptId' , authMiddleware , quizController.getQuizQuestions);
router.post('/submit-quiz/:quizId/:attemptId' , authMiddleware , quizController.submitQuiz);
router.get('/quizzes' , authMiddleware , quizController.getAllQuizzes);
router.get('/quiz/:quizId' , authMiddleware , quizController.getQuiz);

export default router;