
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileInput, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CsvUploadProps {
  onNamesLoaded: (names: string[]) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onNamesLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      // Filter empty names and trim whitespace
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

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Names CSV
      </Button>
    </div>
  );
};

export default CsvUpload;
