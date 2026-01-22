import { useState } from 'react';

export default function VoiceButton({
    onResult,
    onError,
    language = 'hi-IN',
    size = 'md',
    className = ''
}) {
    const [isListening, setIsListening] = useState(false);

    const sizes = {
        sm: 'w-10 h-10 text-lg',
        md: 'w-14 h-14 text-2xl',
        lg: 'w-16 h-16 text-3xl',
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            onError?.('Speech recognition not supported in this browser');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = language;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult?.(transcript);
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            onError?.(event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <button
            onClick={startListening}
            disabled={isListening}
            className={`
        ${sizes[size]}
        relative rounded-full flex items-center justify-center
        transition-all duration-300 focus:outline-none focus:ring-4
        ${isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 focus:ring-red-500/30'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30 focus:ring-primary-500/30 hover:scale-105'
                }
        ${className}
      `}
            title={isListening ? 'Listening...' : 'Click to speak'}
        >
            {isListening && (
                <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50"></span>
            )}
            <span className="relative z-10">
                {isListening ? '🔴' : '🎤'}
            </span>
        </button>
    );
}
