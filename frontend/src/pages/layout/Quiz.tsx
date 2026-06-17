import { useEffect, useState } from 'react'
import type { QuizAnswer } from '../../types/quiz'
import QuizHeader from '../../components/QuizHeader';
import QuizQuestions from '../../components/QuizQuestions';
import { Button } from '../../../components/ui/button';
import useQuiz from '../../hooks/useQuiz';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';

const Quiz = () => {
    const { quiz, questions, getQuizQuestions, loading, submitLoading, submitQuiz } = useQuiz();

    const params = useParams();
    const { quizId, attemptId } = params;

    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        console.log("Calling")
        getQuizQuestions(quizId as string, attemptId as string);
    }, [])

    const updateAnswer = (
        questionId: string,
        answer: string
    ) => {
        setAnswers((prev) => {
            const existing = prev.find(
                (item) => item.questionId === questionId
            );

            if (existing) {
                return prev.map((item) =>
                    item.questionId === questionId
                        ? { ...item, answer }
                        : item
                );
            }

            return [
                ...prev,
                {
                    questionId,
                    answer,
                },
            ];
        });
    };

    const getAnswer = (questionId: string) => {
        return (
            answers.find(
                (item) => item.questionId === questionId
            )?.answer || ""
        );
    };

    if (loading || !quiz) return <Loader />

    return (
        <div className='p-5'>
            <div>Quiz</div>
            <div>
                <QuizHeader currentIndex={currentIndex} length={questions.length} title={quiz?.title || ""} />
                <QuizQuestions
                    question={questions[currentIndex]}
                    answer={getAnswer(
                        questions[currentIndex].id
                    )}
                    onAnswerChange={(answer) =>
                        updateAnswer(
                            questions[currentIndex].id,
                            answer
                        )
                    } />

                <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center'>
                        {currentIndex > 0 && <Button className='p-2 m-2 cursor-pointer' variant={'outline'} onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</Button>}
                        {currentIndex < questions.length - 1 && <Button className='p-2 m-2 cursor-pointer' variant={'outline'} onClick={() => setCurrentIndex(currentIndex + 1)}>Next</Button>}
                    </div>
                    <Button variant={'outline'} className='bg-green-500 cursor-pointer' disabled={submitLoading} onClick={() => submitQuiz(quizId as string, attemptId as string, answers)}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default Quiz