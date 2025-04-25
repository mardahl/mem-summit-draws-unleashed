
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrizeDisplayProps {
  displayName: string;
  isSpinning: boolean;
  onSelect: () => void;
  onReset: () => void;
}

const PrizeDisplay = ({ displayName, isSpinning, onSelect }: PrizeDisplayProps) => {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-3xl shadow-2xl p-12 mb-8 w-full max-w-4xl relative z-10 border border-purple-100">
      <div className="text-center mb-12">
        <Award className="w-16 h-16 mx-auto mb-6 text-purple-500" />
        <h2 
          className={cn(
            "text-5xl md:text-7xl font-bold transition-all duration-500",
            isSpinning && "animate-[winner-animation_3s_ease-in-out]"
          )}
        >
          {displayName}
        </h2>
        {isSpinning && (
          <>
            <div className="absolute inset-0 animate-[particle-explosion_3s_ease-out]">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-500"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 18}deg) translateY(-100px)`,
                    opacity: 0,
                    animation: `particle-fade 3s ease-out infinite`
                  }}
                />
              ))}
            </div>
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
