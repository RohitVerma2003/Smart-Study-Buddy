import { Progress } from '../../components/ui/progress'
import { Card, CardContent } from '../../components/ui/card'

const QuizHeader = ({ currentIndex, length, title }: { currentIndex: number, length: number, title: string }) => {
    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-xl">
                            {title || ""}
                        </h1>

                        <p className="text-muted-foreground">
                            Question {currentIndex + 1} of {length}
                        </p>
                    </div>

                    {/* <div className="text-lg font-semibold">
                        {formatTime(timeRemaining)}
                    </div> */}
                </div>

                <Progress
                    value={((currentIndex + 1) / length) * 100}
                    className="mt-4 bg-white"
                />
            </CardContent>
        </Card>
    )
}

export default QuizHeader