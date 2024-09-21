import React from "react";
import { TeamRotatingCylinder } from "./elements/TeamRotatingCylinder";
import { useTranslation } from "react-i18next";

import "./H2HPageHeader.scss";

interface H2HPageHeaderProps {
  team1Name: string;
  team2Name: string;
  span: string;
}

export const H2HPageHeader: React.FC<H2HPageHeaderProps> = ({
  team1Name,
  team2Name,
  span,
}) => {
  const { t } = useTranslation();
  const imageUrl = (teamName: string) =>
    `http://localhost:3012/images-team-logos/${teamName?.replaceAll(
      " ",
      "-"
    )}.png`;

  return (
    <div className="h2h-result-summary-header">
      <TeamRotatingCylinder
        teamLogoUrl={imageUrl(team1Name)}
        popUpOffSetX={-200}
        scale={0.5}
      />
      <div className="h2h-banner">
        <p>{t("cricket_terms.head_to_head")}</p>
        <p className="h2h-teams-name">
          {`${team1Name} v ${team2Name} (${span})`}
        </p>
      </div>
      <TeamRotatingCylinder
        teamLogoUrl={imageUrl(team2Name)}
        popUpOffSetX={200}
        scale={0.5}
      />
    </div>
  );
};
