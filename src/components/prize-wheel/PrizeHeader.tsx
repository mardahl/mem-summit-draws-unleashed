
import React from 'react';
import { PartyPopper } from 'lucide-react';

const PrizeHeader = () => {
  return (
    <div className="text-center mb-8 relative z-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <PartyPopper className="w-8 h-8 text-purple-500" />
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
          MEM Summit 2025
        </h1>
        <PartyPopper className="w-8 h-8 text-purple-500" />
      </div>
      <p className="text-2xl text-gray-600 font-medium">Prize Draw</p>
    </div>
  );
};

export default PrizeHeader;
