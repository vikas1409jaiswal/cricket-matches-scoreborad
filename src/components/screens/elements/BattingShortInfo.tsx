import React from "react";
import { Batsman } from "./../../../models/espn-cricinfo-models/CricketMatchModels";
import { config } from "../../../configs";
import { useTranslation } from "react-i18next";

import "./BBShortInfo.scss";

interface BattingShortInfoProps {
  battingScoreCard: Batsman[];
  scale?: number;
  hideOutStatus?: boolean;
}

export const BattingShortInfo: React.FC<BattingShortInfoProps> = ({
  battingScoreCard,
  scale,
  hideOutStatus,
}) => {
  const { t } = useTranslation();
  const { ballsFaced, runsScored, fours, sixes } = battingScoreCard.reduce(
    (accumulator, current) => {
      accumulator.ballsFaced += current?.ballsFaced || 0;
      accumulator.runsScored += current?.runsScored || 0;
      accumulator.fours += current?.fours || 0;
      accumulator.sixes += current?.sixes || 0;
      return accumulator;
    },
    {
      ballsFaced: 0,
      runsScored: 0,
      fours: 0,
      sixes: 0,
    }
  );

  return (
    <div className="bsi-container batting" style={{ zoom: scale || 1 }}>
      {ballsFaced ? (
        <>
          <span style={{ fontSize: 25 }}>{t("cricket_terms.runs")}</span>
          &nbsp;
          <span style={{ fontSize: 50 }}>
            {ballsFaced ? runsScored : t("cricket_terms.did_not_bat")}
            {battingScoreCard[0].outStatus?.includes(t("cricket_terms.not_out"))
              ? "*"
              : ""}
          </span>
          &nbsp;&nbsp;
          <span style={{ fontSize: 20 }}>{ballsFaced}</span>
          &nbsp;
          <span>{t("cricket_terms.balls")}</span>
        </>
      ) : (
        <span
          style={
            config.language === "hindi" ? { fontSize: 40 } : { fontSize: 50 }
          }
        >
          {t("cricket_terms.did_not_bat")}
        </span>
      )}
      &nbsp;&nbsp;
      {ballsFaced ? (
        <>
          <span className="fours-info">{fours}</span>
          &nbsp;&nbsp;
          <span className="sixes-info">{sixes}</span>
        </>
      ) : (
        <></>
      )}
      {!hideOutStatus && (
        <p className="out-status">
          {battingScoreCard[0]?.outStatus ||
            t("cricket_terms.did_not_bat_full")}
        </p>
      )}
    </div>
  );
};
