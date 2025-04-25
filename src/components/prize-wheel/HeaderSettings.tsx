
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Settings, X } from "lucide-react";
import Cookies from 'js-cookie';

interface HeaderSettingsProps {
  onHeaderChange: (text: string) => void;
  onDialogOpenChange?: (open: boolean) => void;
}

const HeaderSettings = ({ onHeaderChange, onDialogOpenChange }: HeaderSettingsProps) => {
  const [open, setOpen] = useState(false);
  const [headerText, setHeaderText] = useState('');

  // Handle both local state and parent notification when dialog opens/closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onDialogOpenChange) {
      onDialogOpenChange(newOpen);
    }
  };

  // Load the existing header text when opening the modal
  useEffect(() => {
    if (open) {
      const savedText = Cookies.get('prizeHeaderText') || '';
      setHeaderText(savedText);
    }
  }, [open]);

  const handleSave = () => {
    if (headerText.trim()) {
      Cookies.set('prizeHeaderText', headerText);
      onHeaderChange(headerText);
      handleOpenChange(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenChange(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick}
          className="py-3 px-4 cursor-pointer rounded-md hover:bg-gray-100/80 focus:bg-gray-100/80 w-full flex items-center"
        >
          <Settings className="mr-3 h-5 w-5" />
          <span>Change Header Text</span>
        </Button>
        <DialogContent 
          className="sm:max-w-[425px]" 
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Change Header Text</DialogTitle>
            <DialogDescription>
              Enter the text you want to display in the header.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter new header text"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderSettings;
