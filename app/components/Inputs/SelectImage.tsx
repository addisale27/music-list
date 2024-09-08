"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const SelectImage = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default SelectImage;
