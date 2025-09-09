
import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ClothesCatalog from './components/ClothesCatalog';
import VirtualTryOnCanvas from './components/VirtualTryOnCanvas';
import DownloadShare from './components/DownloadShare';

function App() {
  const [userImage, setUserImage] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [canvasRef, setCanvasRef] = useState(null);

  const handleImageUpload = (image) => {
    setUserImage(image);
  };

  const handleClothingSelect = (clothingUrl) => {
    setSelectedClothing(clothingUrl);
  };

  const setCanvas = (ref) => {
    setCanvasRef(ref);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Virtual Try-On</h1>
      </header>
      <div className="main-content">
        <ImageUpload onUpload={handleImageUpload} />
        <ClothesCatalog onSelect={handleClothingSelect} />
        {userImage && (
          <VirtualTryOnCanvas
            userImage={userImage}
            clothing={selectedClothing}
            setCanvasRef={setCanvas}
          />
        )}
        {canvasRef && <DownloadShare canvas={canvasRef} />}
      </div>
    </div>
  );
}

export default App;