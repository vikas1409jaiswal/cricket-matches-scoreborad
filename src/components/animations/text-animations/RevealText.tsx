import React, { useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  containerFadeInDuration?: number;
  containerFadeOutDuration?: number;
  textFadeInDuration?: number;
  textFadeOutDuration?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className,
  containerFadeInDuration,
  containerFadeOutDuration,
  textFadeInDuration,
  textFadeOutDuration,
}) => {
  const containerAnimation = useAnimation();
  const textAnimation = useAnimation();

  useEffect(() => {
    containerAnimation.start("visible");
    textAnimation.start("visible");
  }, [text, containerAnimation, textAnimation]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: containerFadeInDuration || 1, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: containerFadeOutDuration || 1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 1, x: "-100%", y: 50 },
    visible: {
      opacity: 1,
      x: "0%",
      y: 0,
      transition: { duration: textFadeInDuration || 3, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      x: "100%",
      y: 50,
      transition: { duration: textFadeOutDuration || 3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={containerAnimation}
      exit="exit"
      className={className || ""}
    >
      <AnimatePresence mode="wait">
        <motion.div key={text} variants={textVariants} animate={textAnimation}>
          {text}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
