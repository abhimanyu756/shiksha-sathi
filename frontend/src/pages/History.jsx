import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getAllChats, deleteChat } from '../services/db';

export default function History({ language }) {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadChats(); }, []);

    const loadChats = async () => {
        try {
            setLoading(true);
            const all = await getAllChats();
            setChats(all.reverse());
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm(language === 'hi' ? 'हटाएं?' : 'Delete this chat?')) {
            await deleteChat(id);
            setChats(prev => prev.filter(c => c.id !== id));
        }
    };

    const formatDate = (iso) => {
        const date = new Date(iso);
        const now = new Date();
        const diffMins = Math.floor((now - date) / 60000);
        const diffHours = Math.floor((now - date) / 3600000);
        const diffDays = Math.floor((now - date) / 86400000);
        if (diffMins < 1) return language === 'hi' ? 'अभी' : 'Just now';
        if (diffMins < 60) return language === 'hi' ? `${diffMins} मिनट पहले` : `${diffMins}m ago`;
        if (diffHours < 24) return language === 'hi' ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
        if (diffDays < 7) return language === 'hi' ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
        return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short' });
    };

    const getFirstUserMessage = (messages) => {
        const user = messages?.find(m => m.role === 'user');
        if (!user) return language === 'hi' ? 'खाली बातचीत' : 'Empty conversation';
        return user.content.substring(0, 100) + (user.content.length > 100 ? '...' : '');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{language === 'hi' ? 'चैट इतिहास' : 'Chat History'}</h1>
                    <p className="text-slate-600">{language === 'hi' ? 'आपकी पिछली बातचीत' : 'Your previous conversations'}</p>
                </div>

                {chats.length === 0 ? (
                    <Card className="text-center py-16">
                        <p className="text-5xl mb-4">📭</p>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{language === 'hi' ? 'कोई इतिहास नहीं' : 'No History Yet'}</h3>
                        <p className="text-slate-600 mb-6">{language === 'hi' ? 'AI कोच से पूछें' : 'Ask the AI Coach to get started'}</p>
                        <Button variant="primary" onClick={() => navigate('/coach')}>{language === 'hi' ? '💬 कोचिंग शुरू करें' : '💬 Start Coaching'}</Button>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {chats.map((chat, i) => (
                            <Card
                                key={chat.id}
                                hover
                                onClick={() => navigate(`/coach?chatId=${chat.id}`)}
                                className="animate-in group cursor-pointer"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">💬</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs text-slate-500">{formatDate(chat.timestamp)}</p>
                                            <button onClick={(e) => handleDelete(chat.id, e)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100">🗑️</button>
                                        </div>
                                        <p className="text-slate-800 font-medium line-clamp-2">{getFirstUserMessage(chat.messages)}</p>
                                        <p className="text-xs text-slate-500 mt-2">{chat.messages?.length || 0} {language === 'hi' ? 'संदेश' : 'messages'}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <Card className="mt-8 bg-slate-50 border-slate-200">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>💾</span>
                        <p>{language === 'hi' ? 'चैट आपके डिवाइस पर सहेजे जाते हैं' : 'Chats are saved locally on your device'}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
