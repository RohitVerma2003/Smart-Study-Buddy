import { useEffect, useState } from "react";
import useQuiz from "../../hooks/useQuiz";
import Loader from "../../components/Loader";
import QuizCard from "../../components/QuizCard";
import type { Quiz } from "../../types/quiz";
import QuizDialog from "../../components/QuizDialog";

const Quizzes = () => {
    const { getQuizzes, quizzes, loading } = useQuiz();

    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        getQuizzes();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            {selectedQuiz && <QuizDialog selectedQuiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} />}

            <div>
                <h1 className="text-3xl font-bold">
                    My Quizzes
                </h1>

                <p className="text-muted-foreground">
                    View and attempt your generated quizzes.
                </p>
            </div>

            {quizzes.length === 0 ? (
                <div className="rounded-lg border p-10 text-center">
                    <h3 className="font-medium">
                        No quizzes found
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Generate a quiz from a document to get
                        started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            setSelectedQuiz={setSelectedQuiz}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quizzes;