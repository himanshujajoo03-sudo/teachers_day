import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/audio';

export const MysteryScene = ({ onNext }) => {
  // Steps: 'intro' (short 2.5s text fade) -> 'balloons' (3 floating balloons) -> 'celebration' (sprinkles & message)
  const [step, setStep] = useState('intro');
  const [showFindIt, setShowFindIt] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState([]);

  // Sequence the minimal cinematic opening automatically:
  // 1. "A little surprise awaits you..."
  // 2. (After 1.4s) "Find it. 🎈"
  // 3. (After 1.3s) Automatically display the 3 balloons without requiring any buttons!
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFindIt(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      setStep('balloons');
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Exactly 3 balloons positioned across comfortable mobile touch zones
  const balloons = [
    {
      id: 1,
      x: 22,
      y: 28,
      scale: 1,
      color: 'from-amber-200/95 via-gold-300/90 to-amber-500/85',
      stroke: '#FEF08A',
      shadow: 'rgba(245, 158, 11, 0.35)',
      floatDuration: 3.8,
    },
    {
      id: 2,
      x: 74,
      y: 38,
      scale: 1.05,
      color: 'from-rose-200/95 via-rose-300/90 to-rose-400/85',
      stroke: '#FECDD3',
      shadow: 'rgba(244, 63, 94, 0.3)',
      floatDuration: 4.4,
    },
    {
      id: 3,
      x: 46,
      y: 65,
      scale: 0.96,
      color: 'from-sky-200/95 via-sky-300/90 to-sky-400/85',
      stroke: '#BAE6FD',
      shadow: 'rgba(56, 189, 248, 0.3)',
      floatDuration: 4.0,
    },
  ];

  // Popping mechanic: Any balloon can be popped in any order
  const handleBalloonTap = (balloonId, e) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }
    if (poppedBalloons.includes(balloonId) || step !== 'balloons') return;

    playSound('balloon-pop');
    const updatedPopped = [...poppedBalloons, balloonId];
    setPoppedBalloons(updatedPopped);

    if (updatedPopped.length === 3) {
      // Third balloon popped! Trigger celebratory sprinkles & short message
      setTimeout(() => {
        setStep('celebration');
        playSound('sparkle');
      }, 500);

      // Automatically transition directly into the Surprise Box game (NO Let's Go / Continue button)
      setTimeout(() => {
        onNext();
      }, 2400);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between w-full min-h-[calc(100dvh-110px)] px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* 1. INTRO STEP: Short, direct, cinematic text with slow fade */}
      {step === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-ivory-50 tracking-wide leading-snug mb-5"
          >
            A little surprise awaits you...
          </motion.h1>

          <AnimatePresence>
            {showFindIt && (
              <motion.p
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-serif italic text-gold-300 text-xl sm:text-2xl"
              >
                Find it. 🎈
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 2. BALLOONS STEP: 3 Floating Balloons with minimal progress dots */}
      {step === 'balloons' && (
        <>
          {/* Header & Minimal Progress Indicator (○ ○ ○) */}
          <div className="w-full min-h-[65px] flex flex-col items-center justify-center text-center mt-2 z-20 pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-slate-400 font-sans tracking-widest uppercase mb-2"
            >
              Pop the balloons
            </motion.p>

            {/* Minimal Dots Indicator */}
            <div className="flex items-center gap-2.5">
              {[1, 2, 3].map((num) => {
                const isPopped = poppedBalloons.length >= num;
                return (
                  <motion.div
                    key={num}
                    animate={{
                      scale: isPopped ? [1, 1.4, 1] : 1,
                      backgroundColor: isPopped ? '#F59E0B' : 'rgba(51, 65, 85, 0.5)',
                      borderColor: isPopped ? '#FDE68A' : 'rgba(71, 85, 105, 0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-2.5 h-2.5 rounded-full border"
                  />
                );
              })}
            </div>
          </div>

          {/* Floating Balloons Arena */}
          <div className="relative w-full flex-1 min-h-[340px] my-2 overflow-hidden">
            {balloons.map((b) => {
              const isPopped = poppedBalloons.includes(b.id);
              if (isPopped) return null;

              return (
                <motion.div
                  key={b.id}
                  style={{
                    position: 'absolute',
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                  }}
                  animate={{
                    y: [0, -16, 0],
                    x: [0, 8, 0],
                    rotate: [0, 5, -4, 0],
                  }}
                  transition={{
                    duration: b.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  exit={{
                    scale: [1, 1.3, 0],
                    opacity: 0,
                    transition: { duration: 0.25 },
                  }}
                  onClick={(e) => handleBalloonTap(b.id, e)}
                  onTouchStart={(e) => handleBalloonTap(b.id, e)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Balloon ${b.id} - Tap to pop`}
                  className="cursor-pointer touch-manipulation focus:outline-none p-4 -ml-7 -mt-9 active:scale-95 group z-20"
                >
                  {/* Balloon SVG */}
                  <div
                    className="relative w-16 h-20 sm:w-18 sm:h-22 filter drop-shadow-lg"
                    style={{ transform: `scale(${b.scale})` }}
                  >
                    <svg
                      viewBox="0 0 60 80"
                      className="w-full h-full overflow-visible pointer-events-none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient id={`glow-${b.id}`} cx="35%" cy="30%" r="65%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
                          <stop offset="60%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id={`grad-${b.id}`} x1="20%" y1="10%" x2="80%" y2="90%">
                          <stop offset="0%" stopColor="#FEF08A" />
                          <stop offset="50%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#B45309" />
                        </linearGradient>
                      </defs>

                      {/* Balloon String */}
                      <path
                        d="M30 65 Q 26 72, 32 80"
                        stroke="#94A3B8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Balloon Body */}
                      <ellipse
                        cx="30"
                        cy="34"
                        rx="22"
                        ry="28"
                        className={`bg-gradient-to-tr ${b.color}`}
                        fill={`url(#grad-${b.id})`}
                        stroke={b.stroke}
                        strokeWidth="1"
                        filter={`drop-shadow(0 4px 10px ${b.shadow})`}
                      />

                      {/* Soft Highlight reflection */}
                      <ellipse
                        cx="22"
                        cy="22"
                        rx="7"
                        ry="12"
                        fill={`url(#glow-${b.id})`}
                        transform="rotate(-25 22 22)"
                      />

                      {/* Balloon Tie Knot */}
                      <polygon points="27,62 33,62 30,66" fill="#B45309" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Hint Pill */}
          <div className="w-full pb-3 flex justify-center z-20">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-midnight-900/90 border border-gold-500/30 text-gold-300 text-xs font-sans tracking-wider uppercase shadow-md backdrop-blur-md">
              <span>{3 - poppedBalloons.length} balloon{3 - poppedBalloons.length !== 1 ? 's' : ''} left 🎈</span>
            </div>
          </div>
        </>
      )}

      {/* 3. CELEBRATION STEP: Golden sprinkles & short message -> auto transitions to box game */}
      {step === 'celebration' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative w-full">
          {/* Subtle Golden & Ivory Floating Sprinkles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(16)].map((_, idx) => {
              const angle = (idx * 360) / 16;
              const distance = 45 + (idx % 3) * 25;
              const rad = (angle * Math.PI) / 180;
              const tx = Math.cos(rad) * distance;
              const ty = Math.sin(rad) * distance;

              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: 0,
                    scale: 0.3,
                    rotate: idx * 45,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`absolute w-2 h-2 rounded-full ${
                    idx % 3 === 0
                      ? 'bg-amber-300 shadow-[0_0_8px_#FCD34D]'
                      : idx % 3 === 1
                      ? 'bg-gold-400'
                      : 'bg-ivory-100'
                  }`}
                />
              );
            })}
          </div>

          {/* Third-Balloon Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="z-20 space-y-2"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-gold-200 tracking-wide font-normal">
              Okay... you found it. 🤍
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-sans text-sm text-slate-300 font-light italic"
            >
              But there's more...
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
};
