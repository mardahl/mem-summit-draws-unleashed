
import React, { useCallback } from 'react';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { useNameSelection } from './prize-wheel/use-name-selection';
import { idleParticlesConfig, spinningParticlesConfig } from './prize-wheel/particle-configs';
import PrizeHeader from './prize-wheel/PrizeHeader';
import PrizeDisplay from './prize-wheel/PrizeDisplay';
import WinnersList from './prize-wheel/WinnersList';
import { MoreVertical, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CsvUpload from './prize-wheel/CsvUpload';

const PrizeWheel: React.FC = () => {
  const { displayName, isSpinning, selectName, resetSelections, winners, removeWinner, handleNamesLoaded } = useNameSelection();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #E5DEFF, #D3E4FD, #F1F0FB)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={isSpinning ? spinningParticlesConfig : idleParticlesConfig}
        className="absolute top-0 left-0 w-full h-full z-10"
      />

      <div className="absolute top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white/90">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem asChild>
              <CsvUpload onNamesLoaded={handleNamesLoaded} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={resetSelections}>
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Selections
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="w-full max-w-4xl mx-auto z-20 flex flex-col items-center justify-center space-y-8">
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
