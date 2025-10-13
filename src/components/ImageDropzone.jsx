import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageDropzone = ({ oldFiles = [], setFiles, updateOldImages }) => {
  
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (acceptedFilesList) => {
      // Just set the raw file without preview
      const filesWithPreviews = acceptedFilesList.map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Create object URL for preview
      }));
      setAcceptedFiles((prev) => [...prev, ...filesWithPreviews]);
      setFiles([...acceptedFiles, ...filesWithPreviews.map((file) => file.file)]); 
    },
    multiple: true,
    accept: "image/*",
  });

  // Handle removing a file (from the preview list)
  const removeFile = (index) => {
    const updatedFiles = [...acceptedFiles];
    updatedFiles.splice(index, 1);
    setAcceptedFiles(updatedFiles);
    setFiles([...acceptedFiles, ...updatedFiles.map((file) => file.file)]); 
  };

  // Handle removing a file from the DB
  const removeDBFile =  (nameToRemove) => {
    const updatedOldImages = oldFiles.filter((image) => image !== nameToRemove);

      updateOldImages(updatedOldImages); // Emit updated old images
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}</p>
        <button type="button" className="btn btn-sm btn-base">
          Select Files
        </button>
      </div>

      <div className="previews bg-light border">
        {/* Display old images */}
        {oldFiles.length > 0 && oldFiles.map((image, index) => (
          <div key={index} className="preview-item">
            <img src={image} alt="Preview" className="preview-image" />
            <button
              type="button"
              onClick={() => removeDBFile(image)}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}

        {/* Display newly accepted files (without preview) */}
        {acceptedFiles.map((file, index) => (
          <div key={index} className="preview-item">
            <img src={file.preview} alt="Preview" className="preview-image" />
            <button type="button" onClick={() => removeFile(index)} className="remove-button">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDropzone;
