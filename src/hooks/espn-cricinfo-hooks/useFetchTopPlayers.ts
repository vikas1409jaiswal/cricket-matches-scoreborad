import { useQuery } from "react-query";
import {
  fetchTopPlayersInTournament,
  TournamentStatsType,
} from "./fetcherFunctions";
import {
  TopCatchTakerTournament,
  TopPlayers,
  TopRunScorerTournament,
  TopSixHitterTournament,
  TopWicketTakerTournament,
} from "../../models/espn-cricinfo-models/TournamentTopPlayers";

const useFetchTopRunScorers = (tournament: string) => {
  const { data } = useQuery(["most-runs"], () =>
    fetchTopPlayersInTournament(tournament, TournamentStatsType.MostRuns)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topRunScorers: TopRunScorerTournament[] = [];

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
    fetchTopPlayersInTournament(tournament, TournamentStatsType.MostWickets)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topWicketTakers: TopWicketTakerTournament[] = [];

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
    fetchTopPlayersInTournament(tournament, TournamentStatsType.MostSixes)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topSixHitters: TopSixHitterTournament[] = [];

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
    fetchTopPlayersInTournament(tournament, TournamentStatsType.MostCatches)
  );

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const rowsSelector = divElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr"
  );

  const topCatchTakers: TopCatchTakerTournament[] = [];

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
