import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, Check, ArrowLeft, Sparkles, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { playSound } from '../utils/audio';

export const FinalScene = ({ onReplay }) => {
  const [copied, setCopied] = useState(false);

  const handleReplayClick = () => {
    playSound('click');
    onReplay();
  };

  const handleShare = () => {
    playSound('click');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-120px)] text-center px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb py-4">
      {/* Gratitude text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-2.5 mb-6"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-50 font-normal leading-snug">
          Thank you for teaching us.
        </h2>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-xl sm:text-2xl text-gold-300"
        >
          Happy Teacher's Day 🤍
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[11px] text-slate-400 font-sans tracking-widest uppercase"
        >
          Made with deepest reverence &amp; gratitude.
        </motion.p>
      </motion.div>

      {/* "There's more waiting for you..." Event Entry Screen / Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-b from-gold-500/15 via-midnight-900/80 to-midnight-950/90 border border-gold-500/35 backdrop-blur-xl shadow-[0_0_25px_rgba(245,158,11,0.15)] relative overflow-hidden text-center"
      >
        {/* Glow effect */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-20 bg-gold-400/20 blur-xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-200 text-[10px] tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Grand Celebration</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-ivory-50 font-normal mb-1">
            There's more waiting for you…
          </h3>

          <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-[280px] mb-3">
            Please join us for our special Teacher's Day celebratory gathering &amp; event. We would be honored by your presence!
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-midnight-950/70 border border-gold-500/30 text-gold-300 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-sans tracking-wide">Celebration Gathering ✦ Welcome!</span>
          </div>
        </div>
      </motion.div>

      {/* Action buttons (min 48px height for touch) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="w-full flex flex-col gap-3 max-w-[260px]"
      >
        {/* Replay button */}
        <button
          onClick={handleReplayClick}
          className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-gold-500/15 active:bg-gold-500/25 border border-gold-400/40 text-gold-200 text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-md touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-gold-300" />
          <span>Replay Experience ↻</span>
        </button>

        {/* Share link button */}
        <button
          onClick={handleShare}
          className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-slate-800/80 active:bg-slate-700 border border-slate-700 text-slate-200 text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-md touch-manipulation"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-300" />
              <span>Share Page</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Back to all faculty directory */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors tracking-widest uppercase py-2 px-3 touch-manipulation"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Faculty Members</span>
        </Link>
      </motion.div>

      {/* ✦ Creator Credit — Premium Card ✦ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8 }}
        className="mt-8 w-full relative"
      >
        {/* Hairline divider with centre spark */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <Sparkles className="w-3.5 h-3.5 text-gold-500/60 flex-shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Credit card */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/8 via-transparent to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-16 bg-gold-400/10 blur-2xl rounded-full pointer-events-none" />

          <div className="relative z-10 px-4 py-5 flex flex-col items-center gap-1.5">
            {/* Label */}
            <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-slate-400 flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-rose-400/80 fill-rose-400/80" />
              Made with{' '}
              <span className="text-rose-400/90">🤍</span>
              {' '}by
            </p>

            {/* Names — the main visual focus */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.02em' }}
              animate={{ opacity: 1, letterSpacing: '0.04em' }}
              transition={{ duration: 1.2, delay: 2.1 }}
              className="font-serif text-xl sm:text-2xl font-normal leading-snug"
              style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 35%, #f59e0b 60%, #fde68a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.35))',
              }}
            >
              Utkarsha Mahulkar &amp; Himanshu Jajoo
            </motion.p>

            {/* Year */}
            <p className="text-[12px] sm:text-sm font-sans text-slate-400 tracking-widest mt-0.5">
              3rd Year (A)
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
