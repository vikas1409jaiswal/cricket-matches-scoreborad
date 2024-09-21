import React, { useEffect } from "react";
import { useFetchH2HSummary } from "./../../hooks/espn-cricinfo-hooks/useFetchH2HSummary";
import { TeamSquadInfo } from "./../../models/espn-cricinfo-models/CricketMatchModels";
import { PlayerImage } from "./elements/PlayerImage";
import { speakText } from "./../common/SpeakText";
import { H2HPageHeader } from "./H2HPageHeader";
import { AnimatedNumber } from "../common/AnimatedNumber";
import { getNameFromHref } from "../../utils/ReusableFuctions";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { config } from "../../configs";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "../ScreenWrapper";
import StaggeredContainer from "../common/StaggeredContainer";
import { Format } from "../../models/enums/CricketFormat";

import "./H2HMatchRecords.scss";
import "./../CommonCss.scss";

interface H2HMatchRecordsProps {
  team1SquadInfo: TeamSquadInfo;
  team2SquadInfo: TeamSquadInfo;
  format: Format;
}

export const H2HMatchRecords: React.FC<H2HMatchRecordsProps> = ({
  team1SquadInfo,
  team2SquadInfo,
  format,
}) => {
  const { t } = useTranslation();
  const { teamName: team1Name, teamSquad: team1Squad } = team1SquadInfo;
  const { teamName: team2Name, teamSquad: team2Squad } = team2SquadInfo;
  const team1Captain = team1Squad.find((x) => x.player.name.includes("(c)"));
  const team2Captain = team2Squad.find((x) => x.player.name.includes("(c)"));

  const teamArr = (
    config.language === "hindi"
      ? [
          teamLogos.find((x) => x.hindiTeamName === team1Name)?.teamName,
          teamLogos.find((x) => x.hindiTeamName === team2Name)?.teamName,
        ].sort()
      : [team1Name, team2Name]
  ) as string[];
  const matches = useFetchH2HSummary(format, teamArr[0], teamArr[1]);

  useEffect(() => {
    if (config.language === "hindi") {
      speakText(`${team1Name} बनाम ${team2Name} आमने-सामने`);
    } else {
      speakText(`${team1Name} versus ${team2Name} head to head`);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <ScreenWrapper className="h2h-record-container">
      <>
        <H2HPageHeader
          team1Name={team1Name}
          team2Name={team2Name}
          span={matches[0]?.span}
        />
        <div className="h2h-team-records" style={{ background: "none" }}>
          <div className="h2h-columns team-1-info">
            <PlayerImage
              className="flipped-image"
              alt={team1Captain?.player.name || ""}
              href={team1Captain?.player.href || ""}
              height={500}
              teamName={team1Name}
            />
            <p className="captain-name">{team1Captain?.player.name}</p>
          </div>
          <StaggeredContainer className={"comparison-info"}>
            <div className="h2h-match">
              <span>{t("cricket_terms.match")}</span>
              <AnimatedNumber value={matches[0]?.matches} duration={5000} />
            </div>
            <div className="h2h-match">
              <span>{`${
                config.language === "hindi"
                  ? teamLogos.find((x) => x.teamName === matches[0]?.team)
                      ?.hindiTeamName
                  : matches[0]?.team
              } ${t("cricket_terms.won")}`}</span>
              <AnimatedNumber value={matches[0]?.won} duration={5000} />
            </div>
            <div className="h2h-match">
              <span>{`${
                config.language === "hindi"
                  ? teamLogos.find((x) => x.teamName === matches[1]?.team)
                      ?.hindiTeamName
                  : matches[1]?.team
              } ${t("cricket_terms.won")}`}</span>
              <AnimatedNumber value={matches[0]?.lost} duration={5000} />
            </div>
            {format === Format.TEST_CRICKET && (
              <div className="h2h-match">
                <span>Draw</span>
                <span>{matches[0]?.draw}</span>
              </div>
            )}
            <div className="h2h-match">
              <span>{t("cricket_terms.tied")}</span>
              <AnimatedNumber value={matches[0]?.tied} duration={5000} />
            </div>
            <div className="h2h-match">
              <span>{t("cricket_terms.no_result")}</span>
              <AnimatedNumber value={matches[0]?.noResult} duration={5000} />
            </div>
            <div className="most-records" style={{ background: "none" }}>
              <div className="key">
                <p className="title">{t("cricket_terms.most_runs")}</p>
                <p className="player">
                  {getNameFromHref(
                    matches[0]?.mostRuns[0]?.href,
                    undefined,
                    30
                  )}
                </p>
              </div>
              <div className="value">
                <AnimatedNumber
                  value={matches[0]?.mostRuns[0]?.runs}
                  duration={5000}
                />
              </div>
              <div className="key">
                <p className="title">{t("cricket_terms.most_wickets")}</p>
                <p className="player">
                  {getNameFromHref(
                    matches[0]?.mostWickets[0]?.href,
                    undefined,
                    30
                  )}
                </p>
              </div>
              <div className="value">
                <AnimatedNumber
                  value={matches[0]?.mostWickets[0]?.wickets}
                  duration={5000}
                />
              </div>
            </div>
          </StaggeredContainer>
          <div className="h2h-columns team-2-info">
            <PlayerImage
              alt={team2Captain?.player.name || ""}
              href={team2Captain?.player.href || ""}
              height={500}
              teamName={team2Name}
            />
            <p className="captain-name">{team2Captain?.player.name}</p>
          </div>
        </div>
      </>
    </ScreenWrapper>
  );
};
