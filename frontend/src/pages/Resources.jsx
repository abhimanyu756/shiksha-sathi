import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getMicroLessons, getMicroLesson, getCategories } from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function Resources({ language }) {
    const [lessons, setLessons] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, [language]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [lessonsRes, catsRes] = await Promise.all([getMicroLessons(language), getCategories(language)]);
            setLessons(lessonsRes.lessons);
            setCategories(catsRes.categories);
        } catch (error) {
            console.error('Failed:', error);
            setLessons([
                { id: 'ml_001', category: 'classroom_management', title: language === 'hi' ? '5 मिनट के ध्यान आकर्षक' : '5-Minute Attention Grabbers', duration: '5 min', preview: '## Quick techniques...' },
                { id: 'ml_002', category: 'pedagogy_math', title: language === 'hi' ? 'घटाव में शून्य' : 'Teaching Zero', duration: '10 min', preview: '## Understanding zero...' },
            ]);
            setCategories([
                { id: 'classroom_management', name: language === 'hi' ? 'कक्षा प्रबंधन' : 'Classroom Management', icon: '👥' },
                { id: 'pedagogy_math', name: language === 'hi' ? 'गणित' : 'Math Teaching', icon: '🔢' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleLessonClick = async (id) => {
        try {
            const res = await getMicroLesson(id, language);
            setSelectedLesson(res.lesson);
        } catch (error) {
            const lesson = lessons.find(l => l.id === id);
            if (lesson) setSelectedLesson({ ...lesson, content: lesson.preview });
        }
    };

    const filtered = selectedCategory ? lessons.filter(l => l.category === selectedCategory) : lessons;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    if (selectedLesson) return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="mb-6">← {language === 'hi' ? 'वापस' : 'Back'}</Button>
                <Card padding="lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">📖</div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">{selectedLesson.title}</h1>
                            <p className="text-sm text-slate-500">⏱️ {selectedLesson.duration}</p>
                        </div>
                    </div>
                    <div className="markdown-content"><ReactMarkdown>{selectedLesson.content}</ReactMarkdown></div>
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">{language === 'hi' ? '💡 आज अपनी कक्षा में आज़माएं!' : '💡 Try this today!'}</p>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{language === 'hi' ? 'माइक्रो-लर्निंग' : 'Micro-Learning'}</h1>
                    <p className="text-slate-600">{language === 'hi' ? '5-10 मिनट के छोटे पाठ' : '5-10 minute bite-sized lessons'}</p>
                </div>

                {/* Filters */}
                <div className="flex overflow-x-auto gap-2 pb-4 mb-8">
                    <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap ${!selectedCategory ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}>
                        {language === 'hi' ? 'सभी' : 'All'}
                    </button>
                    {categories.map((cat) => (
                        <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap ${selectedCategory === cat.id ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}>
                            <span>{cat.icon}</span>{cat.name}
                        </button>
                    ))}
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((lesson, i) => (
                        <Card key={lesson.id} hover onClick={() => handleLessonClick(lesson.id)} className="animate-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center text-xl">📚</div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-800 truncate">{lesson.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1">⏱️ {lesson.duration}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2">{lesson.preview.replace(/^##?\s*/gm, '').substring(0, 80)}...</p>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                                <span className="text-xs text-primary-600 font-medium">{language === 'hi' ? 'पढ़ें →' : 'Read →'}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-4">📭</p>
                        <p className="text-slate-600">{language === 'hi' ? 'कोई पाठ नहीं मिला' : 'No lessons found'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
