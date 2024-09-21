import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

interface AudioPlayerProps {}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({}) => {
  const [isControls, setIsControls] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      <ReactAudioPlayer
        src={"http://localhost:3012/images/exitpage/Raga.mp3"}
        autoPlay
        controls={isControls}
        volume={0.1}
        onPlay={() => setIsControls(false)}
        loop
      />
    </div>
  );
};
