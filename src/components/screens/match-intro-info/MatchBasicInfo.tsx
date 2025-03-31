import React, { useContext, useEffect } from "react";
import { GradualText } from "../../animations/text-animations/GradualText";
import { AnimatedNumber } from "../../common/AnimatedNumber";
import { motion, useAnimation } from "framer-motion";
import { config, Language } from "../../../configs";
import { useTranslation } from "react-i18next";
import { RevealText } from "../../animations/text-animations/RevealText";
import { TeamRotatingCylinder } from "../elements/TeamRotatingCylinder";
import { ScreenWrapper } from "../../ScreenWrapper";
import StaggeredContainer from "../../common/StaggeredContainer";
import { CricketMatchContext } from "../../CricketMatchDetails";
import { CricketMatch } from "../../../models/espn-cricinfo-models/CricketMatch";
import { MatchConfigs } from "../../MatchConfigurations";
import { speeches } from "../../speech-management/SpeechManagement";

import "./MatchBasicInfo.scss";
import "./../../../components/CommonCss.scss";

interface MatchBasicInfoProps {
  href: string;
  tossResult: string;
  customMatchNumber?: string;
  isWorldCup?: boolean;
}

export const MatchBasicInfo: React.FC<MatchBasicInfoProps> = ({
  href,
  tossResult,
  customMatchNumber,
  isWorldCup,
}) => {
  const { t } = useTranslation();
  const { cricketMatch, matchConfigs } = useContext(CricketMatchContext);
  const { matchBrief, matchSpeech, venueCountry } =
    matchConfigs as MatchConfigs;
  const {
    matchNumber,
    matchTitle,
    venue,
    tossWinner,
    series,
    matchDays,
    team1,
    team2,
  } = cricketMatch as CricketMatch;
  const [team1Name, team2Name] = matchTitle.split(" vs ");
  const mNArr = matchNumber?.split(" ");

  const wcControl = useAnimation();

  useEffect(() => {
    speeches["match-intro-info"](
      matchNumber,
      team1Name,
      team2Name,
      matchSpeech,
      tossWinner,
      tossResult
    );
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    wcControl.start({
      scale: [0, 0.6],
      transition: {
        duration: 10,
      },
    });
  }, []);

  return (
    <ScreenWrapper className="match-basic-info-container">
      <>
        {!customMatchNumber && (
          <div className="basic-match-number">
            {`${mNArr[0]} ${
              config.language === Language.Hindi ? "नं." : "no."
            }`}
            {config.language === Language.Hindi ? (
              <AnimatedNumber value={parseInt(mNArr[3])} duration={2000} />
            ) : (
              <AnimatedNumber value={parseInt(mNArr[2])} duration={2000} />
            )}
          </div>
        )}
        {customMatchNumber && (
          <RevealText text={customMatchNumber} className="basic-match-number" />
        )}
        <RevealText
          text={`${series} - ${matchBrief}`}
          className="basic-match-series"
        />
        <div className="match-title" style={{ background: "none" }}>
          <div>
            <TeamRotatingCylinder
              teamLogoUrl={team1.team.logoUrl}
              popUpOffSetX={-200}
              scale={0.9}
            />
            <h1 className="text-3d">
              <GradualText
                id="team-1-name"
                text={team1Name.toUpperCase()}
                duration={4000}
              />
            </h1>
          </div>
          <div
            className="vs-sign text-3d"
            style={{ fontSize: config.language === Language.Hindi ? 100 : 150 }}
          >
            <a
              href={`https://stats.espncricinfo.com${href}/full-scorecard`}
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {t("cricket_terms.vs")}
            </a>
          </div>
          <div>
            <TeamRotatingCylinder
              teamLogoUrl={team2.team.logoUrl}
              popUpOffSetX={200}
              scale={0.9}
            />
            <h1 className="text-3d">
              <GradualText
                id="team-2-name"
                text={team2Name?.toUpperCase()}
                duration={4000}
              />
            </h1>
          </div>
        </div>
        <StaggeredContainer
          className="match-date-and-venue"
          staggerChildren={0.5}
        >
          {matchDays && (
            <div className="basic-match-date">
              <GradualText
                id={matchNumber.split(" ")[2]}
                duration={6000}
                text={matchDays}
              />
            </div>
          )}
          {venue && (
            <div className="basic-match-venue">
              <GradualText
                id={matchNumber.split(" ")[2]}
                duration={6000}
                text={`${venue} ${venueCountry}`}
              />
            </div>
          )}
        </StaggeredContainer>
        {isWorldCup && (
          <motion.img
            animate={wcControl}
            className="world-cup-image"
            alt="world-cup"
            src={"http://localhost:3012/images/others/world-cup.png"}
          />
        )}
      </>
    </ScreenWrapper>
  );
};
