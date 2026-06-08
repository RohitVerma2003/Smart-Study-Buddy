import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    onUpload: (file: File) => Promise<void>;
};

export default function UploadDocumentDialog({
    onUpload,
}: Props) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file");
            return;
        }

        try {
            setLoading(true);

            await onUpload(file);

            toast.success(
                "Document upload started"
            );

            setOpen(false);
            setFile(null);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    disabled={loading}
                    variant={'outline'}
                    className="bg-green-500 cursor-pointer">
                    Upload Document
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Upload Document
                    </DialogTitle>
                </DialogHeader>

                <input
                    type="file"
                    accept=".pdf,.txt,.docx"
                    onChange={(e) =>
                        setFile(
                            e.target.files?.[0] ??
                            null
                        )
                    }
                />

                <Button
                    onClick={handleUpload}
                    disabled={loading}
                    variant={'outline'}
                    className="bg-green-500 cursor-pointer"
                >
                    {loading
                        ? "Uploading..."
                        : "Upload"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}