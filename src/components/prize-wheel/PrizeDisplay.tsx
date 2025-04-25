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
      <div className="text-center mb-12">
        <Award className="w-16 h-16 mx-auto mb-6 text-purple-500" />
        <h2 
          className={cn(
            "text-5xl md:text-7xl font-bold transition-all duration-500",
            isSpinning && "animate-[winner-animation_3s_ease-in-out] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
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
