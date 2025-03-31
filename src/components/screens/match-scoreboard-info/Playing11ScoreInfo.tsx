import React, { useContext } from "react";
import "./Playing11ScoreInfo.scss";
import {
  CricketMatch,
  TeamScoreBoard,
} from "../../../models/espn-cricinfo-models/CricketMatch";
import { PlayerScoreCards } from "./PlayerScoreCards";
import { ScreenWrapper } from "../../ScreenWrapper";
import { CricketMatchContext } from "../../CricketMatchDetails";

interface Playing11ScoreInfoProps {
  selectedIndex: number;
}

export const Playing11ScoreInfo: React.FC<Playing11ScoreInfoProps> = ({
  selectedIndex,
}) => {
  const { cricketMatch } = useContext(CricketMatchContext);
  const { team1, team2 } = cricketMatch as CricketMatch;

  const team1BowlingPlayers = team2.bowlingScorecard.map((x) => x.playerName);
  const team2BowlingPlayers = team1.bowlingScorecard.map((x) => x.playerName);
  const playing11Team1 = team1.battingScorecard
    .map((x) => x.playerName)
    .concat(team1.didNotBat)
    .concat(
      team1BowlingPlayers.filter(
        (x) =>
          !team1.battingScorecard
            .map((p) => p.playerName.href)
            .concat(team1.didNotBat.map((z) => z.href))
            .includes(x.href)
      )
    );

  const playing11Team2 = team2.battingScorecard
    .map((x) => x.playerName)
    .concat(team2.didNotBat)
    .concat(
      team2BowlingPlayers.filter(
        (x) =>
          !team2.battingScorecard
            .map((p) => p.playerName.href)
            .concat(team2.didNotBat.map((z) => z.href))
            .includes(x.href)
      )
    );

  return (
    <ScreenWrapper className="team-scores-container">
      <>
        {selectedIndex === 4 && (
          <div className="playing-11" style={{ background: "none" }}>
            <PlayerScoreCards
              playing11Team={playing11Team1}
              battingScoreCard={team1.battingScorecard}
              bowlingScoreCard={team2.bowlingScorecard}
              teamName={team1.teamName}
              teamLogoUrl={team1.team.logoUrl}
              totalScore={getTotalScore(team1)}
              extras={team1.extras}
              inning="1st Inning"
            />
          </div>
        )}
        {selectedIndex === 5 && (
          <div className="playing-11" style={{ background: "none" }}>
            <PlayerScoreCards
              playing11Team={playing11Team2}
              battingScoreCard={team2.battingScorecard}
              bowlingScoreCard={team1.bowlingScorecard}
              teamName={team2.teamName}
              teamLogoUrl={team2.team.logoUrl}
              totalScore={getTotalScore(team2)}
              extras={team2.extras}
              inning="2nd Inning"
            />
          </div>
        )}
      </>
    </ScreenWrapper>
  );
};

export const getTotalScore = (team: TeamScoreBoard) => {
  const scoreSelector = team.totalScore?.split("::")[0];
  const totalRuns = scoreSelector?.includes("/")
    ? scoreSelector?.split("/")[0]
    : scoreSelector;
  const totalWickets = scoreSelector?.includes("/")
    ? scoreSelector?.split("/")[1]
    : "10";
  const totalOvers = team.totalScore
    ?.split("::")[1]
    ?.split("(")[0]
    ?.trim()
    ?.replace("Ov", "Overs");
  return [totalRuns, totalWickets, totalOvers];
};

export const getTotalScoreStr = (team: TeamScoreBoard) => {
  const [totalRuns, totalWickets, totalOvers] = getTotalScore(team);
  return `${totalRuns}/${totalWickets} (${totalOvers})`;
};
