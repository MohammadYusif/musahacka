"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

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
      <motion.div whileHover={selectedFile ? {} : { scale: 1.01 }} transition={{ duration: 0.2 }}>
        <Card
          className={`relative border-2 border-dashed transition-all duration-200 ${
            dragActive ? "border-primary bg-primary/5 scale-[1.02] shadow-md" : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-8 text-center">
            {selectedFile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-3"
              >
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
              </motion.div>
            ) : (
              <div>
                <motion.div
                  animate={dragActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                </motion.div>
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
      </motion.div>

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
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
        </motion.div>
      )}
    </div>
  );
}
