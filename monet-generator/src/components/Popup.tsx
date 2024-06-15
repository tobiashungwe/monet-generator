import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles//Popup.css';

const Popup = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slides = [
    {
      title: "Welcome! 😊",
      description: "Our generator creates images in Monet's style using a CycleGAN model. For more details, visit our GitHub page. Click the buttons below to explore the app!",
    },
    {
      images: [
        'https://raw.githubusercontent.com/tobiashungwe/monet-generator/dev/monet-generator/src/assets/image_2024-06-15_164442913.png'
      ],
      description: "In this app, instead of cats, these were the Monet images. It's trained on nature pictures for best results, but works on any image. Try multiple times for better results.",
    },
    {
      images: ['https://raw.githubusercontent.com/tobiashungwe/monet-generator/dev/monet-generator/src/assets/image_2024-06-15_164505977.png'],
      description: "Here we explain how the discriminator and generator work. There are two options: from real to Monet image, or from Monet to real image. But the real Monet generator is not working very well. But should work.",
    }
  ];

  const nextSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentSlide === 1 && (
              <div className="slide">
                <h2>{slides[0].title}</h2>
                <p>{slides[0].description}</p>
              </div>
            )}
            {currentSlide === 2 && (
              <div className="slide">
                <img src={slides[1].images[0]} alt="Slide 2 Image 1" />
                <p>{slides[1].description}</p>
              </div>
            )}
            {currentSlide === 3 && (
              <div className="slide">
                <img src={slides[2].images[0]} alt="Slide 3 Image" />
                <p>{slides[2].description}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="radio-buttons">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`radio-button ${currentSlide === index + 1 ? 'active' : ''}`}
              onClick={() => nextSlide(index + 1)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
