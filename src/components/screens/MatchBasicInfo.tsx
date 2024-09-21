import React, { useEffect } from "react";
import { GradualText } from "../animations/text-animations/GradualText";
import { speakText } from "./../common/SpeakText";
import { AnimatedNumber } from "../common/AnimatedNumber";
import { motion, useAnimation } from "framer-motion";
import { config } from "../../configs";
import { useTranslation } from "react-i18next";
import { RevealText } from "../animations/text-animations/RevealText";

import "./MatchBasicInfo.scss";
import "./../../components/CommonCss.scss";
import { TeamRotatingCylinder } from "./elements/TeamRotatingCylinder";
import { ScreenWrapper } from "../ScreenWrapper";
import StaggeredContainer from "../common/StaggeredContainer";

interface MatchBasicInfoProps {
  href: string;
  matchNumber: string;
  matchTitle: string;
  matchDate: string;
  matchVenue: string;
  matchSeries: string;
  tossWinner: string;
  tossResult: string;
  matchBrief: string;
  customMatchNumber?: string;
  venueCountry: string;
  matchSpeech: string;
  isWorldCup?: boolean;
  team1LogoUrl: string;
  team2LogoUrl: string;
}

export const MatchBasicInfo: React.FC<MatchBasicInfoProps> = ({
  href,
  matchNumber,
  matchTitle,
  matchDate,
  matchVenue,
  matchSeries,
  tossWinner,
  tossResult,
  matchBrief,
  customMatchNumber,
  venueCountry,
  matchSpeech,
  isWorldCup,
  team1LogoUrl,
  team2LogoUrl,
}) => {
  const { t } = useTranslation();
  const [team1, team2] = matchTitle.split(" vs ");
  const mNArr = matchNumber?.split(" ");

  const wcControl = useAnimation();

  useEffect(() => {
    if (config.language === "hindi") {
      speakText(
        `${matchNumber
          ?.replace("WODI", "Women One day International")
          ?.replace("WT20I", "Women T Twenty International")
          ?.replace("ODI", "One day International")
          ?.replace("T20I", "T Twenty International")
          ?.replace("टी20", "T Twenty")
          ?.replace(
            "नं.",
            "नंबर"
          )}, ${team1} बनाम ${team2} - ${matchSpeech}, ${tossWinner} ने टॉस जीता, ${tossResult}`
      );
    } else {
      speakText(
        `${matchNumber
          ?.replace("WODI", "Women One day International")
          ?.replace("YODI", "Youth One day International")
          ?.replace("WT20I", "Women T Twenty International")
          ?.replace("WTest", "Women test")
          ?.replace("ODI", "One day International")
          ?.replace("T20I", "T Twenty International")
          ?.replace("no.", "number")}, ${team1} versus ${team2?.replace(
          "Bhilwara",
          "Bhilwaada"
        )} - ${matchSpeech}, ${tossWinner} won the toss, ${tossResult}`
      );
    }

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
            {`${mNArr[0]} ${config.language === "hindi" ? "नं." : "no."}`}
            {config.language === "hindi" ? (
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
          text={`${matchSeries?.split("[")[0]} - ${matchBrief}`}
          className="basic-match-series"
        />
        <div className="match-title" style={{ background: "none" }}>
          <div>
            <TeamRotatingCylinder
              teamLogoUrl={team1LogoUrl}
              popUpOffSetX={-200}
              scale={0.9}
            />
            <h1 className="text-3d">
              <GradualText
                id="team-1-name"
                text={team1.toUpperCase()}
                duration={4000}
              />
            </h1>
          </div>
          <div className="vs-sign text-3d">
            <a
              href={`https://stats.espncricinfo.com${href}`}
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              Vs
            </a>
          </div>
          <div>
            <TeamRotatingCylinder
              teamLogoUrl={team2LogoUrl}
              popUpOffSetX={200}
              scale={0.9}
            />
            <h1 className="text-3d">
              <GradualText
                id="team-2-name"
                text={team2?.toUpperCase()}
                duration={4000}
              />
            </h1>
          </div>
        </div>
        <StaggeredContainer
          className="match-date-and-venue"
          staggerChildren={0.5}
        >
          {matchDate && (
            <div className="basic-match-date">
              <GradualText
                id={matchNumber.split(" ")[2]}
                duration={6000}
                text={matchDate}
              />
            </div>
          )}
          {matchVenue && (
            <div className="basic-match-venue">
              <GradualText
                id={matchNumber.split(" ")[2]}
                duration={6000}
                text={`${matchVenue} ${venueCountry}`}
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
