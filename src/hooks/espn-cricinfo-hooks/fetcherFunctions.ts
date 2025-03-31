import axios, { AxiosResponse } from "axios";
import { ApiData } from "../../models/Api";

const ESPN_CRICINFO_BASEURL = "https://stats.espncricinfo.com";

export const fetchESPNCricInfoContent = (
  url: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(`${ESPN_CRICINFO_BASEURL}${url}`);
};

export enum H2HStatsType {
  TeamResultSummary = "team-results-summary",
  MostRuns = "batting-most-runs-career",
  MostWickets = "bowling-most-wickets-career",
  MostRunsInInning = "batting-most-runs-innings",
}

export const fetchTopPlayersInH2H = (
  format: string,
  teamUrlStr: string,
  type: string
): Promise<AxiosResponse<ApiData>> => {
  return fetchESPNCricInfoContent(
    `/records/headtohead/${type}/${teamUrlStr}/${format}`
  );
};

export enum TournamentStatsType {
  MostRuns = "batting-most-runs-career",
  MostWickets = "bowling-most-wickets-career",
  MostSixes = "batting-most-sixes-career",
  MostCatches = "fielding-most-catches-career",
}

export const fetchTopPlayersInTournament = (
  tournament: string,
  type: string
): Promise<AxiosResponse<ApiData>> => {
  return fetchESPNCricInfoContent(`/records/tournament/${type}/${tournament}`);
};
