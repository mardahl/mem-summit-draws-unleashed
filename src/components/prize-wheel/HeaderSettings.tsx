
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Cookies from 'js-cookie';

interface HeaderSettingsProps {
  onHeaderChange: (text: string) => void;
}

const HeaderSettings = ({ onHeaderChange }: HeaderSettingsProps) => {
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    const savedText = Cookies.get('prizeHeaderText') || '';
    setHeaderText(savedText);
  }, []);

  const handleSave = () => {
    if (headerText.trim()) {
      Cookies.set('prizeHeaderText', headerText);
      onHeaderChange(headerText);
    }
  };

  return (
    <div className="w-full space-y-2 px-2 py-1">
      <div className="flex items-center gap-2 text-sm">
        <Settings className="h-4 w-4" />
        <span>Change Header Text</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          placeholder="Enter header text"
          className="h-8 text-sm"
        />
        <Button 
          onClick={handleSave}
          size="sm"
          className="h-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default HeaderSettings;
