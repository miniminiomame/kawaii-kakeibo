import { useCallback } from 'react';

// Singleton to prevent too many AudioContexts
let globalAudioCtx: AudioContext | null = null;

export function useSound() {
    const getContext = useCallback(() => {
        if (!globalAudioCtx) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                globalAudioCtx = new AudioContextClass();
            }
        }
        return globalAudioCtx;
    }, []);

    const playOscillator = useCallback((freq: number, type: OscillatorType, duration: number, startTime: number = 0) => {
        const ctx = getContext();
        if (!ctx) return;

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
    }, [getContext]);

    const playClick = useCallback(() => {
        // High pitch short "pop"
        playOscillator(800, 'sine', 0.1);
    }, [playOscillator]);

    const playSuccess = useCallback(() => {
        // "Ta-da!" Major triad arpeggio
        playOscillator(523.25, 'sine', 0.1, 0); // C5
        playOscillator(659.25, 'sine', 0.1, 0.1); // E5
        playOscillator(783.99, 'sine', 0.2, 0.2); // G5
    }, [playOscillator]);

    const playDelete = useCallback(() => {
        // Descending slide
        const ctx = getContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }, [getContext]);

    return { playClick, playSuccess, playDelete };
}
