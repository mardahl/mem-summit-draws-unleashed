
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="w-16 h-16 mx-auto mb-6 relative">
          {isSpinning && (
            <div className="absolute inset-0 animate-[exploding-star_1s_ease-out_infinite]">
              <Sparkles className="w-full h-full text-yellow-400" />
            </div>
          )}
          <Sparkles className="w-full h-full text-purple-500" />
        </div>
        <h2 
          className={cn(
            "text-5xl md:text-7xl font-bold transition-all duration-500",
            isSpinning ? 
              "animate-[winner-animation_3s_ease-in-out] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-[length:200%_200%] animate-[gradient-pulse_5s_ease-in-out] bg-clip-text text-transparent" 
              : ""
          )}
        >
          {displayName}
        </h2>
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
