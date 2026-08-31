import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, Check, ArrowLeft } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-120px)] text-center px-4 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* Gratitude text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-3 mb-8"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-50 font-normal leading-snug">
          Thank you for teaching us.
        </h2>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif italic text-xl sm:text-2xl text-gold-300"
        >
          Happy Teacher's Day 🤍
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-[11px] text-slate-400 font-sans tracking-widest uppercase"
        >
          Made with a little gratitude.
        </motion.p>
      </motion.div>

      {/* Action buttons (min 48px height for touch) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="w-full flex flex-col gap-3 max-w-[260px]"
      >
        {/* Replay button */}
        <button
          onClick={handleReplayClick}
          className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-gold-500/15 active:bg-gold-500/25 border border-gold-400/40 text-gold-200 text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-md touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-gold-300" />
          <span>Replay ↻</span>
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
        transition={{ duration: 0.8, delay: 1.8 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors tracking-widest uppercase py-2 px-3 touch-manipulation"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Faculty Members</span>
        </Link>
      </motion.div>
    </div>
  );
};
