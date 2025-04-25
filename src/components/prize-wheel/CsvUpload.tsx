
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CsvUploadProps {
  onNamesLoaded: (names: string[]) => void;
  triggerRef?: React.RefObject<{ click: () => void }>;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onNamesLoaded, triggerRef }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Expose a click method that the parent component can call
  React.useImperativeHandle(triggerRef, () => ({
    click: () => fileInputRef.current?.click()
  }), []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const names = text.split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      if (names.length === 0) {
        toast({
          title: "Error",
          description: "The CSV file appears to be empty",
          variant: "destructive"
        });
        return;
      }

      onNamesLoaded(names);
      toast({
        title: "Success",
        description: `Loaded ${names.length} names from CSV file`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read the CSV file",
        variant: "destructive"
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="flex items-center w-full">
        <Upload className="h-4 w-4 mr-2 shrink-0" />
        <span>Upload Names CSV</span>
      </div>
    </>
  );
};

export default CsvUpload;
