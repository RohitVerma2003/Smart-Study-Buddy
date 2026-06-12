import {
    Upload,
    Brain,
    MessageSquare,
} from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Material",
        description:
            "Upload PDFs, notes, textbooks, and study resources.",
    },
    {
        icon: Brain,
        title: "AI Understands",
        description:
            "Smart processing extracts knowledge and creates embeddings.",
    },
    {
        icon: MessageSquare,
        title: "Study & Learn",
        description:
            "Ask questions, generate quizzes and understand concepts.",
    },
];

export default function HowItWorks() {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="text-center">
                <h2 className="text-4xl font-bold">
                    How It Works
                </h2>

                <p className="mt-4 text-muted-foreground">
                    Turn any study material into an
                    AI-powered tutor.
                </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
                {steps.map((step) => (
                    <div
                        key={step.title}
                        className="rounded-xl border p-8 text-center"
                    >
                        <step.icon className="mx-auto h-10 w-10 text-green-600" />

                        <h3 className="mt-4 text-xl font-semibold">
                            {step.title}
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}