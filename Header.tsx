import React from 'react';
import { Users, History, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-10 relative overflow-hidden bg-gradient-to-b from-[#2e1065] to-[#1a0b2e] border-b-4 border-pink-500/50 shadow-2xl rounded-b-[3rem] mb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-pink-600 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        
        {/* APP ICON - Designed for Screenshot */}
        <div className="group relative cursor-default">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-[40px] blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
            
            {/* The Icon Itself - Squircle Shape (Android Icon Style) */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-[#db2777] via-[#7c3aed] to-[#4c1d95] rounded-[36px] flex items-center justify-center shadow-2xl border-[3px] border-white/20 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                
                {/* Glossy Reflection (Glassmorphism) */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                
                {/* Main Symbol */}
                <div className="relative z-10 flex items-center justify-center">
                   <Users size={80} className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
                </div>
                
                {/* Badge Symbol */}
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/40 shadow-lg">
                   <History size={24} className="text-white" strokeWidth={3} />
                </div>
            </div>
        </div>
        
        <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] tracking-tight">
            احضن نفسك
            </h1>
            <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-pink-500/30 backdrop-blur-sm">
                    <Sparkles size={14} className="text-pink-400" />
                    <p className="text-sm md:text-base text-gray-300 font-bold">
                        أجمد مقابلة في التاريخ.. انت والنسخة الميني منك
                    </p>
                    <Sparkles size={14} className="text-pink-400" />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};