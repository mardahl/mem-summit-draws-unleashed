
import React, { useEffect, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import Cookies from 'js-cookie';

const PrizeHeader = () => {
  const [headerText, setHeaderText] = useState('MEM Summit 2025');
  
  useEffect(() => {
    const savedText = Cookies.get('prizeHeaderText');
    if (savedText) {
      console.log("Retrieved header text from cookie:", savedText);
      setHeaderText(savedText);
    }
  }, []);

  return (
    <div className="text-center mb-8 relative z-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <PartyPopper className="w-8 h-8 text-purple-500" />
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
          {headerText}
        </h1>
        <PartyPopper className="w-8 h-8 text-purple-500" />
      </div>
      <p className="text-2xl text-gray-600 font-medium">Prize Draw</p>
    </div>
  );
};

export default PrizeHeader;
