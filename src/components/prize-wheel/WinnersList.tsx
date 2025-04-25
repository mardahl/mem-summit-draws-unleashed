
import React from 'react';
import { Trophy, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface WinnersListProps {
  winners: string[];
}

const WinnersList: React.FC<WinnersListProps> = ({ winners }) => {
  if (winners.length === 0) return null;

  // For small lists (5 or fewer), show grid view
  if (winners.length <= 5) {
    return (
      <div className="mt-8 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Our Lucky Winners
            <Trophy className="h-8 w-8 text-yellow-500" />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {winners.map((winner, index) => (
            <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-purple-600">#{index + 1}</span>
                  <span className="text-lg font-medium text-gray-800 truncate">{winner}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  // For larger lists, use carousel view
  return (
    <div className="mt-8 w-full max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Our Lucky Winners
          <Trophy className="h-8 w-8 text-yellow-500" />
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
          <List className="h-4 w-4" />
          <span>Total winners: {winners.length}</span>
        </div>
      </div>
      
      <Carousel className="w-full px-4">
        <CarouselContent>
          {winners.map((winner, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-200 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-purple-600">#{index + 1}</span>
                    <span className="text-lg font-medium text-gray-800 truncate">{winner}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2" />
        <CarouselNext className="absolute -right-4 top-1/2" />
      </Carousel>
    </div>
  );
};

export default WinnersList;
