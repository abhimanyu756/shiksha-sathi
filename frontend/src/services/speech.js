/**
 * Text-to-Speech utility
 */

// Voices load asynchronously, so we need to wait for them
let voicesLoaded = false;
let voicesPromise = null;

function loadVoices() {
    if (voicesPromise) return voicesPromise;

    voicesPromise = new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            resolve([]);
            return;
        }

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            voicesLoaded = true;
            resolve(voices);
            return;
        }

        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = () => {
            voicesLoaded = true;
            resolve(window.speechSynthesis.getVoices());
        };

        // Timeout fallback
        setTimeout(() => {
            resolve(window.speechSynthesis.getVoices());
        }, 1000);
    });

    return voicesPromise;
}

// Initialize voices on load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    loadVoices();
}

export async function speak(text, language = 'hi-IN') {
    if (!('speechSynthesis' in window)) {
        console.warn('Text-to-speech not supported');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Wait for voices to load
    const voices = await loadVoices();

    // Try to find a voice for the language
    const langPrefix = language.split('-')[0];
    const voice = voices.find(v => v.lang.startsWith(langPrefix)) ||
        voices.find(v => v.lang === language) ||
        voices.find(v => v.default);

    if (voice) {
        utterance.voice = voice;
    }

    // Chrome bug workaround: sometimes speech stops mid-way
    // Resume if paused
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }

    window.speechSynthesis.speak(utterance);

    // Chrome bug: keep alive by periodically resuming
    const keepAliveInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
            clearInterval(keepAliveInterval);
        } else {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
        }
    }, 10000);

    utterance.onend = () => clearInterval(keepAliveInterval);
    utterance.onerror = () => clearInterval(keepAliveInterval);
}

/**
 * Stop speaking
 */
export function stopSpeaking() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Check if speech synthesis is speaking
 */
export function isSpeaking() {
    return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}

/**
 * Get available voices for a language
 */
export async function getVoicesForLanguage(language) {
    if (!('speechSynthesis' in window)) {
        return [];
    }

    const voices = await loadVoices();
    return voices.filter(v => v.lang.startsWith(language.split('-')[0]));
}

