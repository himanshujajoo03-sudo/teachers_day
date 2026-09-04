import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

export const EnvelopeReveal = ({ teacher, onEnvelopeOpened }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Automatic opening animation ~800ms after mounting
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsUnlocked(true);
      playSound('unlock');
      setTimeout(() => {
        playSound('letter-open');
      }, 350);
    }, 700);

    // Auto-advance to the teacher reveal after displaying the opened letter
    const proceedTimer = setTimeout(() => {
      onEnvelopeOpened();
    }, 2800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(proceedTimer);
    };
  }, [onEnvelopeOpened]);

  const handleManualOpen = () => {
    playSound('letter-open');
    onEnvelopeOpened();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100dvh-110px)] px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* 1. Header narrative */}
      <div className="w-full min-h-[70px] flex flex-col items-center justify-center text-center mt-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-slate-400 font-sans text-xs tracking-widest uppercase mb-1">
            A special delivery
          </p>
          <h2 className="font-serif text-lg sm:text-xl text-ivory-100 font-normal leading-snug">
            {isUnlocked
              ? `Opening letter for ${teacher?.displayName || 'you'}...`
              : `A letter addressed to ${teacher?.displayName || 'you'}`}
          </h2>
        </motion.div>
      </div>

      {/* 2. The Letter Envelope Container */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[260px] my-2">
        {/* Soft Golden Aura */}
        <motion.div
          animate={{
            scale: isUnlocked ? [1, 1.15, 1] : 1,
            opacity: isUnlocked ? 0.75 : 0.35,
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gold-400/25 blur-2xl rounded-2xl pointer-events-none"
        />

        {/* Envelope Touch Card */}
        <motion.div
          onClick={handleManualOpen}
          role="button"
          tabIndex={0}
          aria-label="Opened Letter"
          animate={
            isUnlocked
              ? {
                  scale: [1, 1.04, 1],
                  y: -8,
                }
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative cursor-pointer touch-manipulation active:scale-95 my-2 w-full max-w-[280px] sm:max-w-[320px] aspect-[16/11] bg-gradient-to-b from-[#1E2538] to-[#121829] rounded-2xl border border-slate-700/80 shadow-2xl p-3 flex items-center justify-center overflow-hidden"
        >
          {/* Subtle paper highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />

          {/* Envelope Flap Vector SVG */}
          <svg
            viewBox="0 0 320 220"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 220 L160 125 L320 220 Z" fill="#0E1526" opacity="0.9" />
            <path d="M0 0 L160 130 L0 220 Z" fill="#131C30" opacity="0.95" />
            <path d="M320 0 L160 130 L320 220 Z" fill="#131C30" opacity="0.95" />

            {/* Top Flap unfolds automatically */}
            <motion.path
              d="M0 0 L160 120 L320 0 Z"
              fill="#1A243D"
              stroke="#334155"
              strokeWidth="1.5"
              animate={
                isUnlocked
                  ? {
                      d: 'M0 0 L160 -95 L320 0 Z',
                      opacity: [1, 0.4, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </svg>

          {/* Letter Card sliding upward when opened */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={
              isUnlocked
                ? { y: -70, opacity: 1, scale: 1.05 }
                : { y: 0, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-4 top-6 bottom-4 bg-[#FAF7F0] rounded-lg shadow-xl p-3 flex flex-col items-center justify-center z-10 pointer-events-none border border-gold-300"
          >
            <div className="w-10 h-1 bg-gold-400/40 rounded-full mb-2" />
            <p className="text-slate-800 font-serif italic text-xs sm:text-sm text-center px-1 font-medium">
              For {teacher?.displayName || 'our Teacher'}
            </p>
            <span className="text-[10px] text-amber-800 font-sans mt-1">✦ With deepest gratitude ✦</span>
          </motion.div>

          {/* Central Wax Seal */}
          <motion.div
            animate={
              isUnlocked
                ? { scale: 0, opacity: 0 }
                : { scale: 1 }
            }
            transition={{ duration: 0.35 }}
            className="relative z-10 flex flex-col items-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-gold-500 to-amber-400 border-2 border-gold-200/90 shadow-[0_0_16px_rgba(245,158,11,0.6)] flex items-center justify-center">
              <Mail className="w-6 h-6 text-ivory-100" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Bottom Action / Progress Pill */}
      <div className="w-full pb-3 flex justify-center z-20">
        <button
          onClick={handleManualOpen}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight-900/90 hover:bg-midnight-800 border border-gold-500/40 text-gold-300 text-xs font-sans tracking-wider uppercase shadow-lg backdrop-blur-md active:scale-95 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          <span>
            {isUnlocked ? 'Reading your letter 🤍' : 'Unsealing your letter...'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
        </button>
      </div>
    </div>
  );
};
