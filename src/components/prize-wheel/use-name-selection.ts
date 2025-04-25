import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'selectedNames';
const NAMES_COOKIE = 'availableNames';
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
    // Load winners from cookies if they exist
    const storedWinners = getSelectedNames();
    if (storedWinners && storedWinners.length > 0) {
      setWinners(storedWinners);
    }
  }, []);

  // Update available names whenever all names or winners change
  useEffect(() => {
    if (allNames.length > 0) {
      setAvailableNames(allNames.filter(name => !winners.includes(name)));
    }
  }, [allNames, winners]);

  const handleNamesLoaded = (newNames: string[]) => {
    setAllNames(newNames);
    setAvailableNames(newNames.filter(name => !winners.includes(name)));
    setDisplayName('Let\'s find a winner!');
  };

  const fetchNames = async () => {
    try {
      // Check if we have custom names stored
      const customNames = Cookies.get(NAMES_COOKIE);
      if (customNames) {
        const names = JSON.parse(customNames);
        setAllNames(names);
        setIsLoaded(true);
        return;
      }

      // Fall back to default names.csv
      const response = await fetch('/names.csv');
      const text = await response.text();
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
    // Ensure we're only saving unique names to the cookie
    const uniqueNames = [...new Set(selectedNames)];
    Cookies.set(COOKIE_NAME, JSON.stringify(uniqueNames));
  };

  const removeWinner = (winnerToRemove: string) => {
    const updatedWinners = winners.filter(name => name !== winnerToRemove);
    setWinners(updatedWinners);
    saveSelectedNames(updatedWinners);
    toast({
      title: "Winner Removed",
      description: `${winnerToRemove} has been removed from winners list`
    });
  };

  const resetSelections = () => {
    setWinners([]);
    Cookies.remove(COOKIE_NAME);
    
    // Refetch the original names from CSV after resetting
    fetchNames();
    
    setSelectedName('');
    setDisplayName('Let\'s find a winner!');
    toast({
      title: "Reset Complete",
      description: "All selections have been reset to defaults"
    });
  };

  const animateNameSelection = (names: string[], finalWinner: string) => {
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      // Get random name from available names for animation
      const randomIndex = Math.floor(Math.random() * names.length);
      setDisplayName(names[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayName(finalWinner);
        setIsSpinning(false);
        
        // ONLY add the winner to the winners list AFTER animation completes
        const updatedWinners = [...winners, finalWinner];
        setWinners(updatedWinners);
        saveSelectedNames(updatedWinners);
        
        setTimeout(() => {
          toast({
            title: "We have a winner!",
            description: `${finalWinner} has been selected!`
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
    
    // Select a winner from the available names
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const newWinner = availableNames[randomIndex];
    
    setSelectedName(newWinner);
    
    // Don't update winners here - it happens after animation completes
    // Animate the selection from the available names
    animateNameSelection([...availableNames], newWinner);
  };

  return {
    displayName,
    isSpinning,
    selectName,
    resetSelections,
    winners,
    removeWinner,
    handleNamesLoaded: (names: string[]) => {
      Cookies.set(NAMES_COOKIE, JSON.stringify(names));
      handleNamesLoaded(names);
    }
  };
};
