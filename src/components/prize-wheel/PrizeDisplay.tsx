
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface PrizeDisplayProps {
  displayName: string;
  isSpinning: boolean;
  onSelect: () => void;
  onReset: () => void;
}

const PrizeDisplay = ({ displayName, isSpinning, onSelect, onReset }: PrizeDisplayProps) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-5xl font-bold transition-all duration-300 ${isSpinning ? 'scale-110' : ''}`}>
            {displayName}
          </h2>
        </div>

        <Button
          onClick={onSelect}
          disabled={isSpinning}
          className="w-full py-8 text-2xl bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          {isSpinning ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <>
              <Sparkles className="mr-2 h-6 w-6" />
              GO!
            </>
          )}
        </Button>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="text-gray-500 hover:text-gray-700 relative z-10"
      >
        Reset Selections
      </Button>
    </>
  );
};

export default PrizeDisplay;
