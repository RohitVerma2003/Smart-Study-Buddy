import { useParams } from "react-router-dom"
import useChat from "../../hooks/useChat";
import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import ChatMessage from "../../components/ChatMessage";

const chatSchema = z.object({
    userQuery: z.string().trim().min(1, "Please enter text")
});

const Chat = () => {
    const params = useParams();
    const { documentId } = params;

    const { sendMessage, chat, loading } = useChat();
    const [query, setQuery] = useState("");

    const handleSendMessage = () => {
        const isSafe = chatSchema.safeParse({ userQuery: query });

        if (!isSafe.success) {
            const errors = isSafe.error.flatten().fieldErrors;
            toast.error(errors?.userQuery != undefined ? errors.userQuery[0] : "Please enter text");
            return;
        }
        sendMessage(query , documentId || "");
        setQuery("");
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">

            <div className="border-b px-6 py-2">
                <h1 className="text-lg font-semibold">
                    Study Chat
                </h1>

                <p className="text-sm text-muted-foreground">
                    Document ID: {documentId}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-4">
                    {chat?.length === 0 && (
                        <div className="text-center text-muted-foreground">
                            Ask anything about
                            your document
                        </div>
                    )}

                    {chat?.map(
                        (message: any) => (
                            <ChatMessage
                                user={
                                    message.user
                                }
                                message={
                                    message.message
                                }
                            />
                        )
                    )}

                    {loading && (
                        <ChatMessage
                            user={false}
                            message={""}
                        />
                    )}
                </div>
            </div>

            <div className="border-t p-4">
                <div className="mx-auto flex max-w-4xl gap-2">
                    <Input
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }

                        placeholder="Ask something about your document..."
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") handleSendMessage()
                        }}
                    />

                    <Button onClick={handleSendMessage} disabled={loading} variant={"outline"} className="bg-green-500 cursor-pointer">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Chat