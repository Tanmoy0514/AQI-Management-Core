import React from 'react';
import { GlitchTextProps } from '../types';

const GlitchText: React.FC<GlitchTextProps> = ({ text, color = 'text-white' }) => (
  <span className={`relative inline-block ${color} font-mono tracking-widest uppercase`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-70 animate-pulse z-0">{text}</span>
    <span className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-70 animate-pulse delay-75 z-0">{text}</span>
  </span>
);

export default GlitchText;