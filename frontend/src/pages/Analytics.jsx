import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { getUsageStats, getPopularTopics } from '../services/analytics';

export default function Analytics({ language }) {
    const [stats, setStats] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const usageStats = await getUsageStats(30);
            const popularTopics = await getPopularTopics();
            setStats(usageStats.totals);
            setTopics(popularTopics);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const labels = {
        title: language === 'hi' ? 'आपके आंकड़े' : 'Your Analytics',
        subtitle: language === 'hi' ? 'आपकी सीखने की यात्रा ट्रैक करें' : 'Track your learning journey',
        questionsAsked: language === 'hi' ? 'पूछे गए सवाल' : 'Questions Asked',
        lessonsViewed: language === 'hi' ? 'देखे गए पाठ' : 'Lessons Viewed',
        videosWatched: language === 'hi' ? 'देखे गए वीडियो' : 'Videos Watched',
        scenariosUsed: language === 'hi' ? 'उपयोग किए गए परिदृश्य' : 'Scenarios Used',
        activeStreak: language === 'hi' ? 'सक्रिय दिन' : 'Active Streak',
        days: language === 'hi' ? 'दिन' : 'days',
        popularTopics: language === 'hi' ? 'लोकप्रिय विषय' : 'Popular Topics',
        noData: language === 'hi' ? 'अभी तक कोई डेटा नहीं। ऐप का उपयोग शुरू करें!' : 'No data yet. Start using the app!',
        last30Days: language === 'hi' ? 'पिछले 30 दिन' : 'Last 30 days'
    };

    const statCards = [
        { key: 'questionsAsked', icon: '❓', color: 'from-blue-500 to-blue-600' },
        { key: 'lessonsViewed', icon: '📚', color: 'from-green-500 to-green-600' },
        { key: 'videosWatched', icon: '🎬', color: 'from-purple-500 to-purple-600' },
        { key: 'scenariosUsed', icon: '📋', color: 'from-orange-500 to-orange-600' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                        📊
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                        {labels.title}
                    </h1>
                    <p className="text-slate-600">{labels.subtitle}</p>
                    <p className="text-xs text-slate-400 mt-1">{labels.last30Days}</p>
                </div>

                {/* Streak Banner */}
                <Card className="mb-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white border-none">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">🔥</span>
                            <div>
                                <p className="text-white/80 text-sm">{labels.activeStreak}</p>
                                <p className="text-3xl font-bold">
                                    {stats?.currentStreak || 0} {labels.days}
                                </p>
                            </div>
                        </div>
                        <div className="text-6xl opacity-20">📈</div>
                    </div>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {statCards.map(({ key, icon, color }) => (
                        <Card key={key} className="text-center py-6">
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl text-white shadow-lg`}>
                                {icon}
                            </div>
                            <p className="text-3xl font-bold text-slate-800">
                                {stats?.[key] || 0}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {labels[key]}
                            </p>
                        </Card>
                    ))}
                </div>

                {/* Popular Topics */}
                {topics.length > 0 && (
                    <Card className="mb-6">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">🏆</span>
                            {labels.popularTopics}
                        </h3>
                        <div className="space-y-3">
                            {topics.map((t, i) => (
                                <div key={t.topic} className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-slate-700">{t.topic}</span>
                                            <span className="text-xs text-slate-500">{t.count} times</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div
                                                className="bg-primary-500 h-2 rounded-full"
                                                style={{ width: `${Math.min((t.count / topics[0].count) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Tips */}
                <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
                    <div className="flex items-start gap-4">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                                {language === 'hi' ? 'टिप' : 'Tip'}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {language === 'hi'
                                    ? 'रोज़ाना कम से कम एक सवाल पूछें अपनी स्ट्रीक बनाए रखने के लिए!'
                                    : 'Ask at least one question daily to maintain your streak!'}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
