import React, { useState, useEffect } from 'react';

interface ProjectImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  altText?: string;
}

export default function ProjectImageCarousel({
  images,
  interval = 3500,
  className = "w-full h-full object-cover",
  altText = "Project image"
}: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Clean and unique images list
  const uniqueImages = Array.from(new Set(images)).filter(Boolean);

  useEffect(() => {
    if (uniqueImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % uniqueImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [uniqueImages.length, interval]);

  if (uniqueImages.length === 0) {
    return (
      <div className="w-full h-full bg-[#0d141d] flex items-center justify-center">
        <span className="text-gray-500 text-xs">No Image Available</span>
      </div>
    );
  }

  if (uniqueImages.length === 1) {
    return (
      <img
        src={uniqueImages[0]}
        alt={altText}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      {uniqueImages.map((imgUrl, index) => {
        const isActive = index === currentIndex;
        return (
          <img
            key={index}
            src={imgUrl}
            alt={`${altText} - Slide ${index + 1}`}
            className={`${className} absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-98 pointer-events-none'
            }`}
            referrerPolicy="no-referrer"
          />
        );
      })}

      {/* Slide indicators dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full opacity-60 group-hover/carousel:opacity-100 transition-opacity">
        {uniqueImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'bg-[#00c2ff] w-3' : 'bg-white/40 hover:bg-white/70'
            }`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
