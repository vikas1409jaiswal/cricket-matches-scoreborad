import { motion } from "framer-motion";
import { RotatingCylinder } from "../../common/RotatingCylinder";

import "./TeamRotatingCylinder.scss";

interface TeamRotatingCylinderProps {
  teamLogoUrl: string;
  popUpOffSetX?: number;
  popUpOffSetY?: number;
  scale?: number;
  className?: string;
}

export const TeamRotatingCylinder: React.FC<TeamRotatingCylinderProps> = ({
  teamLogoUrl,
  popUpOffSetX,
  popUpOffSetY,
  scale,
  className,
}) => {
  return (
    <motion.div
      initial={{ x: popUpOffSetX || 0, y: popUpOffSetY || 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 5,
      }}
      className={className || "default-team-rotating-cylinder"}
    >
      <RotatingCylinder
        images={Array.from({ length: 5 }, () =>
          teamLogoUrl?.replace("-Under-19s", "")?.replace("-Under-19", "")
        )}
        width={250 * (scale || 1)}
        height={250 * (scale || 1)}
        rotationSpeed={3}
        translateZ={175 * (scale || 1)}
      />
    </motion.div>
  );
};
