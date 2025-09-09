import React from 'react';

const DownloadShare = ({ canvas }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'virtual-try-on.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'virtual-try-on.png', { type: 'image/png' });

      const shareData = {
        title: 'My Virtual Try-On',
        text: 'Check out this virtual try-on outfit!',
        files: [file]
      };

      // Check if API is supported
      if (!('share' in navigator && 'canShare' in navigator)) {
        throw new Error('Web Share API not supported');
      }

      // For files, canShare only checks { files: [...] } – title/text ignored
      if (!navigator.canShare({ files: [file] })) {
        throw new TypeError('File sharing not supported or invalid file');
      }

      await navigator.share(shareData);
      console.log('Shared successfully');
    } catch (error) {
      console.error('Share error:', error);
      if (error.name === 'AbortError') {
        // User canceled – silent
        return;
      }

      // Fallback: Try clipboard (data URL)
      const dataUrl = canvas.toDataURL('image/png');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(dataUrl);
          alert('Image copied to clipboard! Paste into a browser or app to view/share.');
          return;
        } catch (clipboardErr) {
          console.error('Clipboard fallback failed:', clipboardErr);
        }
      }

      // Ultimate fallback: Alert with data URL
      alert(`Share not supported. Download the image and share manually.\n\nTo view: Copy-paste this into your browser address bar:\n${dataUrl}`);
    }
  };

  return (
    <div className="download-share">
      <button onClick={handleDownload}>Download Image</button>
      <button onClick={handleShare}>Share on Social Media</button>
    </div>
  );
};

export default DownloadShare;