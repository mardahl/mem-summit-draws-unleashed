
import React from 'react';
import { cn } from '@/lib/utils';

interface NameCarouselProps {
  names: string[];
  isSpinning: boolean;
  selectedName: string;
}

const NameCarousel = ({ names, isSpinning, selectedName }: NameCarouselProps) => {
  return (
    <div className="relative h-48 overflow-hidden rounded-lg">
      <div 
        className={cn(
          "flex flex-col gap-2 transition-transform duration-300",
          isSpinning && "animate-carousel"
        )}
      >
        {names.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className={cn(
              "px-6 py-3 bg-gradient-to-r from-purple-500/80 to-blue-500/80 rounded-lg text-white text-xl font-semibold transform transition-all duration-300",
              name === selectedName && isSpinning && "animate-winner-pulse scale-110 z-10"
            )}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NameCarousel;
