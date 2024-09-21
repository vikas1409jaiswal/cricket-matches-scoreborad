import { useQuery } from "react-query";
import { ApiData } from "../../models/Api";
import axios, { AxiosResponse } from "axios";
import { Player } from "../../models/espn-cricinfo-models/CricketMatchModels";

export interface TopRunScorer {
  player: Player;
  matches: number;
  runs: number;
}

export interface TopWicketTaker {
  player: Player;
  matches: number;
  wickets: number;
}

export interface TopSixHitter {
  player: Player;
  matches: number;
  sixes: number;
}

export interface TopCatchTaker {
  player: Player;
  matches: number;
  catches: number;
}

interface TopPlayers {
  runScorers?: TopRunScorer[];
  wicketTakers?: TopWicketTaker[];
  mostSixes?: TopSixHitter[];
  mostCatches?: TopCatchTaker[];
}

const fetchTopPlayers = (
  tournament: string,
  type: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(
    `https://www.espncricinfo.com/records/tournament/${type}/${tournament}`
  );
};

const useFetchTopRunScorers = (tournament: string) => {
  const { data } = useQuery(["most-runs"], () =>
    fetchTopPlayers(tournament, "batting-most-runs-career")
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topRunScorers: TopRunScorer[] = [];

  rowsSelector?.forEach((r, i) => {
    topRunScorers.push({
      player: {
        name: r?.querySelector("td a")?.textContent as string,
        href: r?.querySelector("td a")?.getAttribute("href") as string,
      },
      matches: parseInt(
        r?.querySelectorAll("td")?.item(2)?.textContent as string
      ),
      runs: parseInt(r?.querySelectorAll("td")?.item(5)?.textContent as string),
    });
  });

  return topRunScorers;
};

const useFetchTopWicketTakers = (tournament: string) => {
  const { data } = useQuery(["most-wickets"], () =>
    fetchTopPlayers(tournament, "bowling-most-wickets-career")
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topWicketTakers: TopWicketTaker[] = [];

  rowsSelector?.forEach((r, i) => {
    topWicketTakers.push({
      player: {
        name: r?.querySelector("td a")?.textContent as string,
        href: r?.querySelector("td a")?.getAttribute("href") as string,
      },
      matches: parseInt(
        r?.querySelectorAll("td")?.item(2)?.textContent as string
      ),
      wickets: parseInt(
        r?.querySelectorAll("td")?.item(8)?.textContent as string
      ),
    });
  });

  return topWicketTakers;
};

const useFetchTopSixHitters = (tournament: string) => {
  const { data } = useQuery(["most-sixes"], () =>
    fetchTopPlayers(tournament, "batting-most-sixes-career")
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topSixHitters: TopSixHitter[] = [];

  rowsSelector?.forEach((r, i) => {
    topSixHitters.push({
      player: {
        name: r?.querySelector("td a")?.textContent as string,
        href: r?.querySelector("td a")?.getAttribute("href") as string,
      },
      matches: parseInt(
        r?.querySelectorAll("td")?.item(2)?.textContent as string
      ),
      sixes: parseInt(
        r?.querySelectorAll("td")?.item(14)?.textContent as string
      ),
    });
  });

  return topSixHitters;
};

const useFetchTopCatchTakers = (tournament: string) => {
  const { data } = useQuery(["most-catches"], () =>
    fetchTopPlayers(tournament, "fielding-most-catches-career")
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topCatchTakers: TopCatchTaker[] = [];

  rowsSelector?.forEach((r, i) => {
    topCatchTakers.push({
      player: {
        name: r?.querySelector("td a")?.textContent as string,
        href: r?.querySelector("td a")?.getAttribute("href") as string,
      },
      matches: parseInt(
        r?.querySelectorAll("td")?.item(2)?.textContent as string
      ),
      catches: parseInt(
        r?.querySelectorAll("td")?.item(4)?.textContent as string
      ),
    });
  });

  return topCatchTakers;
};

export const useFetchTopPlayers = (tournament: string): TopPlayers => {
  const runScorers = useFetchTopRunScorers(tournament);
  const wicketTakers = useFetchTopWicketTakers(tournament);
  const mostSixes = useFetchTopSixHitters(tournament);
  const mostCatches = useFetchTopCatchTakers(tournament);
  return {
    runScorers,
    wicketTakers,
    mostSixes,
    mostCatches,
  };
};
