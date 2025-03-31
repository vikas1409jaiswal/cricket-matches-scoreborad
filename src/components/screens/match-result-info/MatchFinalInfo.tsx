import React, { useContext, useEffect, useRef } from "react";
import {
  Batsman,
  Bowler,
  CricketMatch,
} from "../../../models/espn-cricinfo-models/CricketMatch";
import { speeches } from "../../speech-management/SpeechManagement";
import { BattingShortInfo } from "../elements/BattingShortInfo";
import { BowlingShortInfo } from "../elements/BowlingShortInfo";
import { motion, useAnimation } from "framer-motion";
import { ScreenWrapper } from "../../ScreenWrapper";
import StaggeredContainer from "../../common/StaggeredContainer";
import { CricketMatchContext } from "../../CricketMatchDetails";
import { useTranslation } from "react-i18next";

import "./MatchFinalInfo.scss";
import "./../../../components/CommonCss.scss";

interface MatchFinalInfoProps {
  potmBattingStats: Batsman[];
  potmBowlingStats: Bowler[];
}

export const MatchFinalInfo: React.FC<MatchFinalInfoProps> = ({
  potmBattingStats,
  potmBowlingStats,
}) => {
  const { t } = useTranslation();
  const { cricketMatch } = useContext(CricketMatchContext);
  const { result, seriesResult, playerOfTheMatch } =
    cricketMatch as CricketMatch;
  const matchResultArr = result?.replace("(W)", "Women")?.split("(");

  const battingStat = potmBattingStats.filter((x) =>
    x?.playerName.name?.includes(playerOfTheMatch.playerName)
  );

  const bowlingStat = potmBowlingStats.filter((x) =>
    x?.playerName.name?.includes(playerOfTheMatch.playerName)
  );

  const scaleYControl = useAnimation();

  useEffect(() => {
    speeches["match-result"](result);
    speeches["potm-performance"](
      playerOfTheMatch.playerName,
      battingStat.map((x) => x.runsScored).reduce((a, b) => a + b, 0) || 0,
      battingStat.map((x) => x.ballsFaced).reduce((a, b) => a + b, 0) || 0,
      bowlingStat.map((x) => x.wickets).reduce((a, b) => a + b, 0) || 0,
      bowlingStat.map((x) => x.runsConceded).reduce((a, b) => a + b, 0) || 0
    );
    speeches["series-result"](
      seriesResult
        ?.replace("2023/24", "2023 twenty four")
        ?.replace("SA20", "S A twenty")
    );
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    scaleYControl.start({
      scaleY: [0, 1],
      transition: {
        duration: 3,
      },
    });
  }, []);

  return (
    <ScreenWrapper className="match-final-info-container">
      <>
        <div className="match-result text-3d-2">
          {matchResultArr[0]}
          <span style={{ fontSize: 15 }}>
            {matchResultArr[1] && `(${matchResultArr[1]}`}
          </span>
        </div>
        <div className="potm-container">
          <motion.img
            animate={scaleYControl}
            alt={playerOfTheMatch.playerName}
            src={`http://localhost:3012/images/${playerOfTheMatch.teamName
              ?.toLocaleLowerCase()
              ?.replaceAll(" ", "-")}/${
              potmBattingStats[0]?.playerName.href.split("/")[2] ||
              potmBowlingStats[0]?.playerName.href.split("/")[2]
            }.png`}
            height={700}
            width={600}
          />
          <StaggeredContainer
            className="match-final-info-stats"
            staggerChildren={0.5}
          >
            <BattingShortInfo
              battingScoreCard={potmBattingStats}
              scale={2.0}
              hideOutStatus
            />
            <BowlingShortInfo bowlingScoreCard={potmBowlingStats} scale={2.0} />
            {seriesResult && (
              <div
                className="match-result text-3d-2"
                style={{ fontSize: 50, height: "fit-content", width: 800 }}
              >
                {seriesResult}
              </div>
            )}
          </StaggeredContainer>
        </div>
        <motion.div className="potm" animate={scaleYControl}>
          <p>{t("cricket_terms.player_of_the_match")}</p>
          <div className="potm-name">{playerOfTheMatch.playerName}</div>
        </motion.div>
      </>
    </ScreenWrapper>
  );
};
