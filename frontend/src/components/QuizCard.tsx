import { Card, CardContent } from "../../components/ui/card";
import {
    Clock,
    HelpCircle,
    CalendarDays,
    CheckCircle2,
    Loader2,
    AlertCircle,
} from "lucide-react";

import type { Quiz } from "../types/quiz";

interface QuizCardProps {
    quiz: Quiz;
    setSelectedQuiz: (quiz: Quiz | null) => void,
}

const statusMap = {
    READY: {
        icon: CheckCircle2,
        text: "Ready",
        className: "text-green-500",
    },
    PROCESSING: {
        icon: Loader2,
        text: "Generating",
        className: "text-blue-500",
    },
    FAILED: {
        icon: AlertCircle,
        text: "Failed",
        className: "text-red-500",
    },
};

const QuizCard = ({ quiz, setSelectedQuiz }: QuizCardProps) => {
    const status =
        statusMap[quiz.status as keyof typeof statusMap] ??
        statusMap.PROCESSING;

    const StatusIcon = status.icon;

    return (
        <Card className="transition-all hover:shadow-md cursor-pointer" onClick={() => setSelectedQuiz(quiz)}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">
                            {quiz.title}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Quiz Assessment
                        </p>
                    </div>

                    <div
                        className={`flex items-center gap-1 text-sm ${status.className}`}
                    >
                        <StatusIcon
                            className={`h-4 w-4 ${quiz.status === "PROCESSING"
                                ? "animate-spin"
                                : ""
                                }`}
                        />
                        <span>{status.text}</span>
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <HelpCircle className="h-4 w-4" />
                        <span>
                            {quiz.totalQuestions} Questions
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                            {quiz.durationMinutes} Minutes
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                            {new Date(
                                quiz.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizCard;