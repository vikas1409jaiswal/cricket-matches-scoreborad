import React from "react";
import { Bowler } from "./../../../models/espn-cricinfo-models/CricketMatchModels";
import { config } from "../../../configs";

import "./BBShortInfo.scss";
import { useTranslation } from "react-i18next";

interface BowlingShortInfoProps {
  bowlingScoreCard: Bowler[];
  scale?: number;
}

export const BowlingShortInfo: React.FC<BowlingShortInfoProps> = ({
  bowlingScoreCard,
  scale,
}) => {
  const { t } = useTranslation();
  const { oversBowled, wickets, runsConceded } = bowlingScoreCard.reduce(
    (accumulator, current) => {
      accumulator.oversBowled += current?.oversBowled || 0;
      accumulator.wickets += current?.wickets || 0;
      accumulator.runsConceded += current?.runsConceded || 0;
      return accumulator;
    },
    {
      oversBowled: 0,
      wickets: 0,
      runsConceded: 0,
    }
  );
  return (
    <div className="bsi-container bowling" style={{ zoom: scale || 1 }}>
      {oversBowled ? (
        <>
          <span style={{ fontSize: 25 }}>{t("cricket_terms.wickets")}</span>
          &nbsp;
          <span style={{ fontSize: 50 }}>{wickets}</span>
          &nbsp; &nbsp;
          <span style={{ fontSize: 20 }}>{runsConceded}</span>
          &nbsp;
          <span>{t("cricket_terms.conceded")}</span>
        </>
      ) : (
        <span
          style={
            config.language === "hindi" ? { fontSize: 40 } : { fontSize: 50 }
          }
        >
          {t("cricket_terms.did_not_bowl")}
        </span>
      )}
    </div>
  );
};
