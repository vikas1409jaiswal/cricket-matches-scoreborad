import React from "react";
import "./Playing11ScoreInfo.scss";
import { PlayerScoreCards } from "./elements/PlayerScoreCards";
import { TestTeam } from "../../models/espn-cricinfo-models/CricketMatchModels";

interface TestPlaying11ScoreInfoProps {
  team1: TestTeam;
  team2: TestTeam;
  selectedIndex: number;
}

export const TestPlaying11ScoreInfo: React.FC<TestPlaying11ScoreInfoProps> = ({
  team1,
  team2,
  selectedIndex,
}) => {
  const playing11Team1 = team1.inning1.battingScorecard
    .map((x) => x.playerName)
    .concat(team1.inning1.didNotBat);

  const playing11Team2 = team2.inning1.battingScorecard
    .map((x) => x.playerName)
    .concat(team2.inning1.didNotBat);

  return (
    <div
      style={{
        height: 880,
      }}
    >
      {selectedIndex === 4 && (
        <div className="playing-11">
          <PlayerScoreCards
            playing11Team={playing11Team1}
            battingScoreCard={team1.inning1.battingScorecard}
            bowlingScoreCard={team2.inning1.bowlingScorecard}
            teamName={team1.teamName}
            teamLogoUrl={team1.team.logoUrl}
            totalScore={getTotalScore(team1, 1)}
            extras={team1.inning1.extras}
            inning="1st Inning"
          />
        </div>
      )}
      {selectedIndex === 5 && (
        <div className="playing-11">
          <PlayerScoreCards
            playing11Team={playing11Team2}
            battingScoreCard={team2.inning1.battingScorecard}
            bowlingScoreCard={team1.inning1.bowlingScorecard}
            teamName={team2.teamName}
            teamLogoUrl={team2.team.logoUrl}
            totalScore={getTotalScore(team2, 1)}
            extras={team2.inning1.extras}
            inning="2nd Inning"
          />
        </div>
      )}
      {selectedIndex === 6 && (
        <div className="playing-11">
          <PlayerScoreCards
            playing11Team={playing11Team1}
            battingScoreCard={team1.inning2.battingScorecard}
            bowlingScoreCard={team2.inning2.bowlingScorecard}
            teamName={team1.teamName}
            teamLogoUrl={team1.team.logoUrl}
            totalScore={getTotalScore(team1, 2)}
            extras={team1.inning2.extras}
            inning="3rd Inning"
          />
        </div>
      )}
      {selectedIndex === 7 && (
        <div className="playing-11">
          <PlayerScoreCards
            playing11Team={playing11Team2}
            battingScoreCard={team2.inning2.battingScorecard}
            bowlingScoreCard={team1.inning2.bowlingScorecard}
            teamName={team2.teamName}
            teamLogoUrl={team2.team.logoUrl}
            totalScore={getTotalScore(team2, 2)}
            extras={team2.inning2.extras}
            inning="4th Inning"
          />
        </div>
      )}
    </div>
  );
};

export const getTotalScore = (team: TestTeam, inning: number) => {
  const scoreSelector = (
    inning === 1 ? team.inning1 : team.inning2
  ).totalScore?.split("::")[0];
  const totalRuns = scoreSelector?.includes("/")
    ? scoreSelector?.split("/")[0]
    : scoreSelector;
  const totalWickets = scoreSelector?.includes("/")
    ? scoreSelector?.split("/")[1]
    : "10";
  const totalOvers = (inning === 1 ? team.inning1 : team.inning2).totalScore
    ?.split("::")[1]
    ?.split("(")[0]
    ?.trim()
    ?.replace("Ov", "Overs");
  return [totalRuns, totalWickets, totalOvers];
};

export const getTotalScoreStr = (team: TestTeam, inning: number) => {
  const [totalRuns, totalWickets, totalOvers] = getTotalScore(team, inning);
  return `${totalRuns}/${totalWickets} (${totalOvers})`;
};
