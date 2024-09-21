import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type StaggeredContainerProps = {
  children: any;
  className: string;
  staggerChildren?: number;
};

const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className,
  staggerChildren,
}) => {
  const controls = useAnimation();

  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: staggerChildren || 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={staggerItem}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredContainer;
