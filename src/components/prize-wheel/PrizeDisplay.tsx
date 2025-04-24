
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Award } from 'lucide-react';

interface PrizeDisplayProps {
  displayName: string;
  isSpinning: boolean;
  onSelect: () => void;
  onReset: () => void;
}

const PrizeDisplay = ({ displayName, isSpinning, onSelect, onReset }: PrizeDisplayProps) => {
  return (
    <>
      <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-3xl shadow-2xl p-12 mb-8 w-full max-w-4xl relative z-10 border border-purple-100">
        <div className="text-center mb-12">
          <Award className="w-16 h-16 mx-auto mb-6 text-purple-500" />
          <h2 className={`text-5xl md:text-7xl font-bold transition-all duration-500 ${isSpinning ? 'scale-110 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600' : ''}`}>
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

      <Button
        onClick={onReset}
        variant="outline"
        className="text-lg text-gray-500 hover:text-gray-700 relative z-10 px-8 py-6"
      >
        Reset Selections
      </Button>
    </>
  );
};

export default PrizeDisplay;
