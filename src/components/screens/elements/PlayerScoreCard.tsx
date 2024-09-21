import React, { useEffect } from "react";
import { PlayerImage } from "./PlayerImage";
import { BattingShortInfo } from "./BattingShortInfo";
import { BowlingShortInfo } from "./BowlingShortInfo";
import {
  Batsman,
  Bowler,
  Player,
} from "./../../../models/espn-cricinfo-models/CricketMatchModels";
import RotatingCircle from "../../common/RotatingCircle";
import { config } from "../../../configs";
import { motion } from "framer-motion";
import { speeches } from "../../speech-management/SpeechManagement";

import "./PlayerScoreCard.scss";
import { Colors } from "../../../colors";

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
    config.language === "hindi"
      ? player.name
      : player.name.length < 19
      ? player.name.toUpperCase()
      : player.name
          .split(" ")
          .map((x, i) => (i === 0 ? `${x?.trim()[0]}.` : x?.trim()))
          .join(" ")
          .toUpperCase();

  return (
    <div
      className="player-score-card"
      style={{
        backgroundColor: cardSecondaryColor,
      }}
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
        {playerName}
      </motion.p>
      <BattingShortInfo battingScoreCard={[battingScoreCard]} scale={0.9} />
      <BowlingShortInfo bowlingScoreCard={[bowlingScoreCard]} scale={0.9} />
      <RotatingCircle number={index + 1} />
    </div>
  );
};
