import React, { useState, useEffect } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMultipleImages, setHasMultipleImages] = useState(false);

  useEffect(() => {
    setHasMultipleImages(images && images.length > 1);
  }, [images]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasMultipleImages) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasMultipleImages]);

  if (!images || images.length === 0) {
    return (
      <section>
        <div className="carousel-image-wrapper no-images">
          <p className="carousel-no-images-text">No images available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-container">
      <div className={`carousel-image-wrapper ${hasMultipleImages ? 'has-multiple-images' : ''}`}>
        {hasMultipleImages && (
          <>
            <button 
              className="carousel-nav-button carousel-nav-button-left" 
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <svg className="carousel-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="carousel-nav-button carousel-nav-button-right" 
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg className="carousel-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
        
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${currentIndex === index ? "carousel-image-active" : "carousel-image-hidden"}`}
            loading={index === 0 ? "eager" : "lazy"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x400/cccccc/969696?text=Image+Not+Found";
            }}
          />
        ))}

        {hasMultipleImages && (
          <div className="carousel-image-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {hasMultipleImages && images.length > 1 && (
          <div className="carousel-dots-indicator">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel;
