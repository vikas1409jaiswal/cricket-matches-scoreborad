import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import "./RotatingCircle.scss";

interface RotatingCircleProps {
  number: number;
}

export const RotatingCircle: React.FC<RotatingCircleProps> = ({ number }) => {
  const rotatingCircleControl = useAnimation();

  useEffect(() => {
    rotatingCircleControl.start({
      rotateY: [0, 360],
      zIndex: [1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    });

    rotatingCircleControl.start({
      scale: [5, 1],
      x: [300, 0],
      y: [-100, 0],
      transition: {
        duration: 4,
      },
    });
  }, [number]);

  return (
    <motion.div className="rotating-circle" animate={rotatingCircleControl}>
      <div className="number">{number}</div>
    </motion.div>
  );
};

export default RotatingCircle;
