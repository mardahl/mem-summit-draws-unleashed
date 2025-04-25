
import React, { useCallback } from 'react';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { useNameSelection } from './prize-wheel/use-name-selection';
import { idleParticlesConfig, spinningParticlesConfig } from './prize-wheel/particle-configs';
import PrizeHeader from './prize-wheel/PrizeHeader';
import PrizeDisplay from './prize-wheel/PrizeDisplay';
import WinnersList from './prize-wheel/WinnersList';

const PrizeWheel: React.FC = () => {
  const { displayName, isSpinning, selectName, resetSelections, winners, removeWinner, handleNamesLoaded } = useNameSelection();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
      <div 
        className="fixed inset-0 w-full h-full transition-all duration-1000 ease-in-out animate-gradient bg-gradient-to-br from-purple-50 via-white to-blue-50"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={isSpinning ? spinningParticlesConfig : idleParticlesConfig}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center justify-center space-y-8">
        <PrizeHeader />
        <PrizeDisplay 
          displayName={displayName}
          isSpinning={isSpinning}
          onSelect={selectName}
          onReset={resetSelections}
          onNamesLoaded={handleNamesLoaded}
        />
        {winners.length > 0 && (
          <WinnersList winners={winners} onRemoveWinner={removeWinner} />
        )}
      </div>
    </div>
  );
};

export default PrizeWheel;
