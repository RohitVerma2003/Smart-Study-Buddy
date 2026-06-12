import {
    FileText,
    Brain,
    MessageSquare,
    ClipboardList,
    PenTool,
} from "lucide-react";

const workflow = [
    {
        icon: FileText,
        label: "Upload PDF",
    },
    {
        icon: Brain,
        label: "AI Processing",
    },
    {
        icon: MessageSquare,
        label: "Chat",
    },
    {
        icon: ClipboardList,
        label: "Quiz",
    },
    {
        icon: PenTool,
        label: "Whiteboard",
    },
];

export default function Workflow() {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="text-center">
                <h2 className="text-4xl font-bold">
                    Your Learning Workflow
                </h2>

                <p className="mt-4 text-muted-foreground">
                    One platform for studying,
                    understanding and revising.
                </p>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-6">
                {workflow.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center rounded-xl border p-6 min-w-[180px]"
                    >
                        <item.icon className="h-10 w-10 text-green-600" />

                        <p className="mt-4 font-medium">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}