
import React, { useCallback } from 'react';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { useNameSelection } from './prize-wheel/use-name-selection';
import { idleParticlesConfig, spinningParticlesConfig } from './prize-wheel/particle-configs';
import PrizeHeader from './prize-wheel/PrizeHeader';
import PrizeDisplay from './prize-wheel/PrizeDisplay';
import WinnersList from './prize-wheel/WinnersList';
import PrizeWheelLayout from './prize-wheel/PrizeWheelLayout';

const PrizeWheel: React.FC = () => {
  const { displayName, isSpinning, selectName, resetSelections, winners } = useNameSelection();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <PrizeWheelLayout 
      particlesInit={particlesInit}
      isSpinning={isSpinning}
      particlesConfig={isSpinning ? spinningParticlesConfig : idleParticlesConfig}
    >
      <div className="space-y-8 text-center md:text-left">
        <PrizeHeader />
        <PrizeDisplay 
          displayName={displayName}
          isSpinning={isSpinning}
          onSelect={selectName}
          onReset={resetSelections}
        />
      </div>
      {winners.length > 0 && (
        <div className="w-full">
          <WinnersList winners={winners} />
        </div>
      )}
    </PrizeWheelLayout>
  );
};

export default PrizeWheel;
