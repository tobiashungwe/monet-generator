import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import SocialMedia from './components/SocialMedia';
import Popup from './components/Popup';
import './styles/App.css';
import './styles/Popup.css';

const App: React.FC = () => {
  const [beforeImage, setBeforeImage] = useState<string>('https://via.placeholder.com/256');
  const [afterImage, setAfterImage] = useState<string>('https://via.placeholder.com/256');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      {showPopup && <Popup onClose={handleClose} />}
      <div className="container">
        <ImageUpload setBeforeImage={setBeforeImage} setAfterImage={setAfterImage} setLoading={setLoading} />
        <ImageDisplay beforeImage={beforeImage} afterImage={afterImage} loading={loading} />
      </div>
      <SocialMedia />
    </div>
  );
};

export default App;
