import React, { useContext } from "react";
import { CricketMatchContext } from "../../CricketMatchDetails";
import { CricketMatch } from "../../../models/espn-cricinfo-models/CricketMatch";

interface PlayerReplacementIconProps {
  playerHref: string;
  size?: number;
}

export const PlayerReplacementIcon: React.FC<PlayerReplacementIconProps> = ({
  playerHref,
  size,
}) => {
  const { cricketMatch } = useContext(CricketMatchContext);
  const { playerReplacement } = cricketMatch as CricketMatch;

  return (
    <>
      {(playerReplacement[0]?.inPlayerHref.includes(playerHref) ||
        playerReplacement[1]?.inPlayerHref.includes(playerHref)) && (
        <p className="replacement-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size ? size.toString() : "36"}
            height={size ? size.toString() : "36"}
            fill="green"
            viewBox="0 0 16 16"
          >
            {/* Right-pointing arrow with a tail */}
            <path d="M2 8L14 8M8 3L14 8L8 13" />
          </svg>
        </p>
      )}
      {(playerReplacement[0]?.outPlayerHref.includes(playerHref) ||
        playerReplacement[1]?.outPlayerHref.includes(playerHref)) && (
        <p className="replacement-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size ? size.toString() : "36"}
            height={size ? size.toString() : "36"}
            fill="red"
            viewBox="0 0 16 16"
          >
            {/* Left-pointing arrow with a tail */}
            <path d="M14 8L2 8M8 3L2 8L8 13" />
          </svg>
        </p>
      )}
    </>
  );
};
