export default function OfflineIndicator({ isOnline, language }) {
    if (isOnline) return null;

    return (
        <div className="sticky top-16 md:top-14 z-40 animate-fade-in">
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-amber-800 font-medium">
                        {language === 'hi'
                            ? '📴 ऑफ़लाइन मोड - सहेजे गए उत्तर उपलब्ध हैं'
                            : '📴 Offline Mode - Saved responses available'}
                    </p>
                </div>
            </div>
        </div>
    );
}
