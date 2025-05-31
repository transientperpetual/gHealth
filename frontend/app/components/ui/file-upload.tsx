"use client";

import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

export const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection (via input or drag-and-drop)
  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Remove a specific file
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle file upload to server
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // "files" is the key expected by the backend
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      alert("Files uploaded successfully!");
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload files.");
    }
  };

  // Handle click to open file picker
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Configure react-dropzone
  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log("Drop rejected:", error);
      alert("Some files were rejected.");
    },
  });

  return (
    <div className="w-full p-4 border rounded-lg bg-white shadow-sm font-[family-name:var(--font-geist-sans)]">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-md text-center transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-neutral-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,image/*" // Restrict to PDFs and images
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <p className="text-neutral-600 text-sm">
          {isDragActive
            ? "Drop your lab reports here"
            : "Drag and drop lab reports or click to select"}
        </p>
        <button
          onClick={handleClick}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Select Files
        </button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-neutral-800">
            Selected Files:
          </h3>
          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-neutral-50 rounded-md border text-sm"
              >
                <div>
                  <p className="text-neutral-700 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Upload Files
        </button>
      )}
    </div>
  );
};
