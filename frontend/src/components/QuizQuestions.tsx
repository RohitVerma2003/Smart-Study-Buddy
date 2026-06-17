import type { Question } from "../types/quiz";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";

interface QuizQuestionsProps {
    question: Question;
    answer?: string | undefined;
    onAnswerChange: (answer: string) => void;
}

const QuizQuestions = ({
    question,
    answer,
    onAnswerChange,
}: QuizQuestionsProps) => {
    return (
        <Card className="mt-6">
            <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <Badge variant="outline">
                        {question.difficulty}
                    </Badge>

                    <span className="text-sm text-muted-foreground">
                        {question.marks} Marks
                    </span>
                </div>

                <div>
                    <h2 className="text-xl font-medium leading-relaxed">
                        {question.question}
                    </h2>
                </div>

                {question.type === "MCQ" && (
                    <RadioGroup
                        value={answer}
                        onValueChange={onAnswerChange}
                        className="space-y-3 "
                    >
                        {question.options?.map((option) => (
                            <div
                                key={option}
                                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50"
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={option}
                                />

                                <Label
                                    htmlFor={option}
                                    className="cursor-pointer flex-1"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}

                {question.type === "TRUE_FALSE" && (
                    <RadioGroup
                        value={answer}
                        onValueChange={onAnswerChange}
                        className="space-y-3"
                    >
                        <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem
                                value="TRUE"
                                id="true"
                            />

                            <Label
                                htmlFor="true"
                                className="cursor-pointer"
                            >
                                True
                            </Label>
                        </div>

                        <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem
                                value="FALSE"
                                id="false"
                            />

                            <Label
                                htmlFor="false"
                                className="cursor-pointer"
                            >
                                False
                            </Label>
                        </div>
                    </RadioGroup>
                )}

                {question.type === "SHORT_ANSWER" && (
                    <Textarea
                        value={answer || ""}
                        onChange={(e) =>
                            onAnswerChange(e.target.value)
                        }
                        placeholder="Write your answer here..."
                        className="min-h-[180px]"
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default QuizQuestions;