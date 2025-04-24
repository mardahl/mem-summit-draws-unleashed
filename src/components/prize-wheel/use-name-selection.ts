
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'selectedNames';
const ANIMATION_DURATION = 3000;

export const useNameSelection = () => {
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
        
        setTimeout(() => {
          toast({
            title: "Selected!",
            description: `${selectedName} has been selected!`
          });
        }, 500);
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

  return {
    displayName,
    isSpinning,
    selectName,
    resetSelections
  };
};
