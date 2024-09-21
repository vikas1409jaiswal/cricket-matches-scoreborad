import React from "react";
import ReactPlayer from "react-player";

interface ChannelIntroVideoProps {
  src: string;
  height: number;
  width: number;
}

export const ChannelIntroVideo: React.FC<ChannelIntroVideoProps> = ({
  src,
  width,
  height,
}) => {
  return <ReactPlayer url={src} width={width} height={height} playing />;
};
