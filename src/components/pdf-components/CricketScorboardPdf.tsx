import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { CricketMatch } from "../../models/espn-cricinfo-models/CricketMatch";
import { TeamBattingScoreboardTable } from "./TeamBattingScoreboardTable";
import { TeamBowlingScoreboardTable } from "./TeamBowlingScoreboardTable";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: "10px 20px",
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchHeaderLogo: {
    border: "2px solid black",
    flexDirection: "row",
    alignItems: "center",
  },
  matchHeaderTitle: {
    border: "2px solid black",
    textAlign: "center",
    padding: "0px 10px",
    width: 450,
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    marginTop: 5,
  },
  teamSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scoreSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 12,
  },
  detailsRootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsContainer: {
    border: "2px solid black",
    margin: 5,
    padding: 10,
    fontSize: 10,
  },
  detailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  detailsSectionKey: {
    fontWeight: "bold",
    width: 100,
    padding: 5,
  },
  detailsSectionValue: {
    width: 150,
    padding: 5,
  },
});

interface CricketScorboardPdfProps {
  data: CricketMatch;
}

export const CricketScorboardPdf: React.FC<CricketScorboardPdfProps> = ({
  data,
}) => {
  const {
    matchNumber: matchNo,
    matchDays,
    series,
    season,
    team1,
    team2,
    venue,
    tossDecision,
    result,
    seriesResult,
    playerOfTheMatch,
    umpires,
    tvUmpire,
    matchReferee,
    matchSquad,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.matchHeader}>
          <View style={styles.matchHeaderLogo}>
            <Image
              src={`http://localhost:3012/images-team-logos/${team1.teamName
                .toLowerCase()
                .replaceAll(" ", "-")}.png`}
              style={{ maxWidth: 100, maxHeight: 120 }}
            />
          </View>
          <View style={styles.matchHeaderTitle}>
            <Text
              style={{
                ...styles.subTitle,
                fontSize: 14,
                fontWeight: 700,
                color: "darkblue",
              }}
            >
              {matchNo}
            </Text>
            <Text style={styles.title}>{team1.teamName}</Text>
            <Text style={styles.title}>vs</Text>
            <Text style={styles.title}>{team2.teamName}</Text>
            <Text style={styles.subTitle}>{matchDays}</Text>
          </View>
          <View style={styles.matchHeaderLogo}>
            <Image
              src={`http://localhost:3012/images-team-logos/${team2.teamName
                .toLowerCase()
                .replaceAll(" ", "-")}.png`}
              style={{ maxWidth: 100, maxHeight: 120 }}
            />
          </View>
        </View>
        <View style={styles.detailsRootContainer}>
          <View style={styles.detailsContainer}>
            {[
              ["Season", season],
              ["Series", series],
              ["Venue", venue],
              ["Toss", tossDecision],
              ["Result", result],
              ["Series Result", seriesResult],
              ["Player of the Match", playerOfTheMatch.playerName],
              [
                "Umpires",
                umpires.filter((x) => !["DRS"].includes(x)).join(", "),
              ],
              ["TV Umpires", tvUmpire],
              ["Match Referee", matchReferee],
            ].map((e: string[], i: number) => (
              <View style={styles.detailsSection}>
                <View>
                  <Text style={styles.detailsSectionKey}>{e[0]}</Text>
                </View>
                <View>
                  <Text style={styles.detailsSectionValue}>{e[1]}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.detailsContainer}>
            {[
              [
                `${matchSquad?.team1SquadInfo.teamName} Playing XI`,
                `${matchSquad?.team1SquadInfo.teamSquad
                  .map((x) => x.player.name)
                  .filter((x) => x !== "unknown")
                  .map((x, i) => `${i + 1}. ${x}`)
                  .join("\n")}`,
              ],
              [
                `${matchSquad?.team2SquadInfo.teamName} Playing XI`,
                `${matchSquad?.team2SquadInfo.teamSquad
                  .map((x) => x.player.name)
                  .filter((x) => x !== "unknown")
                  .map((x, i) => `${i + 1}. ${x}`)
                  .join("\n")}`,
              ],
            ].map((e: string[], i: number) => (
              <View style={styles.detailsSection}>
                <View>
                  <Text style={styles.detailsSectionKey}>{e[0]}</Text>
                </View>
                <View>
                  <Text style={styles.detailsSectionValue}>{e[1]}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
      <Page break size="A4" style={styles.page}>
        <View style={styles.teamSection}>
          <View>
            <TeamBattingScoreboardTable team={team1} />
          </View>
          <View>
            <TeamBattingScoreboardTable team={team2} />
          </View>
        </View>
        <View style={styles.teamSection}>
          <View>
            <TeamBowlingScoreboardTable team={team2} />
          </View>
          <View>
            <TeamBowlingScoreboardTable team={team1} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
