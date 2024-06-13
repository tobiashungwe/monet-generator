import React from 'react';
import '../styles/ImageDisplay.css';

interface ImageDisplayProps {
  beforeImage: string;
  afterImage: string;
  loading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ beforeImage, afterImage, loading }) => {
  return (
    <div className={`images-container ${loading ? 'hidden' : ''}`}>
      <div className="image-container">
        <div className="image-label">Before</div>
        <img id="before-img" className="image" src={beforeImage} alt="Before" />
      </div>
      <div className="image-container">
        <div className="image-label">After</div>
        <img id="after-img" className="image" src={afterImage} alt="After" />
      </div>
    </div>
  );
};

export default ImageDisplay;
