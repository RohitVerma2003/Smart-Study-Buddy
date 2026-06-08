import {
    Card,
    CardContent,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";

import {
    FileText,
    Clock3,
    CheckCircle2,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

type DocumentCardProps = {
    document: any;
};

const statusMap = {
    PENDING: {
        icon: Clock3,
        text: "Pending",
        className: "text-yellow-500",
    },
    PROCESSING: {
        icon: Loader2,
        text: "Processing",
        className: "text-blue-500",
    },
    COMPLETED: {
        icon: CheckCircle2,
        text: "Ready",
        className: "text-green-500",
    },
    FAILED: {
        icon: AlertCircle,
        text: "Failed",
        className: "text-red-500",
    },
};

export default function DocumentCard({
    document,
}: DocumentCardProps) {
    const navigate = useNavigate();

    const status =
        statusMap[
        document.embeddingStatus as keyof typeof statusMap
        ];

    const StatusIcon = status.icon;

    const handleOpen = () => {
        window.open(
            `${import.meta.env.VITE_BACKEND_URL}/uploads/${document.userId}/${document.fileName}`,
            "_blank"
        );
    };

    const handleChat = () => {
        navigate(`/chat/${document.id}`);
    };

    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="">
                <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary" />

                    <div
                        className={`flex items-center gap-1 text-sm ${status.className}`}
                    >
                        <StatusIcon className="h-4 w-4" />
                        <span>{status.text}</span>
                    </div>
                </div>

                <div className="mt-2">
                    <h3 className="truncate font-medium">
                        {document.originalName}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {(document.fileSize / 1024).toFixed(
                            1
                        )}{" "}
                        KB
                    </p>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                    Uploaded{" "}
                    {new Date(
                        document.createdAt
                    ).toLocaleDateString()}
                </div>

                <div className="mt-2 flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 cursor-pointer bg-green-500"
                        onClick={handleOpen}
                    >
                        Open
                    </Button>

                    <Button
                        variant={'outline'}
                        className="flex-1 cursor-pointer bg-green-500"
                        onClick={handleChat}
                        disabled={
                            document.embeddingStatus !==
                            "COMPLETED"
                        }
                    >
                        Chat
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}