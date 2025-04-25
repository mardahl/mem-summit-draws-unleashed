import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Award, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import CsvUpload from './CsvUpload';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem asChild>
              <CsvUpload onNamesLoaded={onNamesLoaded} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onReset}>
              Reset Selections
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-center mb-12 relative overflow-hidden">
        <Award className="w-16 h-16 mx-auto mb-6 text-purple-500" />
        
        <div className="relative w-[150%] left-[-25%] h-32 perspective-[1000px] transform-gpu">
          <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
          <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
          <div className="relative w-full h-full">
            <div 
              className={cn(
                "absolute w-full h-full flex items-center justify-center transform-gpu",
                "before:content-[''] before:absolute before:inset-0",
                "before:bg-gradient-to-r before:from-purple-500/20 before:via-purple-400/30 before:to-purple-500/20",
                "before:transform before:skew-y-[-4deg]",
                isSpinning && "animate-[winner-animation_3s_ease-in-out]"
              )}
            >
              <div className="flex items-center justify-center space-x-8 w-full">
                <span className="text-4xl md:text-5xl opacity-30 transform scale-75 -translate-x-12 skew-x-12">
                  {displayName}
                </span>
                <h2 className={cn(
                  "text-5xl md:text-7xl font-bold z-10",
                  isSpinning && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                )}>
                  {displayName}
                </h2>
                <span className="text-4xl md:text-5xl opacity-30 transform scale-75 translate-x-12 -skew-x-12">
                  {displayName}
                </span>
              </div>
            </div>
          </div>
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
