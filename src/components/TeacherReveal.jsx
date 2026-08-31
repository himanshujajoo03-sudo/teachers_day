import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, User } from 'lucide-react';
import { playSound } from '../utils/audio';

export const TeacherReveal = ({ teacher, onNext }) => {
  const [imgError, setImgError] = useState(false);

  const handleContinue = () => {
    playSound('click');
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-120px)] text-center px-4 max-w-sm sm:max-w-md mx-auto select-none py-4 safe-pb">
      {/* 1. Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] tracking-widest uppercase mb-3"
      >
        <Sparkles className="w-3 h-3 text-gold-400" />
        <span>Happy Teacher's Day</span>
      </motion.div>

      {/* 2. Teacher Name - mobile friendly scale */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-50 font-normal tracking-wide mb-1 leading-tight"
      >
        {teacher.name}
      </motion.h1>

      {teacher.department && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[11px] sm:text-xs text-gold-400/80 font-sans tracking-widest uppercase mb-5"
        >
          {teacher.department}
        </motion.p>
      )}

      {/* 3. Teacher Photo - mobile centerpiece (max 260px on phone) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-5 w-40 h-40 sm:w-48 sm:h-48"
      >
        {/* Golden rim glow */}
        <div className="absolute inset-0 bg-gold-400/20 blur-lg rounded-2xl pointer-events-none" />

        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-xl bg-midnight-900 flex items-center justify-center">
          {!imgError && teacher.photo ? (
            <img
              src={teacher.photo}
              alt={teacher.name}
              loading="eager"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-midnight-800 to-slate-800 p-3">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center mb-1.5">
                <User className="w-6 h-6 text-gold-300" />
              </div>
              <span className="font-serif text-gold-200 text-base font-bold">
                {teacher.name
                  .split(' ')
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(-2)
                  .join('')}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* 4. Flexible Message Card - Handles short or long text smoothly */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
        className="relative w-full px-5 py-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-lg mb-5 text-left"
      >
        <span className="text-3xl text-gold-500/40 font-serif leading-none select-none block -mb-2">
          “
        </span>
        <p className="font-sans text-sm sm:text-base text-ivory-100 font-light leading-relaxed italic px-1">
          {teacher.message}
        </p>
        <span className="text-3xl text-gold-500/40 font-serif leading-none select-none block text-right -mt-1">
          ”
        </span>
        <p className="text-[11px] text-gold-300/90 font-sans tracking-wider uppercase text-right mt-2">
          — From your students 🤍
        </p>
      </motion.div>

      {/* 5. Emotional takeaway */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="font-serif italic text-gold-200/80 text-xs sm:text-sm mb-6"
      >
        Some lessons stay with us forever.
      </motion.p>

      {/* 6. Touch-first Continue button (48px tall) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
        className="w-full max-w-[240px]"
      >
        <button
          onClick={handleContinue}
          className="w-full h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full bg-ivory-50/10 active:bg-ivory-50/20 border border-gold-500/35 text-ivory-100 text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-md touch-manipulation"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 text-gold-300" />
        </button>
      </motion.div>
    </div>
  );
};
