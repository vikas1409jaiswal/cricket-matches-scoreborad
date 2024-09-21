import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ImageSlideShowProps {
  images: string[];
  interval?: number;
  style?: any;
}

export const ImageSlideShow: React.FC<ImageSlideShowProps> = ({
  images,
  interval = 5000,
  style,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageControl = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [images.length, interval]);

  useEffect(() => {
    imageControl.start({
      scale: [1.2, 1.2],
      maxHeight: [700, 700],
      opacity: [0, 1],
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    });
  }, [currentImage]);

  return (
    <motion.img
      animate={imageControl}
      src={images[currentImage]}
      alt={`slide-${currentImage}`}
      style={{
        ...style,
      }}
    />
  );
};
