import React from "react";
import {
  Batsman,
  Bowler,
  CricketMatch,
  TeamScoreBoard,
} from "../../../models/espn-cricinfo-models/CricketMatch";
import { getTotalScoreStr } from "../match-scoreboard-info/Playing11ScoreInfo";

import "./MatchSummary.scss";

interface MatchSummaryProps {
  cricketMatch: CricketMatch;
}

export const MatchSummary: React.FC<MatchSummaryProps> = ({ cricketMatch }) => {
  const {
    series,
    matchTitle,
    team1,
    team2,
    result,
    matchDays: matchDate,
    venue,
  } = cricketMatch;
  console.log(series);
  return (
    <div className="match-summary-container">
      <div className="summary-header">
        <img
          src={`http://localhost:3012/images-team-logos/${team1.teamName?.replaceAll(
            " ",
            "-"
          )}.png`}
          alt={team1.teamName}
        />
        <p className="match-title">
          {matchTitle?.replaceAll("Women", "W")}
          <p>{`2nd T20I Match, ${matchDate}, ${venue}`}</p>
        </p>
        <img
          src={`http://localhost:3012/images-team-logos/${team2.teamName?.replaceAll(
            " ",
            "-"
          )}.png`}
          alt={team2.teamName}
        />
      </div>
      <TeamScoreSummary team={team1} />
      <TeamScoreSummary team={team2} />
      <div className="match-result">{result}</div>
    </div>
  );
};

interface TeamScoreSummaryProps {
  team: TeamScoreBoard;
}

const TeamScoreSummary: React.FC<TeamScoreSummaryProps> = ({ team }) => {
  return (
    <div className="team-summary">
      <div className="team-summary-header">
        <p>{team.teamName}</p>
        <p className="team-total-score">{getTotalScoreStr(team)}</p>
      </div>
      <div className="team-summary-body">
        <div className="team-summary-batter">
          {team.battingScorecard
            .sort((a: Batsman, b: Batsman) => b.runsScored - a.runsScored)
            .slice(0, 3)
            .map((x) => (
              <div className="batter-score">
                <p className="batter-name-block">{x.playerName.name}</p>
                <p className="score-block">{`${x.runsScored}${
                  x.outStatus?.trim() === "not out" ? "*" : ""
                } (${x.ballsFaced})`}</p>
              </div>
            ))}
        </div>
        <div className="team-summary-bowler">
          {team.bowlingScorecard
            .sort((a: Bowler, b: Bowler) => {
              if (b.wickets - a.wickets !== 0) {
                return b.wickets - a.wickets;
              } else {
                return a.runsConceded - b.runsConceded;
              }
            })
            .slice(0, 3)
            .map((x) => (
              <div className="bowler-score">
                <p className="bowler-name-block">{x.playerName.name}</p>
                <p className="score-block">{`${x.wickets}/${x.runsConceded}`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
