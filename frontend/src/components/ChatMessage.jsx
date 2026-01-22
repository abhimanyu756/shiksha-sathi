import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message, isUser, isTyping }) {
    if (isTyping) {
        return (
            <div className="flex justify-start animate-in">
                <div className="message-assistant flex items-center gap-1.5">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[85%] md:max-w-[75%] ${isUser ? 'message-user' : 'message-assistant'}`}>
                {isUser ? (
                    <p className="text-sm md:text-base">{message}</p>
                ) : (
                    <div className="markdown-content text-sm md:text-base">
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
