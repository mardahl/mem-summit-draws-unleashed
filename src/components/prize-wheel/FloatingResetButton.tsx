
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface FloatingResetButtonProps {
  onReset: () => void;
}

const FloatingResetButton: React.FC<FloatingResetButtonProps> = ({ onReset }) => {
  return (
    <Button
      onClick={onReset}
      variant="outline"
      size="icon"
      className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg bg-white hover:bg-gray-100 z-50"
    >
      <RotateCcw className="h-5 w-5 text-gray-600" />
    </Button>
  );
};

export default FloatingResetButton;
