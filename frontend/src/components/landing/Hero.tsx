import { Button } from "../../../components/ui/button";
import {
    ArrowRight,
    Upload,
    MessageSquare,
    Brain,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                    <div className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm bg-green-500">
                        AI Powered Learning Workspace
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight">
                        Study Smarter.
                        <br />
                        Not Harder.
                    </h1>

                    <p className="mt-6 text-xl text-muted-foreground">
                        Upload your notes,
                        textbooks and PDFs.
                        Chat with AI, generate
                        quizzes, visualize concepts
                        and track your progress.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Button size="lg">
                            Start Studying

                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-green-500 cursor-pointer"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </div>

                {/* Product Mockup */}
                <div className="rounded-2xl border bg-card p-6 shadow-xl">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />

                            OS.pdf uploaded
                        </div>

                        <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />

                            AI Processing Complete
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                            <p className="font-medium">
                                What is CPU Scheduling?
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="flex gap-2">
                                <MessageSquare className="h-4 w-4 mt-1" />

                                <p className="text-sm">
                                    CPU Scheduling is the
                                    process of selecting
                                    which process gets CPU
                                    time...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}