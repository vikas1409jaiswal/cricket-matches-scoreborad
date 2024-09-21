import React, { useEffect, useState } from "react";
import { useFetchTopPlayers } from "./../../hooks/espn-cricinfo-hooks/useFetchTopPlayers";
import { PlayerImage } from "./elements/PlayerImage";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { AnimatedNumber } from "./../common/AnimatedNumber";
import { getNameFromHref } from "../../utils/ReusableFuctions";
import { motion, useAnimation } from "framer-motion";
import $ from "jquery";
import { ScreenWrapper } from "../ScreenWrapper";
import { useTranslation } from "react-i18next";
import { speeches } from "../speech-management/SpeechManagement";

import "./Top5Players.scss";
import { Colors } from "../../colors";
import { config } from "../../configs";

interface Top5PlayersProps {
  tournamentId: string;
  tournamentName: string;
}

export const Top5Players: React.FC<Top5PlayersProps> = ({
  tournamentId,
  tournamentName,
}) => {
  const { t } = useTranslation();
  const { runScorers, wicketTakers, mostSixes, mostCatches } =
    useFetchTopPlayers(tournamentId);
  const [selectedSubScreenIndex, setSubScreenIndex] = useState(0);

  console.log(
    [
      runScorers?.map((x) =>
        x.player.href
          ?.split("/")[2]
          ?.split("-")
          .filter((y) => isNaN(parseInt(y)))
          .join(" ")
      ),
      wicketTakers?.map((x) =>
        x.player.href
          ?.split("/")[2]
          ?.split("-")
          .filter((y) => isNaN(parseInt(y)))
          .join(" ")
      ),
    ]
      .flat()
      .reduce((a, b) => a.set(b as string, ""), new Map<string, string>())
  );

  $(document).on({
    keydown: (event) => {
      if (event.originalEvent?.key === "n") {
        setSubScreenIndex((selectedSubScreenIndex + 1) % 2);
        event.preventDefault();
      }
    },
  });

  useEffect(() => {
    if (runScorers && wicketTakers && selectedSubScreenIndex === 0) {
      speeches["top_5_run_scorers"](tournamentName, runScorers, t);
      speeches["top_5_wicket_takers"](wicketTakers, t);
    }
    if (mostSixes && mostCatches && selectedSubScreenIndex === 1) {
      speeches["top_5_six_hitters"](mostSixes, t);
      speeches["top_5_catch_takers"](mostCatches, t);
    }

    return () => window.speechSynthesis.cancel();
  }, [selectedSubScreenIndex]);

  const cardControl = useAnimation();

  useEffect(() => {
    cardControl.start((i) => ({
      opacity: [0, 1],
      transition: {
        duration: 3,
        delay: (i - 1) * 0.2,
      },
    }));
  }, [selectedSubScreenIndex]);

  return (
    <ScreenWrapper className="">
      <>
        {selectedSubScreenIndex === 0 && (
          <div className="top-5-container">
            <h3 className="top-5-header">
              {t("cricket_terms.top_5_run_scorers")}
            </h3>
            <div className="top-5-row">
              {runScorers?.slice(0, 5).map((p, i) => (
                <Top5PlayerCard
                  href={p.player.href}
                  name={getNameFromHref(p.player.href)}
                  stat={p.runs}
                  teamShortName={p.player.name?.split("(")[1]?.replace(")", "")}
                  animate={cardControl}
                  custom={i}
                />
              ))}
            </div>
            <h3 className="top-5-header">
              {t("cricket_terms.top_5_wicket_takers")}
            </h3>
            <div className="top-5-row">
              {wicketTakers?.slice(0, 5).map((p, i) => (
                <Top5PlayerCard
                  href={p.player.href}
                  name={getNameFromHref(p.player.href)}
                  stat={p.wickets}
                  teamShortName={p.player.name?.split("(")[1]?.replace(")", "")}
                  animate={cardControl}
                  custom={i}
                />
              ))}
            </div>
          </div>
        )}
        {selectedSubScreenIndex === 1 && (
          <div className="top-5-container">
            <h3 className="top-5-header">
              {t("cricket_terms.top_5_six_hitters")}
            </h3>
            <div className="top-5-row">
              {mostSixes?.slice(0, 5).map((p, i) => (
                <Top5PlayerCard
                  href={p.player.href}
                  name={getNameFromHref(p.player.href)}
                  stat={p.sixes}
                  teamShortName={p.player.name?.split("(")[1]?.replace(")", "")}
                  animate={cardControl}
                  custom={i}
                />
              ))}
            </div>
            <h3 className="top-5-header">
              {t("cricket_terms.top_5_catch_takers")}
            </h3>
            <div className="top-5-row">
              {mostCatches?.slice(0, 5).map((p, i) => (
                <Top5PlayerCard
                  href={p.player.href}
                  name={getNameFromHref(p.player.href)}
                  stat={p.catches}
                  teamShortName={p.player.name?.split("(")[1]?.replace(")", "")}
                  animate={cardControl}
                  custom={i}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </ScreenWrapper>
  );
};

interface Top5PlayerCardProps {
  href: string;
  name: string;
  stat: number;
  teamShortName: string;
  animate: any;
  custom: number;
}

export const Top5PlayerCard: React.FC<Top5PlayerCardProps> = ({
  href,
  name,
  stat,
  teamShortName,
  animate,
  custom,
}) => {
  return (
    <motion.div
      className="top-player-card"
      animate={animate}
      custom={custom}
      style={{
        background: `radial-gradient(${Colors.White}, ${
          teamLogos.find((tl) => tl.shortName === teamShortName)?.primaryColor
        }, ${Colors.Black})`,
      }}
    >
      <PlayerImage
        href={href}
        alt={href}
        height={330}
        width={200}
        teamName={
          config.language === "hindi"
            ? teamLogos.find((tl) => tl.shortName === teamShortName)
                ?.hindiTeamName
            : teamLogos.find((tl) => tl.shortName === teamShortName)?.teamName
        }
        ignoreLocale
      />
      <AnimatedNumber
        value={stat || 0}
        duration={3000}
        className="stat-number"
      />
      <p className="name-header">
        <a
          href={`https://www.espncricinfo.com/${href}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          {name}
        </a>
      </p>
      <img
        className="team-logo"
        src={`http://localhost:3012/images-team-logos/${teamLogos
          .find((x) => x.shortName === teamShortName)
          ?.teamName?.replaceAll(" ", "-")}.png`}
        alt={href}
        height={120}
        width={100}
      />
    </motion.div>
  );
};
