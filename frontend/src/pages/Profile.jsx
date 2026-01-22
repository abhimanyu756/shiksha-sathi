import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getSetting, saveSetting } from '../services/db';

export default function Profile({ language }) {
    const [profile, setProfile] = useState({
        name: '',
        school: '',
        district: '',
        classes: '',
        subjects: '',
        experience: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const savedProfile = await getSetting('teacherProfile');
            // getSetting returns the value directly, not {value: ...}
            if (savedProfile && typeof savedProfile === 'object') {
                setProfile(prev => ({ ...prev, ...savedProfile }));
            }
        } catch (error) {
            console.error('Failed to load profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveSetting('teacherProfile', profile);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const labels = {
        name: language === 'hi' ? 'आपका नाम' : 'Your Name',
        school: language === 'hi' ? 'विद्यालय का नाम' : 'School Name',
        district: language === 'hi' ? 'जिला' : 'District',
        classes: language === 'hi' ? 'कौन सी कक्षाएं पढ़ाते हैं?' : 'Which classes do you teach?',
        subjects: language === 'hi' ? 'कौन से विषय?' : 'Which subjects?',
        experience: language === 'hi' ? 'अनुभव (वर्षों में)' : 'Experience (years)'
    };

    const placeholders = {
        name: language === 'hi' ? 'राम शर्मा' : 'Ram Sharma',
        school: language === 'hi' ? 'सरकारी प्राथमिक विद्यालय' : 'Government Primary School',
        district: language === 'hi' ? 'जयपुर' : 'Jaipur',
        classes: language === 'hi' ? 'कक्षा 3, 4, 5' : 'Class 3, 4, 5',
        subjects: language === 'hi' ? 'गणित, हिंदी, EVS' : 'Math, Hindi, EVS',
        experience: '5'
    };

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-4xl shadow-xl shadow-primary-500/20">
                        👩‍🏫
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                        {language === 'hi' ? 'शिक्षक प्रोफ़ाइल' : 'Teacher Profile'}
                    </h1>
                    <p className="text-slate-600">
                        {language === 'hi' ? 'आपकी जानकारी आपके डिवाइस पर सुरक्षित रहती है' : 'Your information stays secure on your device'}
                    </p>
                </div>

                <Card className="mb-6">
                    <div className="space-y-6">
                        {Object.keys(labels).map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {labels[field]}
                                </label>
                                <input
                                    type={field === 'experience' ? 'number' : 'text'}
                                    name={field}
                                    value={profile[field]}
                                    onChange={handleChange}
                                    placeholder={placeholders[field]}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            loading={isSaving}
                            className="flex-1"
                        >
                            {language === 'hi' ? '💾 सहेजें' : '💾 Save Profile'}
                        </Button>
                        {saved && (
                            <span className="text-green-600 text-sm animate-fade-in">
                                ✅ {language === 'hi' ? 'सहेज लिया गया!' : 'Saved!'}
                            </span>
                        )}
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-none">
                    <div className="flex items-start gap-4">
                        <span className="text-3xl">💡</span>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                                {language === 'hi' ? 'क्यों भरें?' : 'Why fill this?'}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {language === 'hi'
                                    ? 'आपकी प्रोफ़ाइल जानकारी AI कोच को आपकी कक्षा और अनुभव के अनुसार बेहतर सलाह देने में मदद करती है।'
                                    : 'Your profile helps the AI coach give better advice tailored to your classes and experience level.'}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* PWA Install Prompt */}
                <Card className="mt-6 bg-slate-800 text-white border-none">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">📱</span>
                        <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                                {language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install App'}
                            </h3>
                            <p className="text-sm text-slate-300">
                                {language === 'hi'
                                    ? 'होम स्क्रीन पर जोड़ें और ऑफ़लाइन उपयोग करें!'
                                    : 'Add to home screen for offline use!'}
                            </p>
                        </div>
                        <div className="text-2xl">⬇️</div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
