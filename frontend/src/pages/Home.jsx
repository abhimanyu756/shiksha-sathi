import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home({ language }) {
    const content = {
        en: {
            hero: {
                title: 'Your Personal',
                titleHighlight: 'Teaching Coach',
                subtitle: 'Get instant, personalized guidance for classroom challenges. Voice-enabled. Offline-ready. In your language.',
                cta: 'Start Coaching',
                secondaryCta: 'View Scenarios',
            },
            features: [
                { icon: '🎤', title: 'Voice-First', description: 'Ask questions in Hindi or English using your voice' },
                { icon: '📴', title: 'Works Offline', description: 'Essential coaching available even without internet' },
                { icon: '⚡', title: 'Instant Answers', description: 'Get specific, actionable strategies in seconds' },
                { icon: '🎯', title: 'Context-Aware', description: 'Advice tailored for Indian classrooms and FLN' },
            ],
            scenarios: {
                title: 'Quick Scenarios',
                subtitle: 'Tap a common challenge to get instant help',
                items: [
                    { icon: '👥', label: 'Students not paying attention' },
                    { icon: '📐', label: 'Explaining difficult math concepts' },
                    { icon: '📖', label: 'Improving reading fluency' },
                    { icon: '🎓', label: 'Managing multi-grade classroom' },
                ],
            },
            stats: {
                title: 'Built for Teachers Like You',
                items: [
                    { value: '< 5s', label: 'Response Time' },
                    { value: '🌐', label: 'Bilingual' },
                    { value: '📴', label: 'Offline Ready' },
                    { value: '24/7', label: 'Always Available' },
                ],
            },
        },
        hi: {
            hero: {
                title: 'आपका व्यक्तिगत',
                titleHighlight: 'शिक्षण कोच',
                subtitle: 'कक्षा की चुनौतियों के लिए तुरंत, व्यक्तिगत मार्गदर्शन प्राप्त करें। वॉइस-सक्षम। ऑफ़लाइन-तैयार।',
                cta: 'कोचिंग शुरू करें',
                secondaryCta: 'परिदृश्य देखें',
            },
            features: [
                { icon: '🎤', title: 'वॉइस-फर्स्ट', description: 'हिंदी या अंग्रेजी में अपनी आवाज़ से प्रश्न पूछें' },
                { icon: '📴', title: 'ऑफ़लाइन काम करता है', description: 'इंटरनेट के बिना भी कोचिंग उपलब्ध' },
                { icon: '⚡', title: 'तुरंत जवाब', description: 'सेकंडों में कार्रवाई योग्य रणनीतियाँ प्राप्त करें' },
                { icon: '🎯', title: 'संदर्भ-जागरूक', description: 'भारतीय कक्षाओं और FLN के लिए अनुकूलित' },
            ],
            scenarios: {
                title: 'त्वरित परिदृश्य',
                subtitle: 'तुरंत मदद पाने के लिए एक चुनौती पर टैप करें',
                items: [
                    { icon: '👥', label: 'छात्र ध्यान नहीं दे रहे' },
                    { icon: '📐', label: 'कठिन गणित अवधारणाओं को समझाना' },
                    { icon: '📖', label: 'पढ़ने की प्रवाहिता में सुधार' },
                    { icon: '🎓', label: 'बहु-ग्रेड कक्षा का प्रबंधन' },
                ],
            },
            stats: {
                title: 'आप जैसे शिक्षकों के लिए बनाया गया',
                items: [
                    { value: '< 5s', label: 'प्रतिक्रिया समय' },
                    { value: '🌐', label: 'द्विभाषी' },
                    { value: '📴', label: 'ऑफ़लाइन तैयार' },
                    { value: '24/7', label: 'हमेशा उपलब्ध' },
                ],
            },
        },
    };

    const c = content[language] || content.en;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 py-16 md:py-24">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                        <span>🇮🇳</span>
                        <span>{language === 'hi' ? 'भारतीय शिक्षकों के लिए' : 'Made for Indian Teachers'}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
                        {c.hero.title}{' '}
                        <span className="gradient-text">{c.hero.titleHighlight}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                        {c.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/coach">
                            <Button variant="primary" size="xl" icon="💬">{c.hero.cta}</Button>
                        </Link>
                        <Link to="/scenarios">
                            <Button variant="secondary" size="xl" icon="📋">{c.hero.secondaryCta}</Button>
                        </Link>
                    </div>

                    {/* Chat Preview */}
                    <div className="mt-12 md:mt-16">
                        <div className="mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl shadow-slate-900/10 p-6 border border-slate-100">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">👩‍🏫</div>
                                <div className="message-user">
                                    <p className="text-sm">
                                        {language === 'hi'
                                            ? 'मेरे छात्र घटाव में शून्य नहीं समझ रहे। क्या करूं?'
                                            : 'My students don\'t understand zero in subtraction. Help!'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-xl">🤖</div>
                                <div className="message-assistant">
                                    <p className="text-sm font-medium mb-1">
                                        {language === 'hi' ? '🎯 बंडल गेम आज़माएं:' : '🎯 Try the Bundle Game:'}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {language === 'hi'
                                            ? '30 छड़ियों को 3 बंडलों में बांधें...'
                                            : 'Tie 30 sticks into 3 bundles of 10...'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 py-16 bg-slate-50/50">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {c.features.map((feature, i) => (
                            <Card key={i} hover className="text-center">
                                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-600">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Scenarios */}
            <section className="px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{c.scenarios.title}</h2>
                        <p className="text-slate-600">{c.scenarios.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {c.scenarios.items.map((item, i) => (
                            <Link key={i} to={`/coach?q=${encodeURIComponent(item.label)}`}>
                                <Card hover className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-2xl">{item.icon}</div>
                                    <p className="font-medium text-slate-800 flex-1">{item.label}</p>
                                    <span className="text-slate-400">→</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="px-4 py-16 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.stats.title}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {c.stats.items.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-primary-200 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                        {language === 'hi' ? 'आज ही शुरू करें' : 'Get Started Today'}
                    </h2>
                    <p className="text-slate-600 mb-8">
                        {language === 'hi' ? 'अपनी कक्षा की किसी भी चुनौती के लिए तुरंत मदद पाएं' : 'Get instant help for any classroom challenge you face'}
                    </p>
                    <Link to="/coach">
                        <Button variant="accent" size="xl" icon="🚀">
                            {language === 'hi' ? 'अभी पूछें' : 'Ask Now'}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
