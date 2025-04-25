import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Award, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import CsvUpload from './CsvUpload';
import NameCarousel from './NameCarousel';
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
  availableNames?: string[];
}

const PrizeDisplay = ({ 
  displayName, 
  isSpinning, 
  onSelect, 
  onReset, 
  onNamesLoaded,
  availableNames = [] 
}: PrizeDisplayProps) => {
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
        <NameCarousel 
          names={availableNames} 
          isSpinning={isSpinning} 
          selectedName={displayName}
        />
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
