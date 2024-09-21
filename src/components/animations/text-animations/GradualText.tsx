import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

interface GradualTextProps {
  id: string;
  duration: number;
  text: string;
}

export const GradualText: React.FC<GradualTextProps> = ({
  id,
  duration,
  text,
}) => {
  const [animatedText, setAnimatedText] = useState("");
  const animationControls = useAnimation();

  useEffect(() => {
    let currentChar = 0;
    const interval = setInterval(() => {
      setAnimatedText((prevText) =>
        currentChar === 0
          ? prevText + text.slice(0, 2)
          : prevText + text[currentChar]
      );
      currentChar++;

      if (currentChar === text.length - 1) {
        clearInterval(interval);
      }
    }, duration / text.length);

    return () => {
      clearInterval(interval);
      setAnimatedText("");
    };
  }, [duration, text]);

  useEffect(() => {
    animationControls.start({ opacity: 1 });
  }, [animationControls]);

  return (
    <motion.p
      id={id}
      initial={{ opacity: 0 }}
      animate={animationControls}
      exit={{ opacity: 0 }}
    >
      {animatedText}
    </motion.p>
  );
};
