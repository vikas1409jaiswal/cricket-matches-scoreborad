import { useQuery } from "react-query";
import { ApiData, ApiResponse } from "../../models/Api";
import {
  Batsman,
  Bowler,
  CricketMatchTest,
} from "../../models/espn-cricinfo-models/CricketMatchModels";
import axios, { AxiosResponse } from "axios";
import { config } from "../../configs";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { useFetchPlaying11, useFetchPointsTable } from "./useFetchMatchByUrl";

const fetchTestCricketMatch = (
  url: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(`https://stats.espncricinfo.com${url}`);
};

export const useFetchTestMatchByUrl = (matchUrl: string) => {
  const { isLoading, data } = useQuery(["single-test-match"], () =>
    fetchTestCricketMatch(matchUrl)
  );

  const matchSquad = useFetchPlaying11(matchUrl, !isLoading);

  const pointsTable = useFetchPointsTable(matchUrl, !isLoading);

  const divElement = document.createElement("div");

  divElement.innerHTML = (data as ApiResponse)?.data.toString() as string;

  const headerData = divElement.querySelector(
    ".ds-w-full .ds-text-compact-xxs"
  );
  const tableData = divElement.querySelector("table.ds-table.ds-table-sm");
  const tableRows = tableData?.querySelectorAll("tr");

  const teamsData = divElement.querySelectorAll(".ds-rounded-lg.ds-mt-2");

  const team1Data = [teamsData[0], teamsData[2]];
  const team2Data = [teamsData[1], teamsData[3]];
  const tablesTeam1Data = team1Data.map((td) =>
    td?.querySelectorAll("table.ds-w-full")
  );
  const tablesTeam2Data = team2Data.map((td) =>
    td?.querySelectorAll("table.ds-w-full")
  );

  const teamNames = headerData?.querySelectorAll(
    ".ci-team-score > div:first-child"
  );
  const team1Name = teamNames?.item(0)?.getAttribute("title") as string;
  const team2Name = teamNames?.item(1)?.getAttribute("title") as string;

  let tossDetail = "";
  let season = "";
  let series = "";
  let seriesResult = "";
  let playerOfTheMatch = "";
  let potmHref = "";
  let potmTeamName = "";
  let matchNo = "";
  let matchDays = "";
  let tvUmpire = "";
  let matchReferee = "";
  let reserveUmpire = "";
  let umpires: string[] = [];
  let formatDebut: string[] = [];
  let internationalDebut: string[] = [];

  for (let i = 1; i < (tableRows?.length as number); i++) {
    const tableRow = tableRows?.item(i);
    const rowHeader = tableRow?.querySelectorAll("td span")[0]?.innerHTML;
    const rowValue = tableRow?.querySelectorAll("td span")[1]
      ?.textContent as string;

    if (rowHeader === "Toss") {
      tossDetail = rowValue;
    }
    if (rowHeader === "Season") {
      season = rowValue;
    }
    if (rowHeader === "Series result") {
      seriesResult = rowValue;
    }
    if (rowHeader === "Series") {
      series = rowValue;
    }
    if (rowHeader === "Player Of The Match") {
      playerOfTheMatch = rowValue;
      potmHref = tableRow?.querySelector("td a")?.getAttribute("href") || "";
      potmTeamName =
        tableRow?.querySelector("td img")?.getAttribute("alt") || "";
    }
    if (rowHeader === "Match number") {
      matchNo = rowValue;
    }
    if (rowHeader === "Match days") {
      matchDays = rowValue;
    }
    if (rowHeader === "TV Umpire") {
      tvUmpire = rowValue;
    }
    if (rowHeader === "Reserve Umpire") {
      reserveUmpire = rowValue;
    }
    if (rowHeader === "Match Referee") {
      matchReferee = rowValue;
    }
    if (rowHeader === "Umpires") {
      const umpiresRows = tableRow?.querySelectorAll("td span");
      umpiresRows?.forEach(
        (x, i) => i > 0 && umpires.push(x?.textContent as string)
      );
      umpires = Array.from(new Set(umpires));
    }
    if (rowHeader === "Test debut") {
      const iDebutRows = tableRow?.querySelectorAll("td span");
      iDebutRows?.forEach(
        (x, i) => i > 0 && internationalDebut.push(x?.textContent as string)
      );
      internationalDebut = Array.from(new Set(internationalDebut));
    }
    if (rowHeader === "T20 debut") {
      const debutRows = tableRow?.querySelectorAll("td span");
      debutRows?.forEach(
        (x, i) => i > 0 && formatDebut.push(x?.textContent as string)
      );
      formatDebut = Array.from(new Set(formatDebut));
    }
  }

  const cricketMatch: CricketMatchTest = {
    matchUuid: "",
    season,
    series,
    seriesResult,
    playerOfTheMatch: {
      playerName: playerOfTheMatch,
      href: potmHref,
      teamName: potmTeamName,
    },
    matchNo,
    matchDays,
    matchTitle: `${team1Name} vs ${team2Name}`,
    venue: tableData?.querySelector("span")?.innerHTML as string,
    matchDate: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    tossWinner: tossDetail.split(",")[0],
    tossDecision: tossDetail,
    result: headerData?.querySelector("p > span")?.innerHTML as string,
    matchSquad,
    pointsTable,
    team1: {
      teamName: team1Name,
      team: {
        name: team1Name,
        uuid: "",
        logoUrl: `http://localhost:3012/images-team-logos/${
          config.language === "hindi"
            ? teamLogos
                .find((x) => x.hindiTeamName === team1Name)
                ?.teamName?.replaceAll(" ", "-")
            : team1Name?.replaceAll(" ", "-")
        }.png`,
      },
      inning1: {
        battingScorecard: [],
        bowlingScorecard: [],
        extras: "",
        fallOfWickets: [],
        didNotBat: [],
        totalScore: "",
      },
      inning2: {
        battingScorecard: [],
        bowlingScorecard: [],
        extras: "",
        fallOfWickets: [],
        didNotBat: [],
        totalScore: "",
      },
    },
    team2: {
      teamName: team2Name,
      team: {
        name: team2Name,
        uuid: "",
        logoUrl: `http://localhost:3012/images-team-logos/${
          config.language === "hindi"
            ? teamLogos
                .find((x) => x.hindiTeamName === team2Name)
                ?.teamName?.replaceAll(" ", "-")
            : team2Name?.replaceAll(" ", "-")
        }.png`,
      },
      inning1: {
        battingScorecard: [],
        bowlingScorecard: [],
        extras: "",
        fallOfWickets: [],
        didNotBat: [],
        totalScore: "",
      },
      inning2: {
        battingScorecard: [],
        bowlingScorecard: [],
        extras: "",
        fallOfWickets: [],
        didNotBat: [],
        totalScore: "",
      },
    },
    tvUmpire,
    matchReferee,
    reserveUmpire,
    umpires,
    formatDebut,
    internationalDebut,
  };

  const setTeamScoreData = (
    tablesTeamData: NodeListOf<Element>[],
    teamName: string
  ) => {
    const teamDetails = [cricketMatch.team1, cricketMatch.team2].find(
      (x) => x.teamName === teamName
    );

    //1st Inning

    tablesTeamData[0]
      ?.item(0)
      ?.querySelectorAll("tbody tr")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !pName.includes("TOTAL") &&
          !pName.includes("Fall of wickets:") &&
          !pName.includes("Extras") &&
          (!pName.includes("Did not bat:") || !pName.includes("Yet to bat:")) &&
          pName.length > 0 &&
          teamDetails?.inning1.battingScorecard.push({
            playerName: {
              name: pName,
              href: pHref,
            },
            outStatus: scoreSelector[1]?.textContent as string,
            runsScored: parseInt(
              tr?.querySelector("td strong")?.textContent as string
            ),
            ballsFaced: parseInt(scoreSelector[3]?.textContent as string),
            minutes: parseInt(scoreSelector[4]?.textContent as string),
            fours: parseInt(scoreSelector[5]?.textContent as string),
            sixes: parseInt(scoreSelector[6]?.textContent as string),
          } as Batsman);

        if ((pName.includes("TOTAL") || pName === "कुल") && teamDetails) {
          teamDetails.inning1["totalScore"] = `${
            scoreSelector?.item(2)?.textContent
          }::${scoreSelector?.item(1)?.textContent}`;
        }

        if (pName.includes("Extra") && teamDetails) {
          teamDetails.inning1["extras"] =
            scoreSelector?.item(2)?.textContent || "";
        }

        if (pName.includes("Fall of wickets:") && teamDetails) {
          scoreSelector
            ?.item(0)
            ?.querySelectorAll("span")
            .forEach((x, i) => {
              i === 0 &&
                teamDetails.inning1["fallOfWickets"].push(
                  x?.textContent as string
                );
              i > 0 &&
                teamDetails.inning1["fallOfWickets"].push(
                  x?.textContent?.slice(2) as string
                );
            });
        }

        if (
          (pName.includes("Did not bat:") || pName.includes("Yet to bat:")) &&
          teamDetails
        ) {
          scoreSelector
            ?.item(0)
            ?.querySelectorAll("a")
            .forEach((x) => {
              const dnpPlayerName = x
                ?.querySelector("span")
                ?.textContent?.replace(",", "")
                .trim() as string;
              const href = x?.getAttribute("href") as string;
              teamDetails.inning1["didNotBat"]
                .map((x) => x.name)
                ?.indexOf(dnpPlayerName) === -1 &&
                teamDetails.inning1["didNotBat"].push({
                  name: dnpPlayerName,
                  href,
                });
            });
        }
      });

    tablesTeamData[0]
      ?.item(1)
      ?.querySelectorAll("tbody tr:not(.ds-hidden)")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !pName.includes("Team:") &&
          teamDetails?.inning1.bowlingScorecard.push({
            playerName: {
              name: pName,
              href: pHref,
            },
            oversBowled: parseFloat(scoreSelector[1]?.textContent as string),
            maidens: parseInt(scoreSelector[2]?.textContent as string),
            runsConceded: parseInt(scoreSelector[3]?.textContent as string),
            wickets: parseInt(
              tr?.querySelector("td strong")?.textContent as string
            ),
            dots: parseInt(scoreSelector[6]?.textContent as string),
            fours: parseInt(scoreSelector[7]?.textContent as string),
            sixes: parseInt(scoreSelector[8]?.textContent as string),
            wideBall: parseInt(scoreSelector[9]?.textContent as string),
            noBall: parseInt(scoreSelector[10]?.textContent as string),
          } as Bowler);
      });

    //2nd Inning

    tablesTeamData[1]
      ?.item(0)
      ?.querySelectorAll("tbody tr")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !pName.includes("TOTAL") &&
          !pName.includes("Fall of wickets:") &&
          !pName.includes("Extras") &&
          (!pName.includes("Did not bat:") || !pName.includes("Yet to bat:")) &&
          pName.length > 0 &&
          teamDetails?.inning2.battingScorecard.push({
            playerName: {
              name: pName,
              href: pHref,
            },
            outStatus: scoreSelector[1]?.textContent as string,
            runsScored: parseInt(
              tr?.querySelector("td strong")?.textContent as string
            ),
            ballsFaced: parseInt(scoreSelector[3]?.textContent as string),
            minutes: parseInt(scoreSelector[4]?.textContent as string),
            fours: parseInt(scoreSelector[5]?.textContent as string),
            sixes: parseInt(scoreSelector[6]?.textContent as string),
          } as Batsman);

        if ((pName.includes("TOTAL") || pName === "कुल") && teamDetails) {
          teamDetails.inning2["totalScore"] = `${
            scoreSelector?.item(2)?.textContent
          }::${scoreSelector?.item(1)?.textContent}`;
        }

        if (pName.includes("Extra") && teamDetails) {
          teamDetails.inning2["extras"] =
            scoreSelector?.item(2)?.textContent || "";
        }

        if (pName.includes("Fall of wickets:") && teamDetails) {
          scoreSelector
            ?.item(0)
            ?.querySelectorAll("span")
            .forEach((x, i) => {
              i === 0 &&
                teamDetails.inning2["fallOfWickets"].push(
                  x?.textContent as string
                );
              i > 0 &&
                teamDetails.inning2["fallOfWickets"].push(
                  x?.textContent?.slice(2) as string
                );
            });
        }

        if (
          (pName.includes("Did not bat:") || pName.includes("Yet to bat:")) &&
          teamDetails
        ) {
          scoreSelector
            ?.item(0)
            ?.querySelectorAll("a")
            .forEach((x) => {
              const dnpPlayerName = x
                ?.querySelector("span")
                ?.textContent?.replace(",", "")
                .trim() as string;
              const href = x?.getAttribute("href") as string;
              teamDetails.inning2["didNotBat"]
                .map((x) => x.name)
                ?.indexOf(dnpPlayerName) === -1 &&
                teamDetails.inning2["didNotBat"].push({
                  name: dnpPlayerName,
                  href,
                });
            });
        }
      });

    tablesTeamData[1]
      ?.item(1)
      ?.querySelectorAll("tbody tr:not(.ds-hidden)")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !pName.includes("Team:") &&
          teamDetails?.inning2.bowlingScorecard.push({
            playerName: {
              name: pName,
              href: pHref,
            },
            oversBowled: parseFloat(scoreSelector[1]?.textContent as string),
            maidens: parseInt(scoreSelector[2]?.textContent as string),
            runsConceded: parseInt(scoreSelector[3]?.textContent as string),
            wickets: parseInt(
              tr?.querySelector("td strong")?.textContent as string
            ),
            dots: parseInt(scoreSelector[6]?.textContent as string),
            fours: parseInt(scoreSelector[7]?.textContent as string),
            sixes: parseInt(scoreSelector[8]?.textContent as string),
            wideBall: parseInt(scoreSelector[9]?.textContent as string),
            noBall: parseInt(scoreSelector[10]?.textContent as string),
          } as Bowler);
      });
  };

  setTeamScoreData(tablesTeam1Data, team1Name);
  setTeamScoreData(tablesTeam2Data, team2Name);

  console.log(cricketMatch);

  return cricketMatch;
};
