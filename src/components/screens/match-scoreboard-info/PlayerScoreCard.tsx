import React, { useEffect, useRef } from "react";
import { PlayerImage } from "../elements/PlayerImage";
import { BattingShortInfo } from "../elements/BattingShortInfo";
import { BowlingShortInfo } from "../elements/BowlingShortInfo";
import {
  Batsman,
  Bowler,
  Player,
} from "../../../models/espn-cricinfo-models/CricketMatch";
import RotatingCircle from "../../common/RotatingCircle";
import { config, Language } from "../../../configs";
import { motion } from "framer-motion";
import { speeches } from "../../speech-management/SpeechManagement";
import * as htmlToImage from "html-to-image";
import { Colors } from "../../../colors";
import { PlayerReplacementIcon } from "../elements/PlayerReplacementIcon";

import "./PlayerScoreCard.scss";

interface PlayerScoreCardProps {
  player: Player;
  battingScoreCard: Batsman;
  bowlingScoreCard: Bowler;
  index: number;
  teamName?: string;
  cardPrimaryColor?: string;
  cardSecondaryColor?: string;
}

export const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({
  player,
  battingScoreCard,
  bowlingScoreCard,
  index,
  teamName,
  cardPrimaryColor,
  cardSecondaryColor,
}) => {
  useEffect(() => {
    const runs = battingScoreCard?.runsScored;
    const wickets = bowlingScoreCard?.wickets;
    speeches["player-score-info"](player.name, runs, wickets);

    return () => window.speechSynthesis.cancel();
  }, []);

  const playerName =
    config.language === Language.Hindi
      ? player.name
      : player.name.length < 24
      ? player.name.toUpperCase()
      : player.name
          .split(" ")
          .map((x, i) => (i === 0 ? `${x?.trim()[0]}.` : x?.trim()))
          .join(" ")
          .toUpperCase();

  const cardRef = useRef<HTMLDivElement>(null);

  const saveAsImage = (format: "png" | "jpeg") => {
    if (cardRef.current) {
      const options = {
        quality: 1, // Quality of the output image
      };

      if (format === "png") {
        htmlToImage
          .toPng(cardRef.current, options)
          .then((dataUrl) => {
            downloadImage(dataUrl, `${player.href}.png`);
          })
          .catch((error) => {
            console.error("Failed to capture the image:", error);
          });
      } else if (format === "jpeg") {
        htmlToImage
          .toJpeg(cardRef.current, { quality: 0.95 })
          .then((dataUrl) => {
            downloadImage(dataUrl, `${player.href.split("/")[2]}.jpg`);
          })
          .catch((error) => {
            console.error("Failed to capture the image:", error);
          });
      }
    }
  };

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="player-score-card"
      style={{
        backgroundColor: cardSecondaryColor,
      }}
      ref={cardRef}
      onDoubleClick={() => saveAsImage("jpeg")}
    >
      <PlayerImage
        alt={player.name}
        href={player.href}
        backGroundColors={[
          Colors.Black,
          cardPrimaryColor,
          Colors.White,
        ].reverse()}
        teamName={teamName}
      />
      <motion.p className={`player-card-name player-${index}`}>
        {player.name}
      </motion.p>
      <BattingShortInfo battingScoreCard={[battingScoreCard]} scale={0.9} />
      <BowlingShortInfo bowlingScoreCard={[bowlingScoreCard]} scale={0.9} />
      <RotatingCircle number={index + 1} />
      <PlayerReplacementIcon playerHref={player.href} size={56} />
    </div>
  );
};
