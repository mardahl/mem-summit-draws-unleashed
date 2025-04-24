
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'selectedNames';
const ANIMATION_DURATION = 3000;

const PrizeWheel: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayName, setDisplayName] = useState('Click GO! to start');

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await fetch('/names.csv');
      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip header
      setNames(rows.filter(name => name.trim()));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load names",
        variant: "destructive"
      });
    }
  };

  const getSelectedNames = (): string[] => {
    const cookie = Cookies.get(COOKIE_NAME);
    return cookie ? JSON.parse(cookie) : [];
  };

  const addSelectedName = (name: string) => {
    const selected = getSelectedNames();
    Cookies.set(COOKIE_NAME, JSON.stringify([...selected, name]));
  };

  const resetSelections = () => {
    Cookies.remove(COOKIE_NAME);
    toast({
      title: "Reset Complete",
      description: "All selections have been cleared"
    });
  };

  const animateNameSelection = (availableNames: string[]) => {
    let iterations = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      setDisplayName(availableNames[randomIndex]);
      iterations++;

      if (iterations > 20) {
        clearInterval(interval);
        setDisplayName(selectedName);
        setIsSpinning(false);
      }
    }, 100);
  };

  const selectName = () => {
    const selectedNames = getSelectedNames();
    const availableNames = names.filter(name => !selectedNames.includes(name));

    if (availableNames.length === 0) {
      toast({
        title: "No more names",
        description: "All names have been selected. Please reset to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const newSelectedName = availableNames[randomIndex];
    setSelectedName(newSelectedName);
    addSelectedName(newSelectedName);
    animateNameSelection(availableNames);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          MEM Summit 2025
        </h1>
        <p className="text-gray-600">Prize Draw</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-5xl font-bold transition-all duration-300 ${isSpinning ? 'scale-110' : ''}`}>
            {displayName}
          </h2>
        </div>

        <Button
          onClick={selectName}
          disabled={isSpinning}
          className="w-full py-8 text-2xl bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          {isSpinning ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            'GO!'
          )}
        </Button>
      </div>

      <Button
        onClick={resetSelections}
        variant="outline"
        className="text-gray-500 hover:text-gray-700"
      >
        Reset Selections
      </Button>
    </div>
  );
};

export default PrizeWheel;
