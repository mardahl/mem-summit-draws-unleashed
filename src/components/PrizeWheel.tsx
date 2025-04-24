
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import Cookies from 'js-cookie';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";

const COOKIE_NAME = 'selectedNames';
const ANIMATION_DURATION = 3000;

const PrizeWheel: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayName, setDisplayName] = useState('Click GO! to start');
  const [particleMode, setParticleMode] = useState<'idle' | 'spinning'>('idle');

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

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

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
    setParticleMode('spinning');
    let iterations = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      setDisplayName(availableNames[randomIndex]);
      iterations++;

      if (iterations > 20) {
        clearInterval(interval);
        setDisplayName(selectedName);
        setIsSpinning(false);
        
        // Set timeout to match animation completion
        setTimeout(() => {
          toast({
            title: "Selected!",
            description: `${selectedName} has been selected!`
          });
          setParticleMode('idle');
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

  const idleParticlesConfig = {
    particles: {
      number: {
        value: 15,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#8B5CF6", "#7C3AED", "#6D28D9", "#4C1D95"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  };

  const spinningParticlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#8B5CF6", "#7C3AED", "#6D28D9", "#4C1D95", "#60A5FA", "#3B82F6"]
      },
      shape: {
        type: "star",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleMode === 'idle' ? idleParticlesConfig : spinningParticlesConfig}
        className="absolute top-0 left-0 w-full h-full"
      />
      
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          MEM Summit 2025
        </h1>
        <p className="text-gray-600">Prize Draw</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-2xl relative z-10">
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
            <>
              <Sparkles className="mr-2 h-6 w-6" />
              GO!
            </>
          )}
        </Button>
      </div>

      <Button
        onClick={resetSelections}
        variant="outline"
        className="text-gray-500 hover:text-gray-700 relative z-10"
      >
        Reset Selections
      </Button>
    </div>
  );
};

export default PrizeWheel;
