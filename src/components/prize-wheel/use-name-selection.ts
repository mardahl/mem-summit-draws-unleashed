
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'selectedNames';
const ANIMATION_DURATION = 3000;

export const useNameSelection = () => {
  const [allNames, setAllNames] = useState<string[]>([]);
  const [availableNames, setAvailableNames] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayName, setDisplayName] = useState('Let\'s find a winner!');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchNames();
    // Start with an empty winners list
    setWinners([]);
    // Remove any existing winners cookie
    Cookies.remove(COOKIE_NAME);
  }, []);

  // Update available names whenever all names or winners change
  useEffect(() => {
    if (allNames.length > 0) {
      setAvailableNames(allNames.filter(name => !winners.includes(name)));
    }
  }, [allNames, winners]);

  const fetchNames = async () => {
    try {
      const response = await fetch('/names.csv');
      const text = await response.text();
      // Filter empty names and trim whitespace
      const rows = text.split('\n').map(name => name.trim()).filter(name => name.length > 0);
      setAllNames(rows);
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

  const saveSelectedNames = (selectedNames: string[]) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(selectedNames));
  };

  const resetSelections = () => {
    setWinners([]);
    Cookies.remove(COOKIE_NAME);
    // Reset available names to all names
    setAvailableNames([...allNames]);
    toast({
      title: "Reset Complete",
      description: "All selections have been cleared"
    });
  };

  const animateNameSelection = (names: string[]) => {
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      // Get random name from available names for animation
      const randomIndex = Math.floor(Math.random() * names.length);
      setDisplayName(names[randomIndex]);
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

  const selectName = () => {
    // Don't proceed if names haven't loaded yet
    if (!isLoaded || allNames.length === 0) {
      toast({
        title: "Loading",
        description: "Names are still loading, please try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    if (availableNames.length === 0) {
      toast({
        title: "No more names",
        description: "All names have been selected. Please reset to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSpinning(true);
    
    // Use the direct array selection method 
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const newWinner = availableNames[randomIndex];
    
    setSelectedName(newWinner);
    
    // Update winners list
    const updatedWinners = [...winners, newWinner];
    setWinners(updatedWinners);
    saveSelectedNames(updatedWinners);
    
    // Animate the selection from the available names
    animateNameSelection([...availableNames]);
  };

  return {
    displayName,
    isSpinning,
    selectName,
    resetSelections,
    winners
  };
};
