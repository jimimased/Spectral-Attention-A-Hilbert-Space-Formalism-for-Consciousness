import React, { useState } from 'react';
import { SLIDES } from '../constants';
import { ChevronLeft, ChevronRight, Mic } from 'lucide-react';

export const SlidesView: React.FC = () => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const slide = SLIDES[currentSlideIdx];

  const next = () => setCurrentSlideIdx((p) => Math.min(p + 1, SLIDES.length - 1));
  const prev = () => setCurrentSlideIdx((p) => Math.max(p - 1, 0));

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-900 text-white min-h-[600px]">
      <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-12 flex flex-col relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-center mb-12">
            <span className="text-slate-400 font-mono text-sm">SLIDE {slide.id} / {SLIDES.length}</span>
            <div className="flex items-center gap-2 text-blue-400">
                <Mic size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">Speaker Mode</span>
            </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            {slide.title}
        </h2>

        <ul className="space-y-6 flex-grow">
            {slide.content.map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-xl text-slate-300">
                    <span className="mt-2 w-2 h-2 bg-blue-400 rounded-full shrink-0"></span>
                    {point}
                </li>
            ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 italic text-sm">
                <span className="font-bold text-slate-300 not-italic mr-2">Speaker Note:</span>
                "{slide.note}"
            </p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          disabled={currentSlideIdx === 0}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
            {SLIDES.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentSlideIdx(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                        i === currentSlideIdx ? 'bg-blue-500 w-8' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                />
            ))}
        </div>
        <button
          onClick={next}
          disabled={currentSlideIdx === SLIDES.length - 1}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-600"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
