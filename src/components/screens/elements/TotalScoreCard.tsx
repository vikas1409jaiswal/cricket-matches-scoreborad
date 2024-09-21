import React, { useEffect } from "react";
import { speeches } from "../../speech-management/SpeechManagement";
import { useTranslation } from "react-i18next";

import "./TotalScoreCard.scss";
import { TeamRotatingCylinder } from "./TeamRotatingCylinder";

interface TotalScoreCardProps {
  teamName: string;
  teamLogoUrl: string;
  totalScore: string[];
  extras: string;
  inning: string;
}

export const TotalScoreCard: React.FC<TotalScoreCardProps> = ({
  teamName,
  teamLogoUrl,
  totalScore,
  extras,
  inning,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    speeches["team-total-score-info"](teamName, totalScore);
    return () => window.speechSynthesis.cancel();
  }, []);
  return (
    <div className="total-score-card">
      <TeamRotatingCylinder
        teamLogoUrl={teamLogoUrl}
        popUpOffSetX={200}
        scale={0.45}
      />
      <h1 className="inning-number">{inning}</h1>
      <div className="full-score-details">
        <div className="key">{t("cricket_terms.total")}</div>
        <div className="value">{`${totalScore[0]}/${totalScore[1]}`}</div>
        <div className="key">{t("cricket_terms.overs")}</div>
        <div className="value">{totalScore[2]?.replace("Overs", "Ovs")}</div>
        <div className="key">{t("cricket_terms.extras")}</div>
        <div className="value">{extras}</div>
      </div>
    </div>
  );
};
