import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';
import { playSound } from '../utils/audio';

export const SurpriseBox = ({ onBoxOpened }) => {
  // Starts directly in 'playing' mode (NO "Let's go" button)
  // Score: 0/5 -> 5/5
  const [phase, setPhase] = useState('playing');
  const [score, setScore] = useState(0);
  const [isCatching, setIsCatching] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);

  // 5 Safe mobile-responsive target positions (percentages of container)
  const safePositions = [
    { x: 0, y: 0 },         // 0: Center
    { x: 34, y: -26 },      // Catch 1 -> Upper right
    { x: -32, y: 24 },      // Catch 2 -> Lower left
    { x: 28, y: 28 },       // Catch 3 -> Lower right
    { x: -28, y: -24 },     // Catch 4 -> Upper left
    { x: 0, y: 0 },         // Catch 5 -> Center (Victory / Unlock)
  ];

  // Progressive feedback messages for each catch level
  const feedbackMessages = [
    "Catch the box 5 times!",
    "Okay... you got me.",
    "Hmm. Not bad.",
    "You're getting good at this. 👀",
    "Wait... 😳",
    "Okay, okay. You win! 😭"
  ];

  const handleBoxTap = (e) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }
    if (isCatching || phase !== 'playing' || score >= 5) return;

    const nextScore = score + 1;
    setIsCatching(true);
    setShowPlusOne(true);

    // Audio progression for each catch
    playSound(`catch-${nextScore}`);

    // Update score
    setScore(nextScore);

    // Hide +1 animation after 600ms
    setTimeout(() => {
      setShowPlusOne(false);
    }, 600);

    if (nextScore === 5) {
      // 5/5 VICTORY & UNLOCK
      setTimeout(() => {
        setPhase('unlocked');
        playSound('unlock');
      }, 700);

      // Smoothly transition to Letter Reveal
      setTimeout(() => {
        onBoxOpened();
      }, 2500);
    } else {
      // Normal catch: box moves to next position
      setTimeout(() => {
        setIsCatching(false);
      }, 550);
    }
  };

  const currentPos = safePositions[score] || safePositions[0];

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100dvh-110px)] px-3 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* 1. TOP HEADER / MINIMALIST SCORE SYSTEM */}
      <div className="w-full min-h-[70px] flex flex-col items-center justify-center text-center mt-2 z-30">
        {phase === 'playing' ? (
          <div className="flex flex-col items-center">
            {/* Elegant Minimalist Score Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-midnight-900/90 border border-gold-500/30 backdrop-blur-md shadow-md">
              <Trophy className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] font-sans tracking-widest text-slate-400 uppercase">
                Score:
              </span>
              <motion.span
                key={score}
                initial={{ scale: 1.4, color: '#FCD34D' }}
                animate={{ scale: 1, color: '#FDFBF7' }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="font-serif text-sm font-bold text-ivory-50 tracking-wider"
              >
                {score} / 5
              </motion.span>
            </div>

            {/* In-game feedback message */}
            <motion.p
              key={score}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-gold-300/90 font-sans mt-2 font-light italic"
            >
              {feedbackMessages[score]}
            </motion.p>
          </div>
        ) : (
          /* Unlocked Celebration Banner */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400 text-gold-200 text-xs font-sans tracking-wider uppercase shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-spin" />
              <span className="font-semibold">Surprise Unlocked 🔓</span>
            </div>
            <p className="font-serif text-lg text-ivory-50 mt-1.5">
              Okay, okay... You win. 😭
            </p>
          </motion.div>
        )}
      </div>

      {/* 2. MAIN GAME ARENA / ESCAPING BOX */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px] overflow-visible">
        {/* Floating "+1" Animation on successful catch */}
        <AnimatePresence>
          {showPlusOne && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1.2 }}
              exit={{ opacity: 0, y: -70 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute z-40 pointer-events-none font-serif text-2xl font-bold text-gold-300 drop-shadow-[0_0_10px_#F59E0B]"
              style={{
                left: `calc(50% + ${currentPos.x * 0.9}%)`,
                top: `calc(50% + ${currentPos.y * 0.9}%)`,
              }}
            >
              +1 ✨
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Box Container with Framer Motion spring physics */}
        <motion.div
          animate={{
            x: `${currentPos.x}%`,
            y: `${currentPos.y}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 14,
            mass: 0.85,
          }}
          className="relative z-20"
        >
          {/* Ambient Glow behind box */}
          <motion.div
            animate={{
              scale: phase === 'unlocked' ? [1, 1.4, 1.25] : [1, 1.1, 1],
              opacity: phase === 'unlocked' ? 0.95 : 0.4,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-amber-500/25 via-gold-400/35 to-amber-600/15 blur-xl pointer-events-none"
          />

          {/* Box Interactive Element (Touch target ≥ 176px) */}
          <motion.button
            type="button"
            aria-label="Surprise Box - Tap to catch"
            onClick={handleBoxTap}
            onTouchStart={handleBoxTap}
            animate={
              isCatching
                ? {
                    scale: [1, 1.15, 0.92, 1.05, 1],
                    rotate: [0, -8, 8, -4, 4, 0],
                  }
                : phase === 'unlocked'
                ? {
                    y: [0, -6, -2],
                    scale: [1, 1.04, 1.02],
                  }
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={
              isCatching
                ? { duration: 0.5, ease: 'easeInOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative w-44 h-44 sm:w-52 sm:h-52 cursor-pointer touch-manipulation active:scale-90 focus:outline-none filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Detailed Vector Illustrated Surprise Box */}
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="boxFront" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <radialGradient id="boxInnerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
                  <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Inner golden celestial beam when unlocked */}
              {phase === 'unlocked' && (
                <circle cx="120" cy="110" r="75" fill="url(#boxInnerGlow)" className="animate-pulse" />
              )}

              {/* Main Box Base */}
              <rect
                x="50"
                y="95"
                width="140"
                height="105"
                rx="12"
                fill="url(#boxFront)"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Ribbons */}
              <rect x="108" y="95" width="24" height="105" fill="url(#goldRibbon)" />
              <rect x="50" y="140" width="140" height="20" fill="url(#goldRibbon)" />

              {/* Lid with transform states */}
              <g
                style={{
                  transformOrigin: '120px 95px',
                  transform:
                    phase === 'unlocked'
                      ? 'translateY(-40px) rotate(-12deg)'
                      : isCatching && score >= 3
                      ? 'translateY(-14px) rotate(-6deg)'
                      : isCatching
                      ? 'translateY(-6px)'
                      : 'none',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <rect x="42" y="74" width="156" height="28" rx="8" fill="url(#lidGrad)" stroke="#64748B" strokeWidth="2" />
                <rect x="106" y="74" width="28" height="28" fill="url(#goldRibbon)" />
                <path d="M120 74 C100 50, 65 65, 110 74 C65 78, 95 95, 120 76" fill="url(#goldRibbon)" />
                <path d="M120 74 C140 50, 175 65, 130 74 C175 78, 145 95, 120 76" fill="url(#goldRibbon)" />
                <circle cx="120" cy="74" r="7" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
              </g>
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* 3. BOTTOM HINT PILL (No buttons! Tapping the box drives the experience) */}
      <div className="w-full pb-3 flex justify-center z-30 pointer-events-none">
        {phase === 'playing' ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-midnight-900/90 border border-gold-500/30 text-gold-300 text-xs font-sans tracking-wider uppercase shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Tap the box to catch! 🏃</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 text-xs text-gold-300 font-sans tracking-widest uppercase animate-pulse">
            <span>Opening letter</span>
            <span>→</span>
          </div>
        )}
      </div>
    </div>
  );
};
