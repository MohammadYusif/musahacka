"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, isAnalyzing }: FileUploadProps) {
  const t = useTranslations("triage");
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

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      <motion.div whileHover={selectedFile ? {} : { scale: 1.01 }} transition={{ duration: 0.2 }}>
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-brand-500 bg-brand-50/50 ring-4 ring-brand-400/20 animate-pulse"
              : selectedFile
                ? "border-green-400 bg-green-50/30"
                : "border-brand-300 hover:border-brand-400 hover:bg-ivory-50/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !selectedFile && document.getElementById("file-input")?.click()}
        >
          {selectedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              <CheckCircle className="h-8 w-8 text-green-500 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-bark-800 text-sm">{selectedFile.name}</p>
                <p className="text-xs text-bark-500">{formatSize(selectedFile.size)}</p>
              </div>
              {!isAnalyzing && (
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="p-1 rounded-full hover:bg-ivory-200 transition-colors"
                >
                  <X className="h-4 w-4 text-bark-400" />
                </button>
              )}
            </motion.div>
          ) : (
            <div>
              <motion.div
                animate={dragActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="mx-auto h-10 w-10 text-brand-400 mb-4" />
              </motion.div>
              <p className="text-bark-600 text-sm mb-2">{t("uploadHint")}</p>
              <label className="inline-block cursor-pointer">
                <span className="text-brand-600 text-sm font-semibold hover:underline">
                  {t("browseFiles")}
                </span>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
        </div>
      </motion.div>

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button onClick={handleSubmit} disabled={isAnalyzing} className="gap-2 bg-brand-600 hover:bg-brand-700 text-ivory-100 rounded-xl px-6 border-0">
            {t("analyze")}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
