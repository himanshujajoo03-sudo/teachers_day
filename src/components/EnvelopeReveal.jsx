import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

export const EnvelopeReveal = ({ onEnvelopeOpened }) => {
  // Tap count: 0 -> 6
  const [tapCount, setTapCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Progressive feedback for each of the 6 taps
  const tapFeedbacks = [
    { text: "Hmm... this doesn't open that easily. Tap it.", hint: "Tap the letter" },
    { text: "Nope. 😌", hint: "Tap again" },
    { text: "Still locked.", hint: "Keep tapping" },
    { text: "You're persistent.", hint: "Almost there" },
    { text: "Almost...", hint: "Just a bit more" },
    { text: "Okay... one more.", hint: "One last tap!" },
    { text: "Unlocked. 🤍", hint: "Opening..." },
  ];

  const handleLetterTap = (e) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }
    if (isUnlocked || isWiggling) return;

    const nextCount = tapCount + 1;
    setIsWiggling(true);

    if (nextCount < 6) {
      // Tap 1-5: progressive wiggle / unlock audio
      if (nextCount <= 3) {
        playSound('letter-tap');
      } else {
        playSound('letter-wiggle');
      }
      setTapCount(nextCount);

      setTimeout(() => {
        setIsWiggling(false);
      }, 350);
    } else {
      // Tap 6: FINAL UNLOCK!
      setTapCount(6);
      setIsUnlocked(true);
      playSound('unlock');
      setTimeout(() => {
        playSound('letter-open');
      }, 400);

      // Transition to Teacher Reveal
      setTimeout(() => {
        onEnvelopeOpened();
      }, 2000);
    }
  };

  const currentFeedback = tapFeedbacks[tapCount] || tapFeedbacks[0];

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100dvh-110px)] px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* 1. Header / Narrative clue */}
      <div className="w-full min-h-[70px] flex flex-col items-center justify-center text-center mt-2 z-20">
        <motion.div
          key={currentFeedback.text}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-slate-400 font-sans text-xs tracking-widest uppercase mb-1">
            One last thing...
          </p>
          <h2 className="font-serif text-lg sm:text-xl text-ivory-100 font-normal leading-snug">
            {currentFeedback.text}
          </h2>
        </motion.div>
      </div>

      {/* 2. Elegant Progress Indicator: 6 Dots */}
      <div className="flex items-center justify-center gap-2.5 my-2 z-20">
        <span className="text-[10px] font-sans tracking-widest text-slate-400 uppercase mr-1">
          Lock:
        </span>
        {[1, 2, 3, 4, 5, 6].map((step) => {
          const isFilled = tapCount >= step;
          return (
            <motion.div
              key={step}
              animate={{
                scale: isFilled ? [1, 1.35, 1] : 1,
                backgroundColor: isFilled ? '#F59E0B' : 'rgba(51, 65, 85, 0.6)',
                borderColor: isFilled ? '#FDE68A' : 'rgba(71, 85, 105, 0.4)',
              }}
              transition={{ duration: 0.3 }}
              className="w-2.5 h-2.5 rounded-full border"
            />
          );
        })}
      </div>

      {/* 3. The Locked Letter Container (Touch Target ≥ 280px) */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[260px] my-2">
        {/* Soft Golden Aura */}
        <motion.div
          animate={{
            scale: tapCount >= 4 ? [1, 1.15, 1] : 1,
            opacity: tapCount >= 4 ? 0.7 : 0.3,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gold-400/20 blur-xl rounded-2xl pointer-events-none"
        />

        {/* Envelope Touch Card */}
        <motion.div
          onClick={handleLetterTap}
          onTouchStart={handleLetterTap}
          role="button"
          tabIndex={0}
          aria-label="Locked Letter - Tap 6 times to open"
          animate={
            isUnlocked
              ? {
                  scale: [1, 1.05, 1],
                  y: -10,
                }
              : isWiggling
              ? tapCount <= 2
                ? {
                    x: [0, -6, 6, -3, 3, 0],
                    y: [0, -4, 2, 0],
                  }
                : {
                    x: [0, -12, 12, -8, 8, -4, 4, 0],
                    rotate: [0, -4, 4, -2, 2, 0],
                    y: [0, -6, 3, 0],
                    scale: [1, 1.03, 0.98, 1],
                  }
              : {
                  y: [0, -4, 0],
                }
          }
          transition={
            isWiggling
              ? { duration: 0.35, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
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

            {/* Top Flap unfolds on tap 6 */}
            <motion.path
              d="M0 0 L160 120 L320 0 Z"
              fill="#1A243D"
              stroke="#334155"
              strokeWidth="1.5"
              animate={
                isUnlocked
                  ? {
                      d: "M0 0 L160 -95 L320 0 Z",
                      opacity: [1, 0.4, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </svg>

          {/* Letter Card sliding upward when unlocked */}
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
            <p className="text-slate-800 font-serif italic text-xs">For our Teacher</p>
          </motion.div>

          {/* Central Wax Seal + Lock Icon */}
          <motion.div
            animate={
              isUnlocked
                ? { scale: 0, opacity: 0 }
                : {
                    scale: tapCount >= 4 ? [1, 1.08, 1] : 1,
                  }
            }
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-gold-500 to-amber-400 border-2 border-gold-200/90 shadow-[0_0_16px_rgba(245,158,11,0.6)] flex items-center justify-center">
              {tapCount >= 5 ? (
                <Unlock className="w-6 h-6 text-ivory-100" />
              ) : (
                <Lock className="w-6 h-6 text-ivory-100" />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Bottom Instruction / Hint Pill */}
      <div className="w-full pb-3 flex justify-center z-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-900/90 border border-gold-500/30 text-gold-300 text-xs font-sans tracking-wider uppercase shadow-md backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>
            {isUnlocked
              ? 'Opening letter 🤍'
              : `${currentFeedback.hint} (${tapCount}/6)`}
          </span>
        </div>
      </div>
    </div>
  );
};
