
import React from 'react';
import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WinnersListProps {
  winners: string[];
}

const WinnersList: React.FC<WinnersListProps> = ({ winners }) => {
  if (winners.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Our Lucky Winners
          <Trophy className="h-8 w-8 text-yellow-500" />
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {winners.map((winner, index) => (
          <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                <span className="text-xl font-medium text-gray-800">{winner}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WinnersList;
