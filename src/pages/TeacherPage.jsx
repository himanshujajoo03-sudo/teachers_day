import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeacherBySlug } from '../data/teachers';
import { ParticleBackground } from '../components/ParticleBackground';
import { AudioController } from '../components/AudioController';
import { MysteryScene } from '../components/MysteryScene';
import { SurpriseBox } from '../components/SurpriseBox';
import { ConversationScene } from '../components/ConversationScene';
import { EnvelopeReveal } from '../components/EnvelopeReveal';
import { TeacherReveal } from '../components/TeacherReveal';
import { FinalScene } from '../components/FinalScene';
import { setMuted, getMuted } from '../utils/audio';
import { HelpCircle, ArrowLeft, Smartphone } from 'lucide-react';

export const TeacherPage = () => {
  const { slug } = useParams();
  const teacher = getTeacherBySlug(slug);

  // Streamlined flow:
  // Starts directly with the short cinematic opening ("A little surprise awaits you..." -> "Find it. 🎈")
  // -> 3 Balloons -> Celebration -> Box Game (5 pts) -> Letter (6 taps) -> Teacher Reveal -> Final Scene
  const [scene, setScene] = useState('balloons');
  const [isAudioMuted, setIsAudioMuted] = useState(getMuted());
  const [isLandscape, setIsLandscape] = useState(false);
  const [dismissLandscapeWarning, setDismissLandscapeWarning] = useState(false);

  // Detect landscape orientation on mobile
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        const isWide = window.innerWidth > window.innerHeight;
        const isMobileHeight = window.innerHeight < 550;
        setIsLandscape(isWide && isMobileHeight);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Scroll to top on scene change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scene]);

  const toggleAudioMute = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    setMuted(nextState);
  };

  // Graceful 404 handler
  if (!teacher) {
    return (
      <div className="min-h-[100dvh] bg-midnight-950 text-ivory-100 flex flex-col items-center justify-center p-4 relative overflow-hidden safe-pt safe-pb">
        <ParticleBackground />
        <div className="relative z-10 text-center max-w-sm p-6 rounded-3xl bg-midnight-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-gold-400" />
          </div>
          <h1 className="font-serif text-2xl mb-2 text-ivory-50 font-normal">Hmm...</h1>
          <p className="font-sans text-xs sm:text-sm text-slate-400 font-light mb-6 leading-relaxed">
            This surprise doesn't seem to belong to anyone or the link might be incorrect.
          </p>
          <Link
            to="/"
            className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-ivory-50/10 border border-gold-500/30 text-gold-300 text-xs tracking-widest uppercase active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Faculty List</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-midnight-950 text-ivory-100 relative overflow-x-hidden flex flex-col justify-between selection:bg-gold-500/30 safe-pt safe-pb">
      {/* Background floating stardust particles */}
      <ParticleBackground />

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grain z-0 opacity-40" />

      {/* Landscape Warning Banner */}
      {isLandscape && !dismissLandscapeWarning && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-midnight-900/95 border border-gold-500/40 text-gold-200 px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md">
          <Smartphone className="w-3.5 h-3.5 animate-bounce" />
          <span>Best experienced vertically in portrait 📱</span>
          <button
            onClick={() => setDismissLandscapeWarning(true)}
            className="ml-2 text-slate-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mobile-first Header */}
      <header className="relative z-40 w-full max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-[11px] font-sans tracking-widest uppercase text-slate-400 active:text-gold-300 transition-colors flex items-center gap-1.5 py-2 touch-manipulation"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
          <span>Teacher's Day</span>
        </Link>

        <AudioController isMuted={isAudioMuted} toggleMute={toggleAudioMute} />
      </header>

      {/* Main Dynamic Interactive Scene Container with AnimatePresence */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full px-2">
        <AnimatePresence mode="wait">
          {/* Step 1 & 2: Minimalist Cinematic Opening + 3 Floating Balloons */}
          {scene === 'balloons' && (
            <motion.div
              key="balloons"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <MysteryScene onNext={() => setScene('box')} />
            </motion.div>
          )}

          {/* Step 3: Surprise Box Mini-Game (Starts immediately, 5 Points) */}
          {scene === 'box' && (
            <motion.div
              key="box"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SurpriseBox onBoxOpened={() => setScene('conversation')} />
            </motion.div>
          )}

          {/* Step 4: Teacher & Students Conversation */}
          {scene === 'conversation' && (
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <ConversationScene
                teacher={teacher}
                onComplete={() => setScene('envelope')}
              />
            </motion.div>
          )}

          {/* Step 5: Letter automatically opens */}
          {scene === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <EnvelopeReveal teacher={teacher} onEnvelopeOpened={() => setScene('teacher')} />
            </motion.div>
          )}

          {/* Step 5: Teacher Photo & Personalized Appreciation Message */}
          {scene === 'teacher' && (
            <motion.div
              key="teacher"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <TeacherReveal
                teacher={teacher}
                onNext={() => setScene('final')}
              />
            </motion.div>
          )}

          {/* Step 6: Final Thank You & Replay */}
          {scene === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <FinalScene onReplay={() => setScene('balloons')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Mobile-Safe Footer */}
      <footer className="relative z-10 py-4 text-center font-sans">
        <p className="text-[10px] text-slate-600 tracking-wider mb-1">With reverence &amp; gratitude to all mentors ✦</p>
        <p className="text-[11px] text-slate-500 tracking-widest uppercase mb-1">Made with 🤍 by</p>
        <p
          className="text-base sm:text-lg font-serif font-normal"
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 40%, #f59e0b 65%, #fde68a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.25))',
          }}
        >
          Utkarsha Mahulkar &amp; Himanshu Jajoo
        </p>
        <p className="text-[11px] text-slate-500 tracking-wider mt-0.5">3rd Year (A)</p>
      </footer>
    </div>
  );
};
