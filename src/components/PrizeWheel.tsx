import React, { useCallback, useState, useRef } from 'react';
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
import HeaderSettings from './prize-wheel/HeaderSettings';
import Cookies from 'js-cookie';

const PrizeWheel: React.FC = () => {
  const { displayName, isSpinning, selectName, resetSelections, winners, removeWinner, handleNamesLoaded } = useNameSelection();
  const [headerUpdate, setHeaderUpdate] = useState(0);
  const csvUploadRef = useRef<{ click: () => void }>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const handleResetSelections = () => {
    resetSelections();
    Cookies.remove('prizeHeaderText');
    Cookies.remove('availableNames');
    setHeaderUpdate(prev => prev + 1);
  };

  const handleHeaderChange = (text: string) => {
    console.log("Header text changed to:", text);
    setHeaderUpdate(prev => prev + 1);
  };

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

      <div className="absolute top-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 bg-white/90 backdrop-blur-sm hover:bg-white/95 rounded-full"
              aria-label="Open settings menu"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-72 bg-white/95 backdrop-blur-sm shadow-lg border-none rounded-xl p-2"
          >
            <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()}
              className="p-0 focus:bg-transparent hover:bg-transparent"
            >
              <HeaderSettings onHeaderChange={handleHeaderChange} />
            </DropdownMenuItem>
            <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()}
              className="px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors"
              onClick={() => csvUploadRef.current?.click()}
            >
              <CsvUpload onNamesLoaded={handleNamesLoaded} triggerRef={csvUploadRef} />
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors"
              onSelect={handleResetSelections}
            >
              <div className="flex items-center w-full">
                <RefreshCw className="h-4 w-4 mr-2 shrink-0" /> 
                <span>Reset to Defaults</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="w-full max-w-4xl mx-auto z-20 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center space-y-8">
          <PrizeHeader key={headerUpdate} />
          <PrizeDisplay 
            displayName={displayName}
            isSpinning={isSpinning}
            onSelect={selectName}
            onReset={resetSelections}
            onNamesLoaded={handleNamesLoaded}
          />
          <WinnersList winners={winners} onRemoveWinner={removeWinner} />
        </div>
      </div>
    </div>
  );
};

export default PrizeWheel;
