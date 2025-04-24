
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { useNameSelection } from './prize-wheel/use-name-selection';
import { idleParticlesConfig, spinningParticlesConfig } from './prize-wheel/particle-configs';

const PrizeWheel: React.FC = () => {
  const { displayName, isSpinning, selectName, resetSelections } = useNameSelection();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={isSpinning ? spinningParticlesConfig : idleParticlesConfig}
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
