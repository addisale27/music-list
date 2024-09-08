import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
interface SelectImageProps {
  selectedImages: File[];
  onImagesSelected: (files: File[]) => void;
  onImageCancel: (name: string) => void;
}
const SelectImage: React.FC<SelectImageProps> = ({
  onImagesSelected,
  selectedImages,
  onImageCancel,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImagesSelected(acceptedFiles); // Pass the selected images to the parent
    },
    [onImagesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true, // Allow multiple images
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-md font-normal text-slate-400 flex items-center justify-center
      "
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
      {selectedImages.length > 0 && (
        <div>
          <span>selected images </span>
          <div className="grid grid-cols-3 gap-2">
            {selectedImages.map((image) => {
              return (
                <div
                  key={image.name}
                  className="flex justify-between p-2 items-center border-[1px] border-slate-400"
                >
                  <span>{image.name}</span>
                  <span
                    className="text-red-500"
                    onClick={() => onImageCancel(image.name)}
                  >
                    <FaTrash />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectImage;
