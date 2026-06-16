import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import { Clock, HelpCircle } from "lucide-react";
import type { Quiz } from "../types/quiz";
import { useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";

type QuizDialogProps = {
    selectedQuiz: Quiz | null,
    setSelectedQuiz: (quiz: Quiz | null) => void,
}

const QuizDialog = ({ selectedQuiz, setSelectedQuiz }: QuizDialogProps) => {
    const navigate = useNavigate();
    const { attemptLoading, attemptQuiz } = useQuiz();
    return (
        <Dialog
            open={!!selectedQuiz}
            onOpenChange={() => setSelectedQuiz(null)}
        >
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>
                        {selectedQuiz?.title}
                    </DialogTitle>

                    <DialogDescription>
                        Review quiz information before continuing.
                    </DialogDescription>
                </DialogHeader>

                {selectedQuiz && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HelpCircle className="h-4 w-4" />
                            {selectedQuiz.totalQuestions} Questions
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {selectedQuiz.durationMinutes} Minutes
                        </div>

                        <div className="pt-4 flex gap-2">
                            <Button
                                className="flex-1 cursor-pointer bg-green-500"
                                variant={"outline"}
                                onClick={() => attemptQuiz(selectedQuiz.id)}
                                disabled={attemptLoading}
                            >
                                Attempt Quiz
                            </Button>

                            <Button
                                variant="outline"
                                className="flex-1 cursor-pointer bg-green-500"
                            >
                                View Results
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default QuizDialog