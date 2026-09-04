import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teachers } from '../data/teachers';
import { ParticleBackground } from '../components/ParticleBackground';
import { AudioController } from '../components/AudioController';
import { setMuted, getMuted } from '../utils/audio';
import { Sparkles, ArrowRight, Search, Heart } from 'lucide-react';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAudioMuted, setIsAudioMuted] = useState(getMuted());

  const toggleAudioMute = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    setMuted(nextState);
  };

  const filteredTeachers = teachers.filter((t) =>
    (t.displayName && t.displayName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (t.fullName && t.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-[100dvh] w-full bg-midnight-950 text-ivory-100 relative overflow-x-hidden flex flex-col justify-between selection:bg-gold-500/30 safe-pt safe-pb">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none bg-grain z-0 opacity-40" />

      {/* Header with audio mute toggle */}
      <header className="relative z-20 w-full max-w-lg md:max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-gold-300/90 font-medium">
            Teacher's Day Tribute
          </span>
        </div>

        <AudioController isMuted={isAudioMuted} toggleMute={toggleAudioMute} />
      </header>

      {/* Main hero & selection */}
      <main className="relative z-10 max-w-lg md:max-w-4xl mx-auto px-4 py-6 flex flex-col items-center text-center w-full">
        {/* Title badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] tracking-widest uppercase mb-4"
        >
          <span>Dedicated to our faculty</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory-50 font-normal tracking-wide leading-tight mb-3"
        >
          A little surprise awaits...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-400 font-sans text-xs sm:text-sm font-light max-w-sm sm:max-w-md mx-auto mb-6 leading-relaxed"
        >
          Each faculty member has a personalized interactive surprise created by their students. Find your name below to begin.
        </motion.p>

        {/* Touch-optimized search input (min 48px height) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="w-full max-w-sm relative mb-6"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search your name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-2xl bg-midnight-900/90 border border-slate-800 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/20 text-ivory-100 placeholder-slate-500 text-sm backdrop-blur-md transition-all shadow-inner"
          />
        </motion.div>

        {/* Mobile-friendly Faculty Cards List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
            >
              <Link
                to={`/teacher/${teacher.slug}`}
                className="group block p-4 rounded-2xl bg-midnight-900/60 active:bg-midnight-800/80 border border-slate-800/90 active:border-gold-500/50 backdrop-blur-sm transition-all shadow-md touch-manipulation active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-sans tracking-widest text-gold-400/80 uppercase font-medium">
                    For
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-gold-300 transition-colors" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-ivory-100 font-normal group-hover:text-gold-200 transition-colors leading-snug mb-3">
                  {teacher.displayName}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-gold-300/90 font-sans tracking-wide pt-2 border-t border-slate-800/60">
                  <span>Open your surprise</span>
                  <span className="text-gold-400">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="py-8 text-slate-500 font-sans text-xs">
            No faculty found matching "{searchTerm}".
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[10px] text-slate-500 font-sans tracking-wider border-t border-slate-900/80 safe-pb">
        <p className="flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
          <span>by the students</span>
        </p>
      </footer>
    </div>
  );
};
