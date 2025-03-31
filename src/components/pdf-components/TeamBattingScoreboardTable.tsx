import React from "react";
import ReactPdfTable from "./ReactPdfTable";
import { TeamScoreBoard } from "../../models/espn-cricinfo-models/CricketMatch";
import { View, Text } from "@react-pdf/renderer";

interface TeamBattingScoreboardTableProps {
  team: TeamScoreBoard;
}

export const TeamBattingScoreboardTable: React.FC<
  TeamBattingScoreboardTableProps
> = ({ team }) => {
  const batsmanPlayedData = team.battingScorecard.map((x) => {
    const cellStyle = {
      width: 30,
      backgroundColor: x.outStatus.includes("not out") ? "cyan" : "yellow",
    };

    return [
      {
        text: `${x.playerName.name}\n ${x.outStatus}`,
        style: {
          ...cellStyle,
          width: 120,
        },
      },
      {
        text: x.runsScored.toString(),
        style: cellStyle,
      },
      {
        text: x.ballsFaced.toString(),
        style: cellStyle,
      },
      {
        text: x.fours.toString(),
        style: cellStyle,
      },
      {
        text: x.sixes.toString(),
        style: cellStyle,
      },
    ];
  });

  const batsmanNotPlayedData = team.didNotBat.map((x) => {
    const cellStyle = {
      width: 30,
      backgroundColor: "yellow",
    };

    return [
      {
        text: `${x.name}\n did not bat`,
        style: {
          ...cellStyle,
          width: 120,
        },
      },
      {
        text: "-",
        style: cellStyle,
      },
      {
        text: "-",
        style: cellStyle,
      },
      {
        text: "-",
        style: cellStyle,
      },
      {
        text: "-",
        style: cellStyle,
      },
    ];
  });

  return (
    <ReactPdfTable
      tableTitle={
        <View style={{ fontSize: 16 }}>
          <Text>{`${team.teamName} Batting`}</Text>
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
          text: "Runs",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "Balls",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "6s",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
        {
          text: "4s",
          style: {
            width: 30,
            backgroundColor: "pink",
          },
        },
      ]}
      data={[
        ...batsmanPlayedData,
        ...batsmanNotPlayedData,
        [
          {
            text: "Total",
            style: {
              width: 120,
              backgroundColor: "greenyellow",
            },
          },
          {
            text: `${team.totalScore}`,
            style: {
              width: 132,
              backgroundColor: "greenyellow",
            },
          },
        ],
      ]}
    />
  );
};
