import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import VoiceButton from '../components/ui/VoiceButton';
import ChatMessage from '../components/ChatMessage';
import { askCoach } from '../services/api';
import { saveChat, cacheResponse, getCachedResponse, getChat } from '../services/db';
import { speak, stopSpeaking } from '../services/speech';

export default function Coach({ language, isOnline }) {
    const [searchParams] = useSearchParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeakingState, setIsSpeakingState] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const initialQuerySentRef = useRef(false);
    const chatLoadedRef = useRef(false);

    // Load chat from history if chatId is provided
    useEffect(() => {
        const chatId = searchParams.get('chatId');
        if (chatId && !chatLoadedRef.current) {
            chatLoadedRef.current = true;
            loadChatFromHistory(parseInt(chatId));
        }
    }, [searchParams]);

    const loadChatFromHistory = async (chatId) => {
        try {
            const chat = await getChat(chatId);
            if (chat && chat.messages) {
                setMessages(chat.messages);
                setCurrentChatId(chatId);
            }
        } catch (error) {
            console.error('Failed to load chat:', error);
        }
    };

    useEffect(() => {
        const initialQuery = searchParams.get('q');
        if (initialQuery && !initialQuerySentRef.current) {
            initialQuerySentRef.current = true;
            handleSendMessage(initialQuery);
        }
    }, [searchParams]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0 && !searchParams.get('q') && !searchParams.get('chatId')) {
            const welcome = language === 'hi'
                ? `नमस्ते! 🙏 मैं शिक्षक साथी हूं।\n\nमुझसे कक्षा प्रबंधन या पढ़ाने के बारे में कुछ भी पूछें!\n\n**उदाहरण:**\n• "छात्र ध्यान नहीं दे रहे"\n• "भिन्न कैसे समझाऊं?"\n\n🎤 बोलें या टाइप करें!`
                : `Namaste! 🙏 I'm Shikshak Saathi.\n\nAsk me anything about classroom management or teaching!\n\n**Examples:**\n• "Students not paying attention"\n• "How to explain fractions?"\n\n🎤 Speak or type!`;
            setMessages([{ role: 'assistant', content: welcome }]);
        }
    }, [language]);

    const handleSendMessage = async (messageText = inputValue) => {
        const trimmed = messageText.trim();
        if (!trimmed || isLoading) return;

        const userMessage = { role: 'user', content: trimmed };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            let response;

            // Check cache first when offline
            if (!isOnline) {
                const cached = await getCachedResponse(trimmed);
                if (cached) {
                    response = cached.response;
                } else {
                    // Queue for later sync and show offline message
                    const { queuePendingQuery } = await import('../services/db');
                    await queuePendingQuery(trimmed);
                    response = language === 'hi'
                        ? `📴 **ऑफ़लाइन मोड**\n\nआपका प्रश्न सहेज लिया गया है। इंटरनेट वापस आने पर उत्तर मिलेगा।\n\nइस बीच, कुछ सामान्य सुझाव:\n• ध्यान आकर्षित करने के लिए ताली का पैटर्न आज़माएं\n• छात्रों को जोड़ियों में काम करने दें\n• स्थानीय सामग्री का उपयोग करें`
                        : `📴 **Offline Mode**\n\nYour question has been saved. You'll get a response when back online.\n\nMeanwhile, here are some tips:\n• Try a clap pattern to get attention\n• Let students work in pairs\n• Use local materials for activities`;
                }
            }

            // Online: call API
            if (!response) {
                const history = messages.map(m => ({ role: m.role, content: m.content }));
                const result = await askCoach(trimmed, history, language);
                response = result.response;
                await cacheResponse(trimmed, response);
            }

            const assistantMessage = { role: 'assistant', content: response };
            setMessages(prev => [...prev, assistantMessage]);
            await saveChat([...messages, userMessage, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: language === 'hi' ? '❌ कुछ गलत हो गया। फिर से कोशिश करें।' : '❌ Something went wrong. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleVoiceResult = (transcript) => {
        setInputValue(transcript);
        setTimeout(() => handleSendMessage(transcript), 300);
    };

    const handleSpeak = async (text) => {
        if (isSpeakingState) {
            stopSpeaking();
            setIsSpeakingState(false);
        } else {
            const plain = text.replace(/[#*_`]/g, '').replace(/\n/g, '. ');
            setIsSpeakingState(true);
            try {
                await speak(plain, language === 'hi' ? 'hi-IN' : 'en-IN');
            } catch (error) {
                console.error('Speech error:', error);
            }
            // Auto-reset after estimated duration (or when speech ends naturally)
            setTimeout(() => setIsSpeakingState(false), Math.min(plain.length * 80, 30000));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickPrompts = language === 'hi'
        ? ['छात्र ध्यान नहीं दे रहे', 'गणित कैसे समझाऊं', 'पढ़ने में सुधार']
        : ['Students not paying attention', 'How to explain math', 'Improve reading'];

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] md:h-[calc(100vh-80px)]">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary-500/20">💬</div>
                        <div>
                            <h1 className="font-semibold text-slate-800">{language === 'hi' ? 'AI कोच' : 'AI Coach'}</h1>
                            <p className="text-xs text-slate-500">{isOnline ? (language === 'hi' ? 'ऑनलाइन' : 'Online') : (language === 'hi' ? 'ऑफ़लाइन' : 'Offline')}</p>
                        </div>
                    </div>
                    {messages.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => { setMessages([]); stopSpeaking(); }}>
                            {language === 'hi' ? 'नई चैट' : 'New Chat'}
                        </Button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className="group">
                            <ChatMessage message={msg.content} isUser={msg.role === 'user'} />
                            {msg.role === 'assistant' && i > 0 && (
                                <div className="mt-2 flex items-center gap-2">
                                    <button
                                        onClick={() => handleSpeak(msg.content)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${isSpeakingState ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                                    >
                                        {isSpeakingState ? '🔇' : '🔊'} {language === 'hi' ? (isSpeakingState ? 'रोकें' : 'सुनें') : (isSpeakingState ? 'Stop' : 'Listen')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && <ChatMessage isTyping />}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && !isLoading && (
                <div className="flex-shrink-0 px-4 py-3 border-t border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs text-slate-500 mb-2">{language === 'hi' ? 'जल्दी से पूछें:' : 'Quick ask:'}</p>
                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((p, i) => (
                                <button key={i} onClick={() => handleSendMessage(p)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700">{p}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-slate-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-end gap-3">
                        <VoiceButton onResult={handleVoiceResult} onError={console.error} language={language === 'hi' ? 'hi-IN' : 'en-IN'} size="md" />
                        <textarea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={language === 'hi' ? 'अपना सवाल यहां लिखें...' : 'Type your question here...'}
                            rows={1}
                            className="flex-1 px-4 py-3 bg-slate-100 border-2 border-transparent rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white resize-none"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                        <Button variant="primary" size="lg" onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading} loading={isLoading}>
                            {language === 'hi' ? 'भेजें' : 'Send'}
                        </Button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">{language === 'hi' ? '🎤 माइक बटन दबाकर बोलें' : '🎤 Press mic to speak'}</p>
                </div>
            </div>
        </div>
    );
}
