import React from "react";
import ReactPdfTable from "./ReactPdfTable";
import { TeamScoreBoard } from "../../models/espn-cricinfo-models/CricketMatch";
import { View, Text } from "@react-pdf/renderer";

interface TeamBowlingScoreboardTableProps {
  team: TeamScoreBoard;
}

export const TeamBowlingScoreboardTable: React.FC<
  TeamBowlingScoreboardTableProps
> = ({ team }) => {
  const bowlersData = team.bowlingScorecard.map((x) => {
    const cellStyle = {
      width: 30,
      backgroundColor: "yellow",
    };

    return [
      {
        text: `${x.playerName.name}`,
        style: {
          ...cellStyle,
          width: 120,
        },
      },
      {
        text: x.wickets.toString(),
        style: cellStyle,
      },
      {
        text: x.oversBowled.toString(),
        style: cellStyle,
      },
      {
        text: x.runsConceded.toString(),
        style: cellStyle,
      },
      {
        text: x.wideBall.toString(),
        style: cellStyle,
      },
    ];
  });

  return (
    <ReactPdfTable
      tableTitle={
        <View style={{ fontSize: 16 }}>
          <Text>{`${team.teamName} Bowling`}</Text>
        </View>
      }
      headers={[
        {
          text: "Player Name",
          style: {
            width: 120,
            backgroundColor: "pink",
          },
        },
        {
          text: "Wkts",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "Ovs",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "Runs",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "WB",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
      ]}
      data={bowlersData}
    />
  );
};
