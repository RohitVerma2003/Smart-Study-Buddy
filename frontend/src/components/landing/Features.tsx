import {
    MessageSquare,
    ClipboardList,
    PenTool,
    BarChart3,
} from "lucide-react";

const features = [
    {
        icon: MessageSquare,
        title: "Document Chat",
        description:
            "Ask questions directly from your uploaded notes and textbooks.",
    },
    {
        icon: ClipboardList,
        title: "Quiz Generation",
        description:
            "Generate quizzes instantly from your study materials.",
    },
    {
        icon: PenTool,
        title: "Visual Whiteboard",
        description:
            "Create diagrams, mind maps, and concept visualizations.",
    },
    {
        icon: BarChart3,
        title: "Progress Tracking",
        description:
            "Track study sessions, quiz performance, and learning progress.",
    },
];

export default function Features() {
    return (
        <section className="bg-muted/40 py-24">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">
                        Everything You Need To Learn Faster
                    </h2>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-xl border bg-background p-8"
                        >
                            <feature.icon className="h-10 w-10 text-green-600" />

                            <h3 className="mt-4 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}