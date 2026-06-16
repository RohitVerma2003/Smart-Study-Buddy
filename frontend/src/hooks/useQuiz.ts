import { useState } from "react"
import { api } from "../services/axios";
import toast from "react-hot-toast";
import type { Quiz } from "../types/quiz";
import { useNavigate } from "react-router-dom";

const useQuiz = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false);
    const [attemptLoading, setAttemptLoading] = useState(false);

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
            await api.post(`attempt-quiz/${quizId}`);
            navigate(`/quizzes/${quizId}/attempt`);
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

    return { getQuizzes, quizzes, loading, attemptLoading, attemptQuiz, generateQuiz }
}

export default useQuiz