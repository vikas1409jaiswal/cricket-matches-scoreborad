import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import "./MovingTrain.scss";
import { useInView } from "react-intersection-observer";

interface MovingTrainProps {
  bogies: JSX.Element[];
  trackLength: number;
  duration?: number;
  delay?: number;
}

export const MovingTrain: React.FC<MovingTrainProps> = ({
  bogies,
  trackLength,
  duration,
  delay,
}) => {
  const control = useAnimation();

  useEffect(() => {
    control.start({
      x: [0, -trackLength],
      transition: {
        duration: duration || 30,
        repeat: 0,
        delay: delay || 0,
        ease: "linear",
      },
    });

    return () => {
      control.stop();
    };
  }, []);

  return (
    <motion.div className="moving-train-container" animate={control}>
      {bogies?.map((bogie, i) => (
        <Bogie bogie={bogie} index={i} />
      ))}
    </motion.div>
  );
};

interface BogieProps {
  bogie: JSX.Element;
  index: number;
  duration?: number;
}

const Bogie: React.FC<BogieProps> = ({ bogie, index, duration }) => {
  const { ref, inView, entry } = useInView({ threshold: 0.5 });
  const control = useAnimation();

  useEffect(() => {
    console.log(entry);
    if (inView && index > 2) {
      control.start({
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
          duration: duration || 1.5,
        },
      });
    }
  }, [inView, control, duration]);

  return (
    <motion.div
      className="bogie-container"
      initial={index > 2 ? { scale: 0 } : { scale: 1 }}
      animate={control}
      ref={ref}
    >
      {bogie}
    </motion.div>
  );
};
