import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import CsvUpload from './CsvUpload';

interface PrizeDisplayProps {
  displayName: string;
  isSpinning: boolean;
  onSelect: () => void;
  onReset: () => void;
  onNamesLoaded: (names: string[]) => void;
}

const PrizeDisplay = ({ displayName, isSpinning, onSelect, onReset, onNamesLoaded }: PrizeDisplayProps) => {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-3xl shadow-2xl p-12 mb-8 w-full max-w-4xl relative z-10 border border-purple-100">
      <div className="text-center mb-12">
        <Award 
          className={cn(
            "w-16 h-16 mx-auto mb-6 text-purple-500",
            isSpinning && "animate-[pulse_1s_ease-in-out_infinite] text-purple-600"
          )} 
        />
        <div className="relative">
          <h2 
            className={cn(
              "text-5xl md:text-7xl font-bold transition-all duration-500",
              isSpinning && "animate-[winner-animation_3s_ease-in-out] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            )}
          >
            {displayName}
          </h2>
          {!isSpinning && displayName !== "Let's find a winner!" && (
            <h2 
              className="absolute left-1/2 top-1/2 text-5xl md:text-7xl font-bold pointer-events-none"
              style={{
                animation: 'ghost-clone 1s ease-out forwards',
                position: 'absolute',
                willChange: 'transform, opacity',
                transformOrigin: 'center center'
              }}
            >
              {displayName}
            </h2>
          )}
        </div>
        {isSpinning && (
          <>
            <div className="absolute inset-0 animate-[particle-explosion_3s_ease-out]">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-500"
                  style={{
                    left: `${50 + Math.cos(i / 20 * Math.PI * 2) * 30}%`,
                    top: `${50 + Math.sin(i / 20 * Math.PI * 2) * 30}%`,
                    transform: `scale(${1 + Math.random()})`,
                    opacity: 0,
                    animation: `particle-fade 3s ease-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.4)'
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-300/10 to-blue-300/10 rounded-3xl"></div>
          </>
        )}
      </div>

      <Button
        onClick={onSelect}
        disabled={isSpinning}
        className="w-full py-10 text-3xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {isSpinning ? (
          <Loader2 className="mr-3 h-8 w-8 animate-spin" />
        ) : (
          <>
            <Sparkles className="mr-3 h-8 w-8" />
            GO!
          </>
        )}
      </Button>
    </div>
  );
};

export default PrizeDisplay;
