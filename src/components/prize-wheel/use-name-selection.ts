import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
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
    const storedWinners = getSelectedNames();
    if (storedWinners && storedWinners.length > 0) {
      setWinners(storedWinners);
    }
  }, []);

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
      const customNames = Cookies.get(NAMES_COOKIE);
      if (customNames) {
        const names = JSON.parse(customNames);
        setAllNames(names);
        setIsLoaded(true);
        return;
      }

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
    setAvailableNames([...allNames]);
    setSelectedName('');
    setDisplayName('Let\'s find a winner!');
    toast({
      title: "Reset Complete",
      description: "All selections have been cleared"
    });
  };

  const animateNameSelection = (names: string[], finalWinner: string) => {
    let iterations = 0;
    const maxIterations = 30;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setDisplayName(names[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayName(finalWinner);
        setIsSpinning(false);
        
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
    
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const newWinner = availableNames[randomIndex];
    
    setSelectedName(newWinner);
    
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
