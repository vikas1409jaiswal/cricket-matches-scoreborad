import { useQuery } from "react-query";
import { ApiData } from "../../models/Api";
import axios, { AxiosResponse } from "axios";
import {
  MatchesResultSummary,
  PlayerH2HBattingInfo,
  PlayerH2HBowlingInfo,
  PlayerH2HHIScoreInfo,
} from "../../models/espn-cricinfo-models/H2HMatches";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { Format } from "../../models/enums/CricketFormat";

const fetchHeadToHeadSummary = (
  format: string,
  teamUrlStr: string
): Promise<AxiosResponse<ApiData>> => {
  console.log(teamUrlStr);
  return axios.get(
    `https://www.espncricinfo.com/records/headtohead/team-results-summary/${teamUrlStr}/${format}`
  );
};

const fetchMostRuns = (
  format: string,
  teamUrlStr: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(
    `https://www.espncricinfo.com/records/headtohead/batting-most-runs-career/${teamUrlStr}/${format}`
  );
};

const fetchMostWickets = (
  format: string,
  teamUrlStr: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(
    `https://www.espncricinfo.com/records/headtohead/bowling-most-wickets-career/${teamUrlStr}/${format}`
  );
};

const fetchHIScores = (
  format: string,
  teamUrlStr: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(
    `https://www.espncricinfo.com/records/headtohead/batting-most-runs-innings/${teamUrlStr}/${format}`
  );
};

const teamIDMap = new Map([
  ["Netherlands", 15],
  ["Scotland", 30],
  ["Bangladesh", 25],
  ["Afghanistan", 40],
  ["West Indies", 4],
  ["Ireland", 29],
  ["India", 6],
  ["Australia", 2],
  ["England", 1],
  ["South Africa", 3],
  ["Pakistan", 7],
  ["Sri Lanka", 8],
  ["United States of America", 11],
  ["United Arab Emirates", 27],
  ["New Zealand", 5],
  ["Oman", 37],
  ["Nepal", 32],
  ["Canada", 17],
  ["Hong Kong", 19],
  ["Zimbabwe", 9],
  ["Namibia", 28],
  ["Kenya", 26],
  ["Rwanda", 191],
  ["Uganda", 34],
  ["Nigeria", 173],
  ["India Women", 1863],
  ["England Women", 1026],
  ["Australia Women", 289],
  ["Papua New Guinea", 20],
  ["Sri Lanka Women", 3672],
  ["West Indies Women", 3867],
]);

const useFetchMostRuns = (formatStr: string, teamUrlStr: string) => {
  const { data } = useQuery([formatStr, teamUrlStr, "most-runs"], () =>
    fetchMostRuns(formatStr, teamUrlStr)
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
    fetchMostWickets(formatStr, teamUrlStr)
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
    fetchHIScores(formatStr, teamUrlStr)
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
    formatStr = "one-day-internationals-2"; //"women-s-one-day-internationals-9";
  } else if (format === Format.T20_INTERNATIONAL) {
    formatStr = "twenty20-internationals-3";
  }

  const team1IdMap = teamIDMap.get(team1Name);
  const team2IdMap = teamIDMap.get(team2Name);

  const teamUrlStr = `${team1Name?.toLowerCase()}-${team2Name?.toLowerCase()}-${team1IdMap}vs${team2IdMap}`;

  const h2hData = useQuery([format, "h2h-matches"], () =>
    fetchHeadToHeadSummary(formatStr, teamUrlStr)
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
