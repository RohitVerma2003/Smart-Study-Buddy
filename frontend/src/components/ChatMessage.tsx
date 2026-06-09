import Markdown from 'react-markdown'
import { Spinner } from '../../components/ui/spinner';

type Props = {
    user: boolean;
    message: string;
};

export default function ChatMessage({
    user,
    message,
}: Props) {
    const isUser = user;

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap border ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {message === "" ? <Spinner /> : <Markdown>
                    {message}
                </Markdown>}

            </div>
        </div>
    );
}