import { useQuery } from "react-query";
import {
  MatchesResultSummary,
  PlayerH2HBattingInfo,
  PlayerH2HBowlingInfo,
  PlayerH2HHIScoreInfo,
} from "../../models/espn-cricinfo-models/H2HMatchesRecord";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { Format } from "../../models/enums/CricketFormat";
import { teamIDMap } from "../../data/StaticData/constants";
import { fetchTopPlayersInH2H, H2HStatsType } from "./fetcherFunctions";

const useFetchMostRuns = (formatStr: string, teamUrlStr: string) => {
  const { data } = useQuery([formatStr, teamUrlStr, "most-runs"], () =>
    fetchTopPlayersInH2H(formatStr, teamUrlStr, H2HStatsType.MostRuns)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const mRArr: PlayerH2HBattingInfo[] = [];

  const table = divElement.querySelector(".ds-table");

  table?.querySelectorAll("tbody > tr")?.forEach((r) => {
    const tdsSelector = r?.querySelectorAll("td");
    mRArr.push({
      name: tdsSelector[0]?.textContent as string,
      href: r?.querySelector("td a")?.getAttribute("href") as string,
      matches: parseInt(tdsSelector[2]?.textContent as string),
      innings: parseInt(tdsSelector[3]?.textContent as string),
      runs: parseInt(tdsSelector[5]?.textContent as string),
      bFaced: parseInt(tdsSelector[8]?.textContent as string),
      notOut: parseInt(tdsSelector[4]?.textContent as string),
      centuries: parseInt(tdsSelector[10]?.textContent as string),
      hCenturies: parseInt(tdsSelector[11]?.textContent as string),
      sixes: parseInt(tdsSelector[14]?.textContent as string),
      fours: parseInt(tdsSelector[13]?.textContent as string),
      span: tdsSelector[1]?.textContent as string,
      sRate: parseFloat(tdsSelector[9]?.textContent as string),
      hScore: tdsSelector[6]?.textContent as string,
      ducks: parseInt(tdsSelector[12]?.textContent as string),
    });
  });

  return mRArr;
};

const useFetchMostWickets = (formatStr: string, teamUrlStr: string) => {
  const { data } = useQuery([formatStr, teamUrlStr, "most-wickets"], () =>
    fetchTopPlayersInH2H(formatStr, teamUrlStr, H2HStatsType.MostWickets)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const mWArr: PlayerH2HBowlingInfo[] = [];

  const table = divElement.querySelector(".ds-table");

  table?.querySelectorAll("tbody > tr")?.forEach((r) => {
    const tdsSelector = r?.querySelectorAll("td");
    mWArr.push({
      name: tdsSelector[0]?.textContent as string,
      href: r?.querySelector("td a")?.getAttribute("href") as string,
      matches: parseInt(tdsSelector[2]?.textContent as string),
      innings: parseInt(tdsSelector[3]?.textContent as string),
      overs: parseFloat(tdsSelector[5]?.textContent as string),
      wickets: parseInt(tdsSelector[8]?.textContent as string),
      balls: parseInt(tdsSelector[4]?.textContent as string),
      span: tdsSelector[1]?.textContent as string,
      maidens: parseInt(tdsSelector[6]?.textContent as string),
      runConceded: parseInt(tdsSelector[7]?.textContent as string),
      bbi: tdsSelector[9]?.textContent as string,
      bbm: tdsSelector[10]?.textContent as string,
      fourWickets: parseInt(tdsSelector[14]?.textContent as string),
      fiveWickets: parseInt(tdsSelector[15]?.textContent as string),
      economy: parseFloat(tdsSelector[12]?.textContent as string),
    });
  });

  return mWArr;
};

const useFetchHIScores = (formatStr: string, teamUrlStr: string) => {
  const { data } = useQuery([formatStr, teamUrlStr, "hi-scores"], () =>
    fetchTopPlayersInH2H(formatStr, teamUrlStr, H2HStatsType.MostRunsInInning)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const hisArr: PlayerH2HHIScoreInfo[] = [];

  const table = divElement.querySelector(".ds-table");

  table?.querySelectorAll("tbody > tr")?.forEach((r) => {
    const tdsSelector = r?.querySelectorAll("td");
    const teamName = tdsSelector[7]?.textContent as string;
    hisArr.push({
      name: `${tdsSelector[0]?.textContent} (${
        teamLogos.find((x) => x.teamName === teamName)?.shortName
      })`,
      teamName,
      href: r?.querySelector("td a")?.getAttribute("href") as string,
      runs: parseInt(tdsSelector[1]?.textContent as string),
      balls: parseInt(tdsSelector[3]?.textContent as string),
      notOut: tdsSelector[1]?.textContent?.includes("*") as boolean,
    });
  });

  return hisArr;
};

export const useFetchH2HSummary = (
  format: Format,
  team1Name: string,
  team2Name: string
) => {
  let formatStr: string = "test-matches-1";
  if (format === Format.TEST_CRICKET) {
    formatStr = "test-matches-1"; //"women-s-test-matches-8";
  } else if (format === Format.ODI) {
    formatStr = "one-day-internationals-2"; //"women-s-one-day-internationals-9"; //
  } else if (format === Format.T20_INTERNATIONAL) {
    formatStr = "twenty20-internationals-3"; //"women-s-twenty20-internationals-10"; //
  }

  const team1IdMap = teamIDMap.get(team1Name);
  const team2IdMap = teamIDMap.get(team2Name);

  const teamUrlStr = `${team1Name?.toLowerCase()}-${team2Name?.toLowerCase()}-${team1IdMap}vs${team2IdMap}`;

  const h2hData = useQuery([format, "h2h-matches"], () =>
    fetchTopPlayersInH2H(formatStr, teamUrlStr, H2HStatsType.TeamResultSummary)
  );

  const mRArr = useFetchMostRuns(formatStr, teamUrlStr);
  const mWArr = useFetchMostWickets(formatStr, teamUrlStr);
  const hisArr = useFetchHIScores(formatStr, teamUrlStr);

  const divElement = document.createElement("div");

  divElement.innerHTML = h2hData.data?.data.toString() as string;
  const table = divElement.querySelector(".ds-table");

  const matchSum: MatchesResultSummary[] = [];

  table?.querySelectorAll("tbody > tr")?.forEach((r) => {
    const tdsSelector = r?.querySelectorAll("td");
    matchSum.push({
      team: tdsSelector[0]?.textContent || "",
      matches: parseInt(tdsSelector[2]?.textContent as string),
      won: parseInt(tdsSelector[3]?.textContent as string),
      lost: parseInt(tdsSelector[4]?.textContent as string),
      draw: parseInt(tdsSelector[5]?.textContent as string),
      tied: parseInt(tdsSelector[6]?.textContent as string),
      span: tdsSelector[1]?.textContent || "",
      noResult: parseInt(tdsSelector[9]?.textContent as string),
      mostRuns: mRArr,
      mostWickets: mWArr,
      hIScores: hisArr,
    });
  });

  return matchSum;
};
