import React, { createContext, useEffect, useState } from "react";
import { MatchBasicInfo } from "./screens/match-intro-info/MatchBasicInfo";
import { Playing11ScoreInfo } from "./screens/match-scoreboard-info/Playing11ScoreInfo";
import { MatchFinalInfo } from "./screens/match-result-info/MatchFinalInfo";
import {
  Batsman,
  Bowler,
  CricketMatch,
  TeamSquadInfo,
} from "../models/espn-cricinfo-models/CricketMatch";
import { useFetchMatchByUrl } from "../hooks/espn-cricinfo-hooks/useFetchMatchByUrl";
import { H2HMatchRecords } from "./screens/h2h-records/H2HMatchRecords";
import { MomentCaptures } from "./screens/elements/MomentCaptures";
import { Playing11Info } from "./screens/playing11-info/Playing11Info";
import { Top5Players } from "./screens/top5-players/Top5Players";
import { PointsTable } from "./screens/points-table/PointsTable";
import { MatchSummary } from "./screens/match-summary-info/MatchSummary";
import { config } from "../configs";
import { ChannelIntroVideo } from "./screens/ChannelIntroVideo";
import { ChannelExitPage } from "./screens/ChannelExitPage";
import { YoutubePlanner } from "./screens/YoutubePlanner";
import ReactPlayer from "react-player";
import { ThumbnailRender } from "./screens/elements-dev/ThumbnailRender";
import { MatchConfigs } from "./MatchConfigurations";
import { Format } from "../models/enums/CricketFormat";
import { PDFViewer } from "@react-pdf/renderer";
import { CricketScorboardPdf } from "./pdf-components/CricketScorboardPdf";
import { useTranslation } from "react-i18next";

interface CricketMatchProps {
  selectedScreenIndex: number;
  format: Format;
  matchConfigs: MatchConfigs;
}

const getScreenIndexes = (format: Format) => {
  const screenIndexes = {
    channelIntro: 0,
    matchBasicInfo: 1,
    headToHead: 2,
    playing11Info: 3,
    inning1Scores: 4,
    inning2Scores: 5,
    matchResultInfo: 6,
    channelExit: 7,
    pointsTable: 8,
    top5Player: 9,
    pdfScoreboard: 10,
    matchSummary: 11,
    matchPhotos: 12,
    demoPage: 13,
    ytPlanner: 14,
  };

  if (format === Format.T20_DOMESTIC) {
    screenIndexes.headToHead = 0;
    screenIndexes.channelIntro = 1;
    screenIndexes.matchBasicInfo = 2;
    screenIndexes.top5Player = 7;
    screenIndexes.channelExit = 9;
  }

  return screenIndexes;
};

export interface CricketMatchContextType {
  cricketMatch?: CricketMatch;
  matchConfigs?: MatchConfigs;
}

export const CricketMatchContext = createContext<CricketMatchContextType>({});

export const CricketMatchDetails: React.FC<CricketMatchProps> = ({
  selectedScreenIndex,
  matchConfigs,
}) => {
  const { matchUrl, format, currMatchNumber } = matchConfigs;
  const cricketMatch = useFetchMatchByUrl(matchUrl);

  const { t } = useTranslation();

  const {
    tossDecision,
    matchSquad,
    pointsTable,
    playerOfTheMatch,
    team1,
    team2,
  } = cricketMatch;

  const [isPlayingBG, setPlayingBG] = useState(true);

  useEffect(() => {
    setPlayingBG(true);
  }, [setPlayingBG, selectedScreenIndex, isPlayingBG]);

  const tournaments = {
    ipl: {
      url: "indian-premier-league-2025-16622",
      name: "Indian Premier League",
    },
  };

  const getMatchBasicInfo = () => {
    return (
      <MatchBasicInfo
        href={matchUrl}
        customMatchNumber={
          format === Format.T20_DOMESTIC
            ? `${t("cricket_terms.match_number")} ${currMatchNumber}`
            : ""
        }
        tossResult={tossDecision?.split(", ")[1]}
      />
    );
  };

  const screenIndexes = getScreenIndexes(format);

  return (
    <CricketMatchContext.Provider value={{ cricketMatch, matchConfigs }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        {selectedScreenIndex === screenIndexes.pdfScoreboard && (
          <PDFViewer width={"100%"} height={1000}>
            <CricketScorboardPdf data={cricketMatch} />
          </PDFViewer>
        )}
        {selectedScreenIndex === screenIndexes.ytPlanner && (
          <YoutubePlanner matchInfo={cricketMatch} />
        )}
        {selectedScreenIndex === screenIndexes.channelIntro && (
          <ChannelIntroVideo
            src={`http://localhost:3012/videos/intro/channelIntro.mp4`}
            height={config.pageSize.height}
            width={config.pageSize.width}
          />
        )}
        {selectedScreenIndex === screenIndexes.channelExit && (
          <ChannelExitPage />
        )}
        {selectedScreenIndex === screenIndexes.matchSummary && (
          <MatchSummary cricketMatch={cricketMatch} />
        )}
        {selectedScreenIndex === screenIndexes.matchBasicInfo &&
          getMatchBasicInfo()}
        {[screenIndexes.inning1Scores, screenIndexes.inning2Scores].includes(
          selectedScreenIndex
        ) && <Playing11ScoreInfo selectedIndex={selectedScreenIndex} />}
        {selectedScreenIndex === screenIndexes.matchResultInfo && (
          <MatchFinalInfo
            potmBattingStats={[
              team1.battingScorecard
                .concat(team2.battingScorecard)
                .find(
                  (x) => x.playerName.href === (playerOfTheMatch.href || "")
                ) as Batsman,
            ]}
            potmBowlingStats={[
              team1.bowlingScorecard
                .concat(team2.bowlingScorecard)
                .find(
                  (x) => x.playerName.href === (playerOfTheMatch.href || "")
                ) as Bowler,
            ]}
          />
        )}
        {selectedScreenIndex === screenIndexes.headToHead && (
          <H2HMatchRecords format={format} />
        )}
        {selectedScreenIndex === screenIndexes.top5Player && (
          <Top5Players
            tournamentId={tournaments.ipl.url}
            tournamentName={`${tournaments.ipl.name},`}
          />
        )}
        {selectedScreenIndex === screenIndexes.matchPhotos && (
          <MomentCaptures />
        )}
        {selectedScreenIndex === screenIndexes.playing11Info && matchSquad && (
          <Playing11Info />
        )}
        {selectedScreenIndex === screenIndexes.pointsTable &&
          pointsTable.length > 0 && (
            <PointsTable
              pointsTableRows={pointsTable}
              fontSize={30}
              tdHeight={55}
            />
          )}
        {/* {selectedScreenIndex === 11 && <TeamLogoCube />} */}
        {/* {selectedScreenIndex === 18 && <FireWorks />} */}
        {selectedScreenIndex === 18 && (
          <ThumbnailRender
            team1SquadInfo={matchSquad?.team1SquadInfo as TeamSquadInfo}
            team2SquadInfo={matchSquad?.team2SquadInfo as TeamSquadInfo}
          />
        )}
        {config.showBGVideo &&
          selectedScreenIndex !== screenIndexes.pdfScoreboard && (
            <div
              style={{
                position: "relative",
                zIndex: -1,
                marginTop: -config.pageSize.height - 20,
                overflow: "hidden",
                opacity:
                  selectedScreenIndex !== screenIndexes.channelIntro ? 1 : 0,
              }}
            >
              <ReactPlayer
                url={`http://localhost:3012/videos/fireworks/fireWorks.mp4`}
                height={config.pageSize.height + 20}
                width={config.pageSize.width}
                playing={isPlayingBG}
                volume={0}
                loop={true}
              />
            </div>
          )}
      </div>
    </CricketMatchContext.Provider>
  );
};
