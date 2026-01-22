import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { getScenarios } from '../services/api';

export default function Scenarios({ language }) {
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        loadScenarios();
    }, [language]);

    const loadScenarios = async () => {
        try {
            setLoading(true);
            const result = await getScenarios(language);
            setScenarios(result.scenarios);
            if (result.scenarios.length > 0) setActiveCategory(result.scenarios[0].id);
        } catch (error) {
            console.error('Failed to load:', error);
            setScenarios(getFallback(language));
            setActiveCategory('classroom_management');
        } finally {
            setLoading(false);
        }
    };

    const getFallback = (lang) => lang === 'hi' ? [
        {
            id: 'classroom_management', title: 'कक्षा प्रबंधन', prompts: [
                { id: '1', text: 'छात्र ध्यान नहीं दे रहे। क्या करूं?' },
                { id: '2', text: 'कुछ छात्र बाधा डाल रहे हैं।' },
            ]
        },
        {
            id: 'pedagogy_math', title: 'गणित शिक्षण', prompts: [
                { id: '3', text: 'भिन्न कैसे समझाऊं?' },
                { id: '4', text: 'घटाव में शून्य कैसे सिखाऊं?' },
            ]
        },
    ] : [
        {
            id: 'classroom_management', title: 'Classroom Management', prompts: [
                { id: '1', text: 'Students are not paying attention. What should I do?' },
                { id: '2', text: 'Some students are being disruptive.' },
            ]
        },
        {
            id: 'pedagogy_math', title: 'Math Teaching', prompts: [
                { id: '3', text: 'How do I explain fractions?' },
                { id: '4', text: 'How to teach zero in subtraction?' },
            ]
        },
    ];

    const icons = { classroom_management: '👥', pedagogy_math: '🔢', pedagogy_language: '📖', fln: '🎯', assessment: '📊' };
    const colors = { classroom_management: 'bg-blue-100 text-blue-700', pedagogy_math: 'bg-purple-100 text-purple-700', pedagogy_language: 'bg-green-100 text-green-700', fln: 'bg-orange-100 text-orange-700', assessment: 'bg-pink-100 text-pink-700' };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                        {language === 'hi' ? 'त्वरित परिदृश्य' : 'Quick Scenarios'}
                    </h1>
                    <p className="text-slate-600">{language === 'hi' ? 'एक चुनौती चुनें और AI कोचिंग प्राप्त करें' : 'Select a challenge and get instant AI coaching'}</p>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
                    {scenarios.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all border-2 ${activeCategory === cat.id ? 'bg-primary-600 text-white border-primary-600 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
                                }`}
                        >
                            <span>{icons[cat.id] || '📌'}</span>{cat.title}
                        </button>
                    ))}
                </div>

                {/* Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenarios.find(c => c.id === activeCategory)?.prompts.map((prompt, i) => (
                        <Card key={prompt.id} hover onClick={() => navigate(`/coach?q=${encodeURIComponent(prompt.text)}`)} className="animate-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[activeCategory] || 'bg-slate-100'}`}>
                                    {icons[activeCategory] || '📌'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-800 font-medium">{prompt.text}</p>
                                    <p className="text-xs text-slate-400 mt-2">{language === 'hi' ? 'टैप करें →' : 'Tap to ask →'}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Custom CTA */}
                <Card className="mt-8 bg-gradient-to-br from-primary-50 to-accent-50 border-none text-center">
                    <p className="text-slate-700 mb-4">{language === 'hi' ? 'अपना खुद का सवाल पूछें?' : 'Want to ask your own question?'}</p>
                    <button onClick={() => navigate('/coach')} className="btn-primary">
                        {language === 'hi' ? '💬 कस्टम क्वेरी' : '💬 Custom Query'}
                    </button>
                </Card>
            </div>
        </div>
    );
}
