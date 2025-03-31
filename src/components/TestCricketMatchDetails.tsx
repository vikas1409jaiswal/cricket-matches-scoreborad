import React, { useEffect, useState } from "react";
import { MatchBasicInfo } from "./screens/match-intro-info/MatchBasicInfo";
import { MatchFinalInfo } from "./screens/match-result-info/MatchFinalInfo";
import { MomentCaptures } from "./screens/elements/MomentCaptures";
import { H2HMatchRecords } from "./screens/h2h-records/H2HMatchRecords";
import { useFetchTestMatchByUrl } from "../hooks/espn-cricinfo-hooks/useFetchTestMatchByUrl";
import { TestPlaying11ScoreInfo } from "./screens/match-scoreboard-info/TestPlaying11ScoreInfo";
import { config } from "../configs";
import { ChannelIntroVideo } from "./screens/ChannelIntroVideo";
import { ChannelExitPage } from "./screens/ChannelExitPage";
import { Playing11Info } from "./screens/playing11-info/Playing11Info";
import { PointsTable } from "./screens/points-table/PointsTable";
import ReactPlayer from "react-player";
import { MatchConfigs } from "./MatchConfigurations";
import { Format } from "../models/enums/CricketFormat";

interface TestCricketMatchProps {
  selectedScreenIndex: number;
  matchConfigs: MatchConfigs;
}

export const TestCricketMatchDetails: React.FC<TestCricketMatchProps> = ({
  selectedScreenIndex,
  matchConfigs,
}) => {
  const { matchUrl } = matchConfigs;

  const {
    matchSquad,
    pointsTable,
    tossDecision,
    team1,
    team2,
    playerOfTheMatch,
  } = useFetchTestMatchByUrl(`${matchUrl}/full-scorecard`);

  const [isPlayingBG, setPlayingBG] = useState(true);

  const isFollowOn = false;

  const screenIndexes = {
    channelIntro: 0,
    channelExit: isFollowOn ? 8 : 9,
    matchSummary: 12,
    matchBasicInfo: 1,
    headToHead: 2,
    playing11Info: 3,
    inning1Scores: 4,
    inning2Scores: 5,
    inning3Scores: 6,
    inning4Scores: isFollowOn ? 18 : 7,
    matchResultInfo: isFollowOn ? 7 : 8,
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
          href={matchUrl}
          tossResult={tossDecision?.split(", ")[1]}
        />
      )}
      {selectedScreenIndex === screenIndexes.headToHead && (
        <H2HMatchRecords format={Format.TEST_CRICKET} />
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
        <Playing11Info />
      )}
      {selectedScreenIndex === screenIndexes.matchResultInfo && (
        <MatchFinalInfo
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
