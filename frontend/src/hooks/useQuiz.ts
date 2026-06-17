import { useState } from "react"
import { api } from "../services/axios";
import toast from "react-hot-toast";
import type { Question, Quiz, QuizAnswer } from "../types/quiz";
import { useNavigate } from "react-router-dom";

const useQuiz = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [attemptLoading, setAttemptLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const getQuizzes = async () => {
        setLoading(true);
        try {
            const res = await api.get('/quizzes');
            const data = res.data.data;

            setQuizzes(data);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Error in fetching the quizzes"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    const attemptQuiz = async (quizId: string) => {
        setAttemptLoading(true);
        try {
            const res = await api.post(`attempt-quiz/${quizId}`);
            const data = res.data.attempt;
            navigate(`/quiz/${data.quizId}/${data.id}`);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Error in fetching the quizzes"
            );

            throw error;
        } finally {
            setAttemptLoading(false);
        }
    }

    const generateQuiz = async (fileId: string) => {
        setLoading(true);

        try {
            await api.post(`generate-quiz/${fileId}`);
            toast.success("Quiz Generation Started");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Error in fetching the quizzes"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getQuizQuestions = async (quizId: string, attemptId: string) => {
        setLoading(true);

        try {
            const res = await api.get(`/get-quiz-questions/${quizId}/${attemptId}`);
            const data = res.data.data;
            console.log(data)
            setQuiz(data);
            setQuestions(data.questions);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Error in fetching the quizzes"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    const submitQuiz = async (quizId: string, attemptId: string, answers: QuizAnswer[]) => {
        setSubmitLoading(true);
        try {
            await api.post(`submit-quiz/${quizId}/${attemptId}`, { answers });
            toast.success("Quiz submitted");
            navigate('/quizzes');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Error in fetching the quizzes"
            );

            throw error;
        } finally {
            setSubmitLoading(false);
        }
    }

    return { getQuizzes, quizzes, loading, attemptLoading, attemptQuiz, generateQuiz, quiz, questions, getQuizQuestions, submitQuiz, submitLoading }
}

export default useQuiz