import React from "react";
import {
  Batsman,
  Bowler,
  Player,
} from "./../../../models/espn-cricinfo-models/CricketMatchModels";
import { PlayerScoreCard } from "./PlayerScoreCard";
import teamLogos from "./../../../data/StaticData/teamLogos.json";
import { MovingTrain } from "./../../common/MovingTrain";
import { TotalScoreCard } from "./TotalScoreCard";
import { config } from "../../../configs";

import "./../../CommonCss.scss";

interface PlayerScoreCardsProps {
  playing11Team: Player[];
  battingScoreCard: Batsman[];
  bowlingScoreCard: Bowler[];
  teamName: string;
  teamLogoUrl: string;
  totalScore: string[];
  extras: string;
  inning: string;
}

export const PlayerScoreCards: React.FC<PlayerScoreCardsProps> = ({
  playing11Team,
  battingScoreCard,
  bowlingScoreCard,
  teamName,
  teamLogoUrl,
  totalScore,
  extras,
  inning,
}) => {
  const playerScoreList = playing11Team
    .filter(
      (x) =>
        !x.name?.includes("Did not bat") &&
        !x.name?.includes("Yet to bat") &&
        !x.name?.includes("DRS")
    )
    .map((n, i) => (
      <PlayerScoreCard
        player={n}
        battingScoreCard={
          battingScoreCard.find((x) => x?.playerName.href === n.href) as Batsman
        }
        bowlingScoreCard={
          bowlingScoreCard.find((x) => x?.playerName.href === n.href) as Bowler
        }
        index={i}
        teamName={teamName}
        cardPrimaryColor={
          teamLogos?.find(
            (x) =>
              (config.language === "hindi" ? x.hindiTeamName : x.teamName) ===
              teamName?.replace(" Under-19s", "")?.replace(" Under 19", "")
          )?.primaryColor
        }
        cardSecondaryColor={
          teamLogos?.find(
            (x) =>
              (config.language === "hindi" ? x.hindiTeamName : x.teamName) ===
              teamName?.replace(" Under-19s", "")?.replace(" Under 19", "")
          )?.secondaryColor
        }
      />
    ));

  const totalScoreCard = (
    <TotalScoreCard
      totalScore={totalScore}
      extras={extras}
      teamName={teamName || ""}
      teamLogoUrl={teamLogoUrl}
      inning={inning}
    />
  );

  return (
    <div className="playing-11-list" style={{ background: "none" }}>
      {playerScoreList.length > 0 ? (
        <MovingTrain
          bogies={[...playerScoreList, totalScoreCard]}
          trackLength={teamName?.includes("xxx") ? 295 * 12 : 306 * 13}
          delay={3}
          duration={35}
        />
      ) : (
        <div>Yet To Bat</div>
      )}
    </div>
  );
};
