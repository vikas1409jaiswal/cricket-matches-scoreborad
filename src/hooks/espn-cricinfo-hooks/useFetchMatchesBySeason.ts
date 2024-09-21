import axios, { AxiosResponse } from "axios";
import { useQueries } from "react-query";
import { ApiData, ApiResponse } from "../../models/Api";
import {
  CricketMatchDetail,
  CricketMatchesBySeason,
} from "../../models/espn-cricinfo-models/CricketMatchModels";
import { Format } from "../../models/enums/CricketFormat";

const fetchCricketMatches = (
  format: Format,
  year: number
): Promise<AxiosResponse<ApiData>> => {
  let classNo = 0;
  if (format === Format.TEST_CRICKET) {
    classNo = 1;
  }
  if (format === Format.ODI) {
    classNo = 2;
  }
  if (format === Format.T20_INTERNATIONAL) {
    classNo = 3;
  }

  return axios.get(
    `https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?class=${classNo};id=${year};type=year`
  );
};

export const useFetchMatchesBySeason = (format: Format, years: number[]) => {
  const queries = [];

  const queryOptions = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: true,
    cacheTime: 60 * 60 * 1000,
    retry: true,
  };

  for (let i = 0; i < years.length; i++) {
    queries.push({
      queryKey: ["matches-all", years[i], format.toString()],
      queryFn: () => fetchCricketMatches(format, years[i]),
      ...queryOptions,
    });
  }

  const result = useQueries(queries);

  const cricketMatchesAll: CricketMatchesBySeason[] = [];

  result.map((r, i) => {
    const divElement = document.createElement("div");

    divElement.innerHTML = (r.data as ApiResponse)?.data.toString() as string;

    const allTableRows = divElement
      .querySelector("table.ds-table")
      ?.querySelectorAll("tbody tr");

    const cricketMatches: CricketMatchesBySeason = {
      season: years[i],
      matchDetails: [],
    };

    allTableRows?.forEach((x) => {
      const tdSelector = x?.querySelectorAll("td");
      cricketMatches.matchDetails.push({
        team1: tdSelector[0]?.textContent,
        team2: tdSelector[1]?.textContent,
        winner: tdSelector[2]?.textContent,
        margin: tdSelector[3]?.textContent,
        ground: tdSelector[4]?.textContent,
        matchDate: tdSelector[5]?.textContent,
        matchNo: tdSelector[6]?.textContent,
        href: tdSelector[6]?.querySelector("a")?.getAttribute("href"),
      } as CricketMatchDetail);
    });

    cricketMatchesAll.push(cricketMatches);
  });

  return {
    allLoaded: !result.map((x) => x.isLoading)?.includes(true),
    cricketMatchesAll,
  };
};
