import React, { useRef } from 'react';

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => onUpload(img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Your Photo</h2>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;