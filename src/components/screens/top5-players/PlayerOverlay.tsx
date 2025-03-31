import React from "react";

import "./PlayerOverlay.scss";

interface PlayerOverlayProps {
  selectedPlayerHref: string;
  togglePlayerOverlay: any;
}

export const PlayerOverlay: React.FC<PlayerOverlayProps> = ({
  selectedPlayerHref,
  togglePlayerOverlay,
}) => {
  return (
    <div
      className="player-overlay"
      onDoubleClick={() => togglePlayerOverlay(false)}
    >
      <h1>{selectedPlayerHref}</h1>
    </div>
  );
};
