
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import Cookies from 'js-cookie';

interface HeaderSettingsProps {
  onHeaderChange: (text: string) => void;
}

const HeaderSettings = ({ onHeaderChange }: HeaderSettingsProps) => {
  const [open, setOpen] = useState(false);
  const [headerText, setHeaderText] = useState('');

  const handleSave = () => {
    if (headerText.trim()) {
      Cookies.set('prizeHeaderText', headerText);
      onHeaderChange(headerText);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="py-3 px-4 cursor-pointer rounded-md hover:bg-gray-100/80 focus:bg-gray-100/80 w-full flex items-center"
        >
          <Settings className="mr-3 h-5 w-5" />
          <span>Change Header Text</span>
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Header Text</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter new header text"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
            />
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderSettings;
