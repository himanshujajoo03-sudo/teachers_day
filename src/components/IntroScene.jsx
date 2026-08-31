import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

export const IntroScene = ({ onNext }) => {
  const handleContinue = () => {
    playSound('click');
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-120px)] text-center px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* Subtle glowing badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/25 bg-gold-500/10 text-gold-300 text-[11px] tracking-widest uppercase mb-6 font-sans"
      >
        <Sparkles className="w-3 h-3 text-gold-400" />
        <span>For someone special</span>
      </motion.div>

      {/* Opening statement - mobile friendly font size */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-ivory-50 tracking-wide leading-snug mb-6"
      >
        A little something <br className="xs:hidden" />for you...
      </motion.h1>

      {/* Playful academic relief lines */}
      <div className="space-y-2 mb-6 text-slate-400 font-sans text-sm sm:text-base font-light">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          No lectures.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          No assignments.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          No attendance.
        </motion.p>
      </div>

      {/* Reassurance */}
      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 2.6, ease: 'easeOut' }}
        className="font-serif italic text-gold-200 text-lg sm:text-xl mb-8"
      >
        Just one little surprise.
      </motion.p>

      {/* Touch-first Action button with min 48px height */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.0, ease: 'easeOut' }}
        className="w-full max-w-[260px]"
      >
        <button
          onClick={handleContinue}
          className="w-full h-12 inline-flex items-center justify-center gap-2.5 px-6 rounded-full bg-ivory-50/10 active:bg-ivory-50/20 border border-gold-500/40 text-ivory-100 font-sans text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.15)] touch-manipulation"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 text-gold-300" />
        </button>
      </motion.div>
    </div>
  );
};
