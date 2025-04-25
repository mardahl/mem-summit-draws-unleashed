
import React from 'react';
import { Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WinnersListProps {
  winners: string[];
  onRemoveWinner?: (winner: string) => void;
}

const WinnersList: React.FC<WinnersListProps> = ({ winners, onRemoveWinner }) => {
  const hasWinners = winners && winners.length > 0;

  return (
    <div 
      className="w-full min-h-[200px] flex flex-col justify-center"
      aria-hidden={!hasWinners}
    >
      <div 
        className={`w-full bg-white bg-opacity-80 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-purple-100 
                   transition-all duration-500 ease-in-out
                   ${hasWinners ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}
      >
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-bold text-purple-800">Winners Circle</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {winners.map((winner, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg shadow-sm border border-purple-100 
                        transform transition-all duration-300 hover:scale-105 hover:shadow-md text-center relative"
            >
              {onRemoveWinner && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 hover:bg-red-200"
                  onClick={() => onRemoveWinner(winner)}
                >
                  <X className="h-3 w-3 text-red-600" />
                </Button>
              )}
              <span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-sm font-bold mb-1">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-gray-700 truncate" title={winner}>
                {winner}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersList;
