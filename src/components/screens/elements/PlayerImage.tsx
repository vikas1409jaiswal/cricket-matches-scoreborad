import React from "react";
import { motion, useAnimation } from "framer-motion";
import teamLogos from "./../../../data/StaticData/teamLogos.json";
import { config } from "../../../configs";

interface PlayerImageProps {
  alt: string;
  href: string;
  className?: string;
  height?: number;
  width?: number;
  teamName?: string;
  backGroundColors?: (string | undefined)[];
  ignoreLocale?: boolean;
}

export const PlayerImage: React.FC<PlayerImageProps> = ({
  alt,
  href,
  className,
  width,
  height,
  teamName,
  backGroundColors,
  ignoreLocale,
}) => {
  const control = useAnimation();

  const teamNameLocal =
    config.language === "hindi"
      ? teamLogos.find((x) => x.hindiTeamName === teamName)?.teamName
      : teamName;
  const imgSrc = `http://localhost:3012/images/${teamNameLocal
    ?.toLowerCase()
    ?.replaceAll(" ", "-")
    ?.replace("-under-19s", "")
    .replace("-under-19", "")}/${href?.split("/")[2]}.png`;

  return (
    <motion.img
      animate={control}
      className={`${href} ${className || ""}`}
      alt={alt}
      src={imgSrc}
      height={height || 500}
      width={width || 400}
      style={
        backGroundColors
          ? {
              background: `radial-gradient(${backGroundColors[0]}, ${backGroundColors[1]}, ${backGroundColors[2]})`,
              //filter: `drop-shadow(20px 20px 60px ${backGroundColors[0]})`,
            }
          : {}
      }
    />
  );
};
