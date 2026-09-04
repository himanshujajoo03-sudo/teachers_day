import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, User, Users } from 'lucide-react';
import { playSound } from '../utils/audio';
import { loadFacultyImageManifest, getFacultyPhoto } from '../utils/facultyImages';

export const ConversationScene = ({ teacher, onComplete }) => {
  const isFemale =
    teacher?.displayName?.includes("Ma'am") ||
    teacher?.fullName?.includes('Mrs.') ||
    teacher?.fullName?.includes('Ms.') ||
    teacher?.fullName?.includes('Prof. Juilie') ||
    teacher?.fullName?.includes('Prof. Shruti') ||
    teacher?.slug === 'faculty-21' ||
    teacher?.slug === 'faculty-22';

  const honorific = isFemale ? "Ma'am" : "Sir";
  const teacherGreetingEmoji = isFemale ? '🌸' : '🌿';

  // Determine variation:
  // Faculty 21 (J. B. Kale Ma'am) gets Variation A
  // Faculty 22 (S. A. Walde Ma'am) gets Variation B
  // Others alternate based on slug
  const isVariationA = teacher?.slug === 'faculty-21' || (parseInt(teacher?.slug?.replace('faculty-', '') || '1', 10) % 2 !== 0 && teacher?.slug !== 'faculty-22');

  const dialoguesA = [
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `Good morning, ${honorific}! ${teacherGreetingEmoji}`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `Good morning, ${honorific}! 🤍`,
      role: 'students',
    },
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `Wait, what is all this? What are you all planning today? 😄`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `Nothing at all, ${honorific}! Just a completely normal day... 😉`,
      role: 'students',
    },
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `I know that smile... you are definitely up to something! 🤔`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `Okay… we can’t keep the secret anymore. It’s time you saw what we’ve been hiding. 👀✨`,
      role: 'students',
    },
  ];

  const dialoguesB = [
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `Good morning, ${honorific}! ${teacherGreetingEmoji}`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `Good morning, ${honorific}! 🤍`,
      role: 'students',
    },
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `Why is everyone gathered here so quietly? Did I miss an announcement? 🧐`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `No announcements, ${honorific}! Just a little surprise from all of us. 🤫✨`,
      role: 'students',
    },
    {
      sender: 'teacher',
      name: teacher?.displayName || `Teacher`,
      text: `A surprise? For me? You really didn't have to do this! 🥹`,
      role: 'teacher',
    },
    {
      sender: 'students',
      name: 'Students',
      text: `Okay… we can’t keep the secret anymore. It’s time you saw what we’ve been hiding. 👀✨`,
      role: 'students',
    },
  ];

  const dialogues = isVariationA ? dialoguesA : dialoguesB;

  // Local photo resolution via manifest
  const [resolvedTeacherPhoto, setResolvedTeacherPhoto] = useState(teacher?.photo ?? null);

  useEffect(() => {
    if (!teacher?.facultyNumber) return;
    loadFacultyImageManifest().then(() => {
      const localPath = getFacultyPhoto(teacher.facultyNumber);
      if (localPath) setResolvedTeacherPhoto(localPath);
      else setResolvedTeacherPhoto(teacher?.photo ?? null);
    });
  }, [teacher]);

  // Track currently visible message index (1-based: shows dialogues up to visibleIndex)
  const [visibleIndex, setVisibleIndex] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto scroll as new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleIndex]);

  // Auto progression timer
  useEffect(() => {
    if (visibleIndex < dialogues.length) {
      const timer = setTimeout(() => {
        setVisibleIndex((prev) => prev + 1);
        playSound('click');
      }, 1800);
      return () => clearTimeout(timer);
    } else if (visibleIndex >= dialogues.length && !isCompleted) {
      setIsCompleted(true);
      playSound('sparkle');
    }
  }, [visibleIndex, dialogues.length, isCompleted]);

  const handleAdvance = () => {
    if (visibleIndex < dialogues.length) {
      setVisibleIndex((prev) => prev + 1);
      playSound('click');
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    playSound('sparkle');
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100dvh-120px)] px-3 max-w-sm sm:max-w-md mx-auto select-none safe-pb">
      {/* Header */}
      <div className="w-full text-center mt-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-[11px] uppercase tracking-wider mb-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>A Quick Moment Together</span>
        </motion.div>
        <h2 className="font-serif text-lg sm:text-xl text-ivory-100 font-normal leading-tight">
          Teacher &amp; Students
        </h2>
      </div>

      {/* Chat Messages Container */}
      <div
        onClick={handleAdvance}
        className="w-full flex-1 my-3 overflow-y-auto max-h-[52vh] sm:max-h-[58vh] flex flex-col gap-3.5 px-2 py-2 scroll-smooth cursor-pointer"
      >
        {dialogues.slice(0, visibleIndex).map((dialogue, idx) => {
          const isTeacher = dialogue.role === 'teacher';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={`flex items-end gap-2 w-full ${isTeacher ? 'justify-start' : 'justify-end'}`}
            >
              {/* Teacher Avatar (Left) */}
              {isTeacher && (
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gold-400/40 bg-midnight-900 flex-shrink-0 flex items-center justify-center shadow-md">
                  {resolvedTeacherPhoto ? (
                    <img
                      src={resolvedTeacherPhoto}
                      alt={teacher.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-gold-300" />
                  )}
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg backdrop-blur-md transition-all ${
                  isTeacher
                    ? 'bg-slate-800/90 text-ivory-100 border border-slate-700/70 rounded-bl-sm'
                    : 'bg-gradient-to-r from-gold-500/20 to-amber-500/25 text-gold-100 border border-gold-400/40 rounded-br-sm shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                }`}
              >
                <div className="text-[10px] tracking-wider uppercase font-sans mb-1 opacity-70 flex items-center gap-1 font-semibold">
                  {isTeacher ? (
                    <span className="text-gold-300">{dialogue.name}</span>
                  ) : (
                    <span className="text-gold-200">{dialogue.name}</span>
                  )}
                </div>
                <p className="font-sans font-normal">{dialogue.text}</p>
              </div>

              {/* Students Avatar (Right) */}
              {!isTeacher && (
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gold-400/50 bg-gold-500/20 flex-shrink-0 flex items-center justify-center shadow-md">
                  <Users className="w-3.5 h-3.5 text-gold-300" />
                </div>
              )}
            </motion.div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Action / Continue Bar */}
      <div className="w-full pb-3 flex flex-col items-center gap-2 z-20">
        <AnimatePresence>
          {isCompleted ? (
            <motion.button
              key="finish-btn"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleFinish}
              className="w-full max-w-[280px] h-12 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-gradient-to-r from-gold-500/25 via-amber-500/30 to-gold-500/25 hover:from-gold-500/35 hover:to-amber-500/35 border border-gold-400/60 text-gold-200 text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.25)] touch-manipulation font-medium"
            >
              <Sparkles className="w-4 h-4 text-gold-300 animate-spin-slow" />
              <span>See what we've been hiding 👀</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </motion.button>
          ) : (
            <motion.button
              key="tap-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleAdvance}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-900/80 border border-slate-700/60 text-slate-300 text-[11px] tracking-wider uppercase backdrop-blur-md active:scale-95 transition-transform"
            >
              <span>Tap to chat ({visibleIndex}/{dialogues.length})</span>
              <ArrowRight className="w-3 h-3 text-gold-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
