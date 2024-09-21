import React, { useEffect } from "react";
import { PlayerImage } from "./PlayerImage";
import { BattingShortInfo } from "./BattingShortInfo";
import { BowlingShortInfo } from "./BowlingShortInfo";
import {
  Batsman,
  Bowler,
  Player,
} from "../../../models/espn-cricinfo-models/CricketMatchModels";
import { speakText } from "../../common/SpeakText";
import RotatingCircle from "../../common/RotatingCircle";

import "./PlayerScoreCardFake.scss";
import { config } from "../../../configs";
import { PlayerImageDemo } from "./SvgDemo";

interface PlayerScoreCardProps {
  player: Player;
  battingScoreCard: Batsman[];
  bowlingScoreCard: Bowler[];
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
    const runs = battingScoreCard.find(
      (x) => x.playerName.href === player.href
    )?.runsScored;
    const wickets = bowlingScoreCard.find(
      (x) => x.playerName.href === player.href
    )?.wickets;
    const runSpeech =
      config.language === "hindi"
        ? runs
          ? `${runs} रन`
          : runs === 0
          ? 0
          : "बल्लेबाज़ी नहीं की"
        : runs
        ? `${runs} Runs`
        : runs === 0
        ? 0
        : "did not bat";
    const wickstSpeech =
      config.language === "hindi"
        ? wickets
          ? `${wickets} विकेट`
          : wickets === 0
          ? "0 विकेट"
          : ""
        : wickets
        ? `${wickets} Wickets`
        : wickets === 0
        ? "No Wicket"
        : "";
    speakText(
      `${player.name?.replace("(c)", "captain")}, ${runSpeech} ${wickstSpeech}`
    );

    return () => window.speechSynthesis.cancel();
  }, []);
  return (
    <div
      className="player-score-card"
      // style={{
      //   backgroundColor: cardSecondaryColor,
      // }}
    >
      <PlayerImageDemo playerName={player.name} playerHref={player.href} />
      {/* <PlayerImage
        alt={player.name}
        href={player.href}
        backGroundColors={[cardPrimaryColor]}
        teamName={teamName}
      />
      <p className="player-card-name">
        {config.language === "hindi"
          ? player.name
          : player.name.length < 19
          ? player.name.toUpperCase()
          : player.name
              .split(" ")
              .map((x, i) => (i === 0 ? `${x?.trim()[0]}.` : x?.trim()))
              .join(" ")
              .toUpperCase()}
      </p> */}
      <BattingShortInfo battingScoreCard={battingScoreCard} />
      <BowlingShortInfo bowlingScoreCard={bowlingScoreCard} />
      <RotatingCircle number={index + 1} />
    </div>
  );
};
