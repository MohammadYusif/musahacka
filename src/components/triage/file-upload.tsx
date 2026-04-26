"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, isAnalyzing }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const clearFile = () => setSelectedFile(null);

  const handleSubmit = () => {
    if (selectedFile) onFileSelect(selectedFile);
  };

  return (
    <div className="space-y-4">
      <Card
        className={`relative border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          {selectedFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isAnalyzing && (
                <Button variant="ghost" size="icon" onClick={clearFile} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload PDF, images, or documents
              </p>
              <label className="mt-3 inline-block cursor-pointer">
                <span className="text-primary text-sm font-medium hover:underline">
                  Browse files
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
        </div>
      </Card>

      {selectedFile && (
        <Button onClick={handleSubmit} className="w-full" disabled={isAnalyzing} size="lg">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing your report...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Analyze Report
            </>
          )}
        </Button>
      )}
    </div>
  );
}
