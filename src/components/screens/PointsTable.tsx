import React, { useEffect } from "react";
import { PointsTableRow } from "./../../models/espn-cricinfo-models/CricketMatchModels";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { motion, useAnimation } from "framer-motion";
import { speeches } from "../speech-management/SpeechManagement";
import { useTranslation } from "react-i18next";

import "./PointsTable.scss";
import { Colors } from "../../colors";
import { config } from "../../configs";

interface PointsTableProps {
  pointsTableRows: PointsTableRow[];
  fontSize?: number;
  tdHeight?: number;
}

export const PointsTable: React.FC<PointsTableProps> = ({
  pointsTableRows,
  fontSize,
  tdHeight,
}) => {
  const rowControl = useAnimation();
  const { t } = useTranslation();

  useEffect(() => {
    speeches["points-table-info"](pointsTableRows);
  }, []);

  const getCellStyleByTeamName = (teamName: string) => {
    const teamObj = teamLogos.find((x) =>
      config.language === "hindi"
        ? x.hindiTeamName === teamName
        : x.teamName === teamName
    ) as any;

    return {
      background: teamObj?.teamBGColor,
      color: teamObj?.teamFontColor,
      border: "4px solid white",
      height: tdHeight || 120,
      marginTop: 40,
    };
  };

  useEffect(() => {
    rowControl.start((i) => ({
      opacity: [0, 1],
      y: [1000, 0],
      transition: {
        duration: 2,
        delay: (i - 1) * 0.2,
      },
    }));
  }, []);

  return (
    <div className="points-table-container">
      <table>
        <thead>
          <tr>
            <th>{t("cricket_terms.points_table.rank")}</th>
            <th>{t("cricket_terms.points_table.team")}</th>
            <th>{t("cricket_terms.points_table.matches")}</th>
            <th>{t("cricket_terms.points_table.won")}</th>
            <th>{t("cricket_terms.points_table.lost")}</th>
            <th>{t("cricket_terms.points_table.tied")}</th>
            <th>{t("cricket_terms.points_table.no_result")}</th>
            <th>{t("cricket_terms.points_table.points")}</th>
            <th>{t("cricket_terms.points_table.net_run_rate")}</th>
          </tr>
        </thead>
        <tbody>
          {pointsTableRows?.slice(0, 10).map((tr, i) => (
            <motion.tr
              className="points-table-row"
              animate={rowControl}
              custom={i}
            >
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.rank || i + 1}
              </td>
              <td
                style={{
                  ...getCellStyleByTeamName(tr.teamName),
                  height: tdHeight || 120,
                  background: "none",
                }}
              >
                <img
                  src={`http://localhost:3012/images-team-logos/${(config.language ===
                  "hindi"
                    ? teamLogos.find((x) => x.hindiTeamName === tr.teamName)
                        ?.teamName
                    : tr.teamName
                  )?.replaceAll(" ", "-")}.png`}
                  alt={tr.teamName}
                  height={(tdHeight || 120) - 10}
                  width={(tdHeight || 120) - 10}
                />
              </td>
              <td
                style={{
                  ...getCellStyleByTeamName(tr.teamName),
                  fontSize: fontSize || 50,
                  height: tdHeight || 120,
                }}
              >
                {tr.teamName?.replace(" Women", "")}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.matches || 0}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>{tr.won || 0}</td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.lost || 0}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.tied || 0}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.noResult || 0}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.points || 0}
              </td>
              <td style={getCellStyleByTeamName(tr.teamName)}>
                {tr.netRR || 0}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
