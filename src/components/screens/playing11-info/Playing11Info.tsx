import React, { useContext, useEffect, useState } from "react";
import {
  CricketMatch,
  MatchSquad,
  Player,
  Replacement,
  TeamSquad,
  TeamSquadInfo,
} from "../../../models/espn-cricinfo-models/CricketMatch";
import { PlayerImage } from "../elements/PlayerImage";
import { motion, useAnimation } from "framer-motion";
import logos from "../../../data/StaticData/teamLogos.json";
import $ from "jquery";
import { speakText } from "../../common/SpeakText";
import { useTranslation } from "react-i18next";
import { RevealText } from "../../animations/text-animations/RevealText";
import { TeamRotatingCylinder } from "../elements/TeamRotatingCylinder";
import { ScreenWrapper } from "../../ScreenWrapper";
import { config, Language } from "../../../configs";
import { PlayerReplacementIcon } from "../elements/PlayerReplacementIcon";
import { CricketMatchContext } from "../../CricketMatchDetails";

import "./Playing11Info.scss";

interface Playing11InfoProps {}

export const Playing11Info: React.FC<Playing11InfoProps> = () => {
  const [showTeam1, setShowTeam1] = useState(true);

  const { cricketMatch } = useContext(CricketMatchContext);
  const { matchSquad } = cricketMatch as CricketMatch;

  $(document).on({
    keydown: (event) => {
      if (event.originalEvent?.key === "n") {
        setShowTeam1(!showTeam1);
        event.preventDefault();
      }
    },
  });

  return (
    <>
      {showTeam1 && matchSquad && (
        <TeamPlaying11Info teamSquadInfo={matchSquad.team1SquadInfo} />
      )}
      {!showTeam1 && matchSquad && (
        <TeamPlaying11Info teamSquadInfo={matchSquad.team2SquadInfo} />
      )}
    </>
  );
};

interface TeamPlaying11InfoProps {
  teamSquadInfo: TeamSquadInfo;
}

export const TeamPlaying11Info: React.FC<TeamPlaying11InfoProps> = ({
  teamSquadInfo,
}) => {
  const { t } = useTranslation();
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: [0, 1],
      y: [100, 0],
      transition: {
        duration: 2,
        delay: (i - 1) * 0.1,
      },
    }));
  }, []);

  useEffect(() => {
    speakText(`${teamSquadInfo.teamName} ${t("cricket_terms.playing_11")}`);
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <ScreenWrapper className="team-playing-11-container">
      <>
        <RevealText
          text={`${teamSquadInfo.teamName} ${t("cricket_terms.playing_11")}`}
          className="playing-11-header"
        />
        <div className="playing-11-squad">
          {teamSquadInfo.teamSquad
            .slice(0, 12)
            .filter((x) => x.player.name !== "unknown")
            .map((p, i) => (
              <motion.div
                className="player-card"
                animate={controls}
                custom={i + 1}
                style={{
                  backgroundColor:
                    logos.find((x) =>
                      config.language === Language.Hindi
                        ? x.hindiTeamName === teamSquadInfo.teamName
                        : x.teamName === teamSquadInfo.teamName
                    )?.secondaryColor || "white",
                }}
              >
                <PlayerImage
                  href={p.player.href}
                  alt={p.player.name}
                  height={250}
                  width={190}
                  teamName={teamSquadInfo.teamName}
                />
                <p className="player-name">
                  <a href={`https://www.espncricinfo.com/${p.player.href}`}>
                    {p.player.name}
                  </a>
                </p>
                <p className="player-role">{p.role}</p>
                <PlayerReplacementIcon playerHref={p.player.href} />
              </motion.div>
            ))}
        </div>
        <TeamRotatingCylinder
          teamLogoUrl={teamSquadInfo.teamLogoUrl}
          popUpOffSetY={200}
          scale={0.5}
          className="team-rotating-cylinder"
        />
      </>
    </ScreenWrapper>
  );
};
