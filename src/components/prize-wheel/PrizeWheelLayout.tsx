
import React from 'react';
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { ParticlesProps } from 'react-particles';

interface PrizeWheelLayoutProps {
  children: React.ReactNode;
  particlesInit: (engine: Engine) => Promise<void>;
  isSpinning: boolean;
  particlesConfig: any;
}

const PrizeWheelLayout: React.FC<PrizeWheelLayoutProps> = ({ 
  children, 
  particlesInit, 
  isSpinning, 
  particlesConfig 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 p-8 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="w-full max-w-4xl mx-auto z-10 grid md:grid-cols-2 gap-8 items-center">
        {children}
      </div>
    </div>
  );
};

export default PrizeWheelLayout;
