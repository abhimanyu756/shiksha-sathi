import { useState } from 'react';
import Card from '../components/ui/Card';
import { trackEvent } from '../services/analytics';

// Video tutorials data - Real YouTube videos for Indian teachers
const VIDEO_TUTORIALS = [
    {
        id: 'v1',
        category: 'classroom_management',
        title: 'Classroom Management Strategies',
        titleHi: 'कक्षा प्रबंधन रणनीतियां',
        duration: '12:45',
        thumbnail: '🎯',
        description: 'Effective strategies for managing a classroom of 30+ students',
        descriptionHi: '30+ छात्रों की कक्षा प्रबंधित करने की प्रभावी रणनीतियां',
        videoId: 'F3iBx2bMUGg' // Real classroom management video
    },
    {
        id: 'v2',
        category: 'classroom_management',
        title: 'Attention Grabbing Techniques',
        titleHi: 'ध्यान आकर्षित करने की तकनीकें',
        duration: '8:20',
        thumbnail: '👥',
        description: 'Quick ways to get students attention without shouting',
        descriptionHi: 'बिना चिल्लाए छात्रों का ध्यान आकर्षित करने के तरीके',
        videoId: 'SIRELZzqahE' // Teaching techniques video
    },
    {
        id: 'v3',
        category: 'pedagogy_math',
        title: 'Teaching Fractions with Real Objects',
        titleHi: 'वास्तविक वस्तुओं से भिन्न सिखाना',
        duration: '10:15',
        thumbnail: '🔢',
        description: 'Use rotis, fruits to teach fractions in a fun way',
        descriptionHi: 'रोटी, फल से भिन्न को मज़ेदार तरीके से सिखाएं',
        videoId: 'n0FZhQ_GkKw' // Math teaching video
    },
    {
        id: 'v4',
        category: 'pedagogy_math',
        title: 'Multiplication Tables Made Fun',
        titleHi: 'पहाड़े मज़ेदार तरीके से',
        duration: '7:30',
        thumbnail: '✖️',
        description: 'Songs and games to teach multiplication tables',
        descriptionHi: 'पहाड़े सिखाने के लिए गाने और खेल',
        videoId: 'ViyBQyN6wUI' // Tables song/game
    },
    {
        id: 'v5',
        category: 'pedagogy_language',
        title: 'Building Reading Fluency',
        titleHi: 'पढ़ने की प्रवाहिता बनाना',
        duration: '9:00',
        thumbnail: '📖',
        description: 'Echo reading, partner reading, and more techniques',
        descriptionHi: 'इको रीडिंग, पार्टनर रीडिंग और अधिक तकनीकें',
        videoId: 'GNPO8wTPQLE' // Reading fluency strategies
    },
    {
        id: 'v6',
        category: 'pedagogy_language',
        title: 'Story Telling in Classroom',
        titleHi: 'कक्षा में कहानी सुनाना',
        duration: '11:20',
        thumbnail: '📚',
        description: 'Using stories to teach language and values',
        descriptionHi: 'भाषा और मूल्यों को सिखाने के लिए कहानियों का उपयोग',
        videoId: 'e-YZvLUXc0g' // Storytelling techniques
    },
    {
        id: 'v7',
        category: 'fln',
        title: 'Phonics for Beginners (Hindi)',
        titleHi: 'शुरुआती के लिए फोनिक्स',
        duration: '15:00',
        thumbnail: '🔤',
        description: 'Teaching letter sounds to Class 1 students',
        descriptionHi: 'कक्षा 1 के छात्रों को अक्षर ध्वनियां सिखाना',
        videoId: 'R0TtS0Wfp94' // Phonics for beginners
    },
    {
        id: 'v8',
        category: 'fln',
        title: 'Number Recognition Activities',
        titleHi: 'संख्या पहचान गतिविधियां',
        duration: '8:45',
        thumbnail: '🔢',
        description: 'Fun activities to teach numbers 1-100',
        descriptionHi: '1-100 संख्याएं सिखाने की मज़ेदार गतिविधियां',
        videoId: 'bGetqbqDVaA' // Number activities
    },
    {
        id: 'v9',
        category: 'assessment',
        title: 'Quick Assessment Techniques',
        titleHi: 'त्वरित मूल्यांकन तकनीकें',
        duration: '6:30',
        thumbnail: '📝',
        description: 'Assess understanding in seconds without tests',
        descriptionHi: 'टेस्ट के बिना समझ का मूल्यांकन',
        videoId: 'EmHYjR4C0aU' // Assessment techniques
    },
    {
        id: 'v10',
        category: 'assessment',
        title: 'Formative Assessment Ideas',
        titleHi: 'रचनात्मक मूल्यांकन विचार',
        duration: '10:10',
        thumbnail: '✅',
        description: 'Check understanding while teaching',
        descriptionHi: 'पढ़ाते समय समझ की जांच करें',
        videoId: 'vwpWDN90iEk' // Formative assessment
    }
];

const CATEGORIES = [
    { id: 'all', label: 'All', labelHi: 'सभी', icon: '📺' },
    { id: 'classroom_management', label: 'Classroom', labelHi: 'कक्षा', icon: '👥' },
    { id: 'pedagogy_math', label: 'Math', labelHi: 'गणित', icon: '🔢' },
    { id: 'pedagogy_language', label: 'Language', labelHi: 'भाषा', icon: '📖' },
    { id: 'fln', label: 'FLN', labelHi: 'FLN', icon: '🎯' },
    { id: 'assessment', label: 'Assessment', labelHi: 'मूल्यांकन', icon: '📝' },
];

export default function Videos({ language }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [playingVideo, setPlayingVideo] = useState(null);

    const labels = {
        title: language === 'hi' ? 'वीडियो ट्यूटोरियल' : 'Video Tutorials',
        subtitle: language === 'hi' ? 'शिक्षण तकनीकें देखें और सीखें' : 'Watch and learn teaching techniques',
        watchNow: language === 'hi' ? 'अभी देखें' : 'Watch Now',
        close: language === 'hi' ? 'बंद करें' : 'Close',
        duration: language === 'hi' ? 'अवधि' : 'Duration',
        comingSoon: language === 'hi' ? 'जल्द आ रहे हैं!' : 'Coming soon!',
        videoNote: language === 'hi'
            ? 'नोट: वास्तविक वीडियो जल्द अपलोड किए जाएंगे। यह डेमो प्लेसहोल्डर है।'
            : 'Note: Actual videos will be uploaded soon. These are demo placeholders.'
    };

    const filteredVideos = selectedCategory === 'all'
        ? VIDEO_TUTORIALS
        : VIDEO_TUTORIALS.filter(v => v.category === selectedCategory);

    const handlePlayVideo = (video) => {
        setPlayingVideo(video);
        trackEvent('video_watched', { videoId: video.id, title: video.title });
    };

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-red-500/20">
                        🎬
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                        {labels.title}
                    </h1>
                    <p className="text-slate-600">{labels.subtitle}</p>
                </div>

                {/* Category Filter */}
                <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all border-2 ${selectedCategory === cat.id
                                ? 'bg-red-600 text-white border-red-600 shadow-lg'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {language === 'hi' ? cat.labelHi : cat.label}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map(video => (
                        <Card key={video.id} hover className="overflow-hidden">
                            {/* YouTube Thumbnail */}
                            <div
                                className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer group overflow-hidden"
                                onClick={() => handlePlayVideo(video)}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 hidden items-center justify-center bg-slate-800">
                                    <span className="text-5xl">{video.thumbnail}</span>
                                </div>
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-2xl ml-1">▶</span>
                                    </div>
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">
                                    {language === 'hi' ? video.titleHi : video.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-2">
                                    {language === 'hi' ? video.descriptionHi : video.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Tip Card */}
                <Card className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 border-none">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <p className="font-medium text-slate-700">
                                {language === 'hi' ? 'टिप: वीडियो डाउनलोड करें' : 'Tip: Download Videos'}
                            </p>
                            <p className="text-sm text-slate-600">
                                {language === 'hi'
                                    ? 'ऑफ़लाइन देखने के लिए वीडियो को YouTube ऐप में सेव करें।'
                                    : 'Save videos in YouTube app for offline viewing.'}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Video Player Modal with YouTube Embed */}
            {playingVideo && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center p-4 bg-slate-900">
                            <h3 className="text-white font-medium truncate pr-4">
                                {language === 'hi' ? playingVideo.titleHi : playingVideo.title}
                            </h3>
                            <button
                                onClick={() => setPlayingVideo(null)}
                                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <span>✕</span>
                                {labels.close}
                            </button>
                        </div>
                        <div className="aspect-video bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&rel=0`}
                                title={playingVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

