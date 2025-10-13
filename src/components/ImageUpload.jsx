import React, { useState, useEffect } from 'react';
import blank from '../assets/images/blank.png'; 

const ImageUpload = ({ name, onImageChange, defaultPreviewUrl }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      console.log(previewUrl);
      onImageChange(name, file); // Pass the selected file to the parent component
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl( null);
    onImageChange(name, null); // Remove image from parent state
  };

  useEffect(() => {
    // Clean up URL object when component unmounts
    return () => {
      if (previewUrl && previewUrl !== defaultPreviewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, defaultPreviewUrl]);

  return (
    <div className="image-upload">
      <div className="image-input image-input-outline image-input-placeholder" data-kt-image-input="true">
        <div
          className="image-input-wrapper w-100px h-100px"
          style={{
            backgroundImage: `url(${previewUrl || defaultPreviewUrl || blank})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <label
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          aria-label="Change avatar"
        >
          <i className="bi bi-pencil-fill fs-7"></i>
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
        </label>

        {(previewUrl ) && (
          <span
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="remove"
            data-bs-toggle="tooltip"
            aria-label="Remove avatar"
            onClick={handleRemoveImage}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-x-circle-fill fs-2"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
