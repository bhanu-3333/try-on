import React, { useRef, useEffect, useState, useCallback } from 'react';

const VirtualTryOnCanvas = ({ userImage, clothing, setCanvasRef }) => {
  const canvasRef = useRef(null);
  const clothingImgRef = useRef(new Image());
  const [clothingPos, setClothingPos] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });
  const [clothingLoaded, setClothingLoaded] = useState(false);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !userImage) return;
    setCanvasRef(canvas);
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Draw user image (scaled to fit)
    const userRatio = userImage.width / userImage.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    if (userRatio > canvasRatio) {
      drawHeight = width / userRatio;
    } else {
      drawWidth = height * userRatio;
    }
    ctx.drawImage(userImage, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);

    // Draw clothing if selected and loaded
    if (clothingLoaded && clothing) {
      ctx.save();
      ctx.translate(clothingPos.x + width / 2, clothingPos.y + height / 2);
      ctx.rotate((clothingPos.rotation * Math.PI) / 180);
      ctx.scale(clothingPos.scale, clothingPos.scale);
      ctx.drawImage(clothingImgRef.current, -clothingImgRef.current.width / 2, -clothingImgRef.current.height / 2);
      ctx.restore();
    }
  }, [userImage, clothingPos, clothingLoaded, setCanvasRef, clothing]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    if (!clothing) {
      setClothingLoaded(false);
      clothingImgRef.current.src = ''; // Reset
      return;
    }

    const img = clothingImgRef.current;
    const handleLoad = () => {
      setClothingLoaded(true);
      drawCanvas();
    };

    if (img.src !== clothing) {
      img.onload = handleLoad;
      img.onerror = () => console.error('Failed to load clothing image');
      img.src = clothing;
    } else if (img.complete && img.naturalHeight !== 0) {
      handleLoad();
    }
  }, [clothing, drawCanvas]);

  return (
    <div className="canvas-section">
      <h2>Try-On Preview</h2>
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', maxWidth: '100%' }}></canvas>
      {clothing && (
        <div className="canvas-controls" style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <label key="x-control" style={{ margin: 0 }}>
            X: <input 
              type="number" 
              value={clothingPos.x} 
              onChange={(e) => setClothingPos({ ...clothingPos, x: parseFloat(e.target.value) || 0 })} 
              style={{ width: '60px' }} 
            />
          </label>
          <label key="y-control" style={{ margin: 0 }}>
            Y: <input 
              type="number" 
              value={clothingPos.y} 
              onChange={(e) => setClothingPos({ ...clothingPos, y: parseFloat(e.target.value) || 0 })} 
              style={{ width: '60px' }} 
            />
          </label>
          <label key="scale-control" style={{ margin: 0 }}>
            Scale: <input 
              type="number" 
              step="0.1" 
              value={clothingPos.scale} 
              onChange={(e) => setClothingPos({ ...clothingPos, scale: parseFloat(e.target.value) || 1 })} 
              style={{ width: '60px' }} 
            />
          </label>
          <label key="rotate-control" style={{ margin: 0 }}>
            Rotate (deg): <input 
              type="number" 
              value={clothingPos.rotation} 
              onChange={(e) => setClothingPos({ ...clothingPos, rotation: parseFloat(e.target.value) || 0 })} 
              style={{ width: '60px' }} 
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOnCanvas;