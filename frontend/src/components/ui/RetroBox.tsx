import React from 'react';
import { cn } from '@/lib/utils';

interface RetroBoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'glass' | 'window';
  onClick?: () => void;
}

export const RetroBox: React.FC<RetroBoxProps> = ({ 
  children, 
  className, 
  title,
  variant = 'default',
  onClick
}) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300";
  
  const variants = {
    default: "bg-card border backdrop-blur-md shadow-lg rounded-lg",
    glass: "bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-xl rounded-xl shadow-2xl",
    window: "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
  };

  return (
    <div 
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
    >
      {variant === 'window' && title && (
        <div className="bg-[#000080] text-white px-2 py-0.5 flex justify-between items-center text-xs font-bold mb-1">
          <span>{title}</span>
          <div className="flex gap-0.5">
            <button className="bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black w-3 h-3 flex items-center justify-center text-black">_</button>
            <button className="bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black w-3 h-3 flex items-center justify-center text-black">□</button>
            <button className="bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black w-3 h-3 flex items-center justify-center text-black">x</button>
          </div>
        </div>
      )}
      <div className={cn(variant === 'window' ? "bg-white border-2 border-b-white border-r-white border-t-[#808080] border-l-[#808080] p-4 text-black font-sans" : "p-4")}>
        {children}
      </div>
    </div>
  );
};
