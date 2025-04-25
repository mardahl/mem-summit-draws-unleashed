
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await fetch('/names.csv');
      const text = await response.text();
      // Filter empty names and trim whitespace
      const rows = text.split('\n').map(name => name.trim()).filter(name => name.length > 0);
      setNames(rows);
      setIsLoaded(true);
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
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      setDisplayName(availableNames[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayName(selectedName);
        setIsSpinning(false);
        
        setTimeout(() => {
          toast({
            title: "We have a winner!",
            description: `${selectedName} has been selected!`
          });
        }, 500);
      }
    }, 100);
  };

  const findValidName = (availableNames: string[]): string => {
    if (availableNames.length === 0) {
      return '';
    }
    
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const name = availableNames[randomIndex];
    
    // Ensure we have a valid name
    if (!name || name.trim() === '') {
      // Try again if the name is empty
      return findValidName(availableNames.filter(n => n && n.trim() !== ''));
    }
    
    return name;
  };

  const selectName = () => {
    // Don't proceed if names haven't loaded yet
    if (!isLoaded || names.length === 0) {
      toast({
        title: "Loading",
        description: "Names are still loading, please try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    const selectedNames = getSelectedNames();
    const availableNames = names.filter(name => !selectedNames.includes(name) && name.trim() !== '');

    if (availableNames.length === 0) {
      toast({
        title: "No more names",
        description: "All names have been selected. Please reset to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSpinning(true);
    
    // Use our recursive function to ensure we get a valid name
    const newSelectedName = findValidName(availableNames);
    
    if (newSelectedName) {
      setSelectedName(newSelectedName);
      addSelectedName(newSelectedName);
      
      // Make sure we have a name to animate before starting
      animateNameSelection(availableNames.filter(name => name && name.trim() !== ''));
    } else {
      // This is a fallback in case findValidName fails
      toast({
        title: "Error",
        description: "Could not find a valid name. Please try again.",
        variant: "destructive"
      });
      setIsSpinning(false);
    }
  };

  return {
    displayName,
    isSpinning,
    selectName,
    resetSelections
  };
};
