import React, { useEffect, useState } from "react";
import { MatchBasicInfo } from "./screens/MatchBasicInfo";
import { MatchFinalInfo } from "./screens/MatchFinalInfo";
import { MomentCaptures } from "./screens/elements/MomentCaptures";
import { H2HMatchRecords } from "./screens/H2HMatchRecords";
import { useFetchTestMatchByUrl } from "../hooks/espn-cricinfo-hooks/useFetchTestMatchByUrl";
import { TeamSquadInfo } from "../models/espn-cricinfo-models/CricketMatchModels";
import { TestPlaying11ScoreInfo } from "./screens/TestPlaying11ScoreInfo";
import { config } from "../configs";
import { ChannelIntroVideo } from "./screens/ChannelIntroVideo";
import { ChannelExitPage } from "./screens/ChannelExitPage";
import { Playing11Info } from "./screens/Playing11Info";
import { PointsTable } from "./screens/PointsTable";
import ReactPlayer from "react-player";
import { MatchConfigs } from "./MatchConfigurations";
import { Format } from "../models/enums/CricketFormat";

interface TestCricketMatchProps {
  selectedMatchUrl: string;
  selectedScreenIndex: number;
  matchConfigs: MatchConfigs;
}

export const TestCricketMatch: React.FC<TestCricketMatchProps> = ({
  selectedMatchUrl,
  selectedScreenIndex,
  matchConfigs,
}) => {
  const {
    matchNo,
    matchTitle,
    matchDays,
    seriesResult,
    result,
    matchSquad,
    pointsTable,
    venue,
    series,
    tossWinner,
    tossDecision,
    team1,
    team2,
    playerOfTheMatch,
  } = useFetchTestMatchByUrl(`${matchConfigs.matchUrl}/full-scorecard`);
  const [isPlayingBG, setPlayingBG] = useState(true);

  const screenIndexes = {
    channelIntro: 0,
    channelExit: 9,
    matchSummary: 12,
    matchBasicInfo: 1,
    headToHead: 2,
    playing11Info: 3,
    inning1Scores: 4,
    inning2Scores: 5,
    inning3Scores: 6,
    inning4Scores: 7,
    matchResultInfo: 8,
    top5Player: 10,
    pointsTable: 11,
    matchPhotos: 13,
    demoPage: 14,
  };

  useEffect(() => {
    setPlayingBG(true);
  }, [setPlayingBG, selectedScreenIndex, isPlayingBG]);

  return (
    <div>
      {selectedScreenIndex === screenIndexes.channelIntro && (
        <ChannelIntroVideo
          src={`http://localhost:3012/videos/intro/channelIntro.mp4`}
          height={880}
          width={1540}
        />
      )}
      {selectedScreenIndex === screenIndexes.channelExit && <ChannelExitPage />}
      {/* {selectedScreenIndex === screenIndexes.matchBasicInfo && (
        <MatchBasicInfo
          href={selectedMatchUrl}
          matchNumber={matchNo}
          matchTitle={matchTitle}
          matchDate={matchDays}
          matchVenue={venue}
          matchSeries={series}
          tossWinner={tossWinner}
          tossResult={tossDecision?.split(", ")[1]}
          matchBrief={"2nd Test Match"}
          venueCountry={"(Bangladesh)"}
          matchSpeech={"New Zealand tour of Bangladesh 2023 - 2nd Test Match"}
          team1LogoUrl={team1.team.logoUrl}
          team2LogoUrl={team2.team.logoUrl}
        />
      )} */}
      {selectedScreenIndex === screenIndexes.matchBasicInfo && (
        <MatchBasicInfo
          href={selectedMatchUrl}
          matchNumber={matchNo}
          matchTitle={matchTitle}
          matchDate={matchDays}
          matchVenue={venue}
          matchSeries={series}
          tossWinner={tossWinner}
          tossResult={tossDecision?.split(", ")[1]}
          matchBrief={"2nd Test Match"}
          venueCountry={"(England)"}
          matchSpeech={"2nd test match of 3 match series"}
          team1LogoUrl={team1.team.logoUrl}
          team2LogoUrl={team2.team.logoUrl}
        />
      )}
      {selectedScreenIndex === screenIndexes.headToHead && (
        <H2HMatchRecords
          team1SquadInfo={matchSquad?.team1SquadInfo as TeamSquadInfo}
          team2SquadInfo={matchSquad?.team2SquadInfo as TeamSquadInfo}
          format={Format.TEST_CRICKET}
        />
      )}
      {[
        screenIndexes.inning1Scores,
        screenIndexes.inning2Scores,
        screenIndexes.inning3Scores,
        screenIndexes.inning4Scores,
      ].includes(selectedScreenIndex) && (
        <TestPlaying11ScoreInfo
          team1={team1}
          team2={team2}
          selectedIndex={selectedScreenIndex}
        />
      )}
      {selectedScreenIndex === screenIndexes.playing11Info && matchSquad && (
        <Playing11Info matchSquad={matchSquad} />
      )}
      {selectedScreenIndex === screenIndexes.matchResultInfo && (
        <MatchFinalInfo
          matchResult={result}
          playerOfTheMatch={playerOfTheMatch.playerName}
          potmBattingStats={team1.inning1.battingScorecard
            .concat(team2.inning1.battingScorecard)
            .concat(team1.inning2.battingScorecard)
            .concat(team2.inning2.battingScorecard)
            .filter((x) => x.playerName.href === playerOfTheMatch.href)}
          potmBowlingStats={team1.inning1.bowlingScorecard
            .concat(team2.inning1.bowlingScorecard)
            .concat(team1.inning2.bowlingScorecard)
            .concat(team2.inning2.bowlingScorecard)
            .filter((x) => x.playerName.href === playerOfTheMatch.href)}
          potmTeamName={"england"}
          seriesResult={seriesResult}
        />
      )}
      {selectedScreenIndex === screenIndexes.pointsTable &&
        pointsTable.length > 0 && (
          <PointsTable
            pointsTableRows={pointsTable}
            fontSize={37}
            tdHeight={85}
          />
        )}
      {selectedScreenIndex === screenIndexes.matchPhotos && <MomentCaptures />}
      {config.showBGVideo && (
        <div
          style={{
            position: "relative",
            zIndex: -1,
            marginTop: -config.pageSize.height - 20,
            overflow: "hidden",
            opacity: selectedScreenIndex !== screenIndexes.channelIntro ? 1 : 0,
          }}
        >
          <ReactPlayer
            url={`http://localhost:3012/videos/fireworks/fireWorks.mp4`}
            height={config.pageSize.height + 20}
            width={config.pageSize.width}
            playing={isPlayingBG}
            volume={0}
          />
        </div>
      )}
    </div>
  );
};
