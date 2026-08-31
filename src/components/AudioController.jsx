import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playSound } from '../utils/audio';

export const AudioController = ({ isMuted, toggleMute }) => {
  const handleClick = () => {
    toggleMute();
    if (isMuted) {
      setTimeout(() => playSound('click'), 50);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
      className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-midnight-800/80 border border-slate-700/60 backdrop-blur-md text-slate-300 hover:text-gold-300 hover:border-gold-500/40 transition-all duration-200 shadow-lg group focus:outline-none focus:ring-2 focus:ring-gold-400/50"
      title={isMuted ? 'Sound is off - Click to enable' : 'Sound is on - Click to mute'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-gold-400 transition-colors" />
      ) : (
        <div className="relative">
          <Volume2 className="w-5 h-5 text-gold-400" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
          </span>
        </div>
      )}
    </button>
  );
};
