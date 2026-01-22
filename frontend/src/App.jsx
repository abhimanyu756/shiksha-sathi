import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Coach from './pages/Coach';
import Scenarios from './pages/Scenarios';
import Resources from './pages/Resources';
import History from './pages/History';
import Profile from './pages/Profile';
import Videos from './pages/Videos';
import Analytics from './pages/Analytics';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('shikshak-language') || 'en';
    });

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('shikshak-language', language);
    }, [language]);

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50">
                <Header language={language} setLanguage={setLanguage} />
                <OfflineIndicator isOnline={isOnline} language={language} />
                <main className="pb-20 md:pb-8">
                    <Routes>
                        <Route path="/" element={<Home language={language} />} />
                        <Route path="/coach" element={<Coach language={language} isOnline={isOnline} />} />
                        <Route path="/scenarios" element={<Scenarios language={language} />} />
                        <Route path="/resources" element={<Resources language={language} />} />
                        <Route path="/videos" element={<Videos language={language} />} />
                        <Route path="/history" element={<History language={language} />} />
                        <Route path="/analytics" element={<Analytics language={language} />} />
                        <Route path="/profile" element={<Profile language={language} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;


