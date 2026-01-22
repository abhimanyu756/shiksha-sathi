import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LANGUAGES } from '../services/i18n';

export default function Header({ language, setLanguage }) {
    const location = useLocation();
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    // Main navigation items (shown in header and mobile bottom nav)
    const mainNavItems = [
        { path: '/', label: { en: 'Home', hi: 'होम', ta: 'முகப்பு', te: 'హోమ్', mr: 'होम', bn: 'হোম', gu: 'હોમ' }, icon: '🏠' },
        { path: '/coach', label: { en: 'Coach', hi: 'कोच', ta: 'கோச்', te: 'కోచ్', mr: 'कोच', bn: 'কোচ', gu: 'કોચ' }, icon: '💬' },
        { path: '/scenarios', label: { en: 'Scenarios', hi: 'परिदृश्य', ta: 'காட்சிகள்', te: 'సన్నివేశాలు', mr: 'परिस्थिती', bn: 'পরিস্থিতি', gu: 'દ્રશ્યો' }, icon: '📋' },
        { path: '/resources', label: { en: 'Resources', hi: 'संसाधन', ta: 'வளங்கள்', te: 'వనరులు', mr: 'संसाधने', bn: 'সম্পদ', gu: 'સંસાધનો' }, icon: '📚' },
        { path: '/videos', label: { en: 'Videos', hi: 'वीडियो', ta: 'வீடியோ', te: 'వీడియోలు', mr: 'व्हिडिओ', bn: 'ভিডিও', gu: 'વિડીયો' }, icon: '🎬' },
    ];

    // Secondary nav items (shown in desktop header dropdown or profile section)
    const secondaryNavItems = [
        { path: '/history', label: { en: 'History', hi: 'इतिहास', ta: 'வரலாறு', te: 'చరిత్ర', mr: 'इतिहास', bn: 'ইতিহাস', gu: 'ઇતિહાસ' }, icon: '📜' },
        { path: '/analytics', label: { en: 'Analytics', hi: 'विश्लेषण', ta: 'பகுப்பாய்வு', te: 'విశ్లేషణ', mr: 'विश्लेषण', bn: 'বিশ্লেষণ', gu: 'વિશ્લેષણ' }, icon: '📊' },
        { path: '/profile', label: { en: 'Profile', hi: 'प्रोफ़ाइल', ta: 'சுயவிவரம்', te: 'ప్రొఫైల్', mr: 'प्रोफाइल', bn: 'প্রোফাইল', gu: 'પ્રોફાઇલ' }, icon: '👩‍🏫' },
    ];

    const allNavItems = [...mainNavItems, ...secondaryNavItems];
    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    const getLabel = (labels) => labels[language] || labels['en'];

    return (
        <>
            {/* Desktop Header */}
            <header className="hidden md:block sticky top-0 z-50 glass border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary-500/30">
                                📚
                            </div>
                            <div>
                                <h1 className="text-lg font-bold gradient-text">शिक्षक साथी</h1>
                                <p className="text-xs text-slate-500">AI Teaching Assistant</p>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-1">
                            {allNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${location.pathname === item.path
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {getLabel(item.label)}
                                </Link>
                            ))}
                        </nav>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                            >
                                🌐 {currentLang.nativeName}
                                <span className="text-xs">▼</span>
                            </button>
                            {langMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center justify-between ${language === lang.code ? 'bg-primary-50 text-primary-700' : 'text-slate-700'}`}
                                        >
                                            <span>{lang.nativeName}</span>
                                            <span className="text-xs text-slate-400">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-50 glass border-b border-slate-200/50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-lg shadow-lg shadow-primary-500/30">
                            📚
                        </div>
                        <span className="text-base font-bold gradient-text">शिक्षक साथी</span>
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                        >
                            🌐 {currentLang.code.toUpperCase()}
                        </button>
                        {langMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setLangMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm ${language === lang.code ? 'bg-primary-50 text-primary-700' : 'text-slate-700'}`}
                                    >
                                        {lang.nativeName}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-1 py-1.5">
                <div className="flex justify-around">
                    {[...mainNavItems, { path: '/profile', label: { en: 'More', hi: 'अधिक', ta: 'மேலும்', te: 'మరింత', mr: 'अधिक', bn: 'আরও', gu: 'વધુ' }, icon: '⋯' }].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${location.pathname === item.path
                                ? 'text-primary-600'
                                : 'text-slate-500'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-[9px] font-medium">{getLabel(item.label)}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Click outside to close language menu */}
            {langMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                />
            )}
        </>
    );
}

