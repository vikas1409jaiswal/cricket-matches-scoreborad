import { useQuery } from "react-query";
import { ApiData } from "../../models/Api";
import {
  Batsman,
  Bowler,
  CricketMatch,
  MatchSquad,
  PointsTableRow,
} from "../../models/espn-cricinfo-models/CricketMatchModels";
import axios, { AxiosResponse } from "axios";
import { config } from "../../configs";
import teamLogos from "./../../data/StaticData/teamLogos.json";

export const modifyTeamName = (teamName: string) => {
  let modTeamName = teamName
    ?.replace("U19s", "Under 19")
    ?.replace("Under-19s", "Under 19");
  switch (teamName) {
    case "Royals":
      modTeamName = "Barbados Royals Women";
      break;
    case "Warriors":
      modTeamName = "Guyana Amazon Warriors Women";
      break;
    case "Riders":
      modTeamName = "Trinbago Knight Riders Women";
      break;
  }
  return modTeamName;
};

const fetchCricketMatch = (url: string): Promise<AxiosResponse<ApiData>> => {
  return axios.get(`https://stats.espncricinfo.com${url}`);
};

export const useFetchPlaying11 = (url: string, isEnabled: boolean) => {
  const playing11Url = url.replace("full-scorecard", "match-playing-xi");
  //const playing11Url = url.replace("full-scorecard", "match-squads");

  const { data: playing11Data } = useQuery(
    [playing11Url],
    () => fetchCricketMatch(playing11Url),
    {
      enabled: isEnabled,
    }
  );

  const playing11DivElement = document.createElement("div");

  playing11DivElement.innerHTML = playing11Data?.data.toString() as string;

  const tableSelector = playing11DivElement.querySelector(
    ".ds-w-full.ds-table.ds-table-sm.ds-table-bordered.ds-border-collapse.ds-border.ds-border-line.ds-table-auto.ds-bg-fill-content-prime"
  );

  const thSelector = tableSelector?.querySelectorAll("thead th");
  const trSelector = tableSelector?.querySelectorAll("tbody > tr");
  const team1Name = modifyTeamName(thSelector?.item(1)?.textContent || "");
  const team2Name = modifyTeamName(thSelector?.item(2)?.textContent || "");

  const matchSquad: MatchSquad = {
    team1SquadInfo: {
      teamName: team1Name,
      teamLogoUrl: `http://localhost:3012/images-team-logos/${
        config.language === "hindi"
          ? teamLogos
              .find((x) => x.hindiTeamName === team1Name)
              ?.teamName?.replaceAll(" ", "-")
          : team1Name?.replaceAll(" ", "-")
      }.png`,
      teamSquad: [],
    },
    team2SquadInfo: {
      teamName: team2Name,
      teamLogoUrl: `http://localhost:3012/images-team-logos/${
        config.language === "hindi"
          ? teamLogos
              .find((x) => x.hindiTeamName === team2Name)
              ?.teamName?.replaceAll(" ", "-")
          : team2Name?.replaceAll(" ", "-")
      }.png`,
      teamSquad: [],
    },
  };

  trSelector?.forEach((tr) => {
    matchSquad.team1SquadInfo.teamSquad.push({
      player: {
        name:
          tr?.querySelectorAll("td a").item(0)?.textContent?.trim() ||
          "unknown",
        href: tr?.querySelectorAll("td a").item(0)?.getAttribute("href") || "",
      },
      role: tr?.querySelectorAll("td p").item(0)?.textContent || "",
    });

    matchSquad.team2SquadInfo.teamSquad.push({
      player: {
        name:
          tr?.querySelectorAll("td a").item(1)?.textContent?.trim() ||
          "unknown",
        href: tr?.querySelectorAll("td a").item(1)?.getAttribute("href") || "",
      },
      role: tr?.querySelectorAll("td p").item(1)?.textContent || "",
    });
  });

  return matchSquad;
};

export const useFetchPointsTable = (url: string, isEnabled: boolean) => {
  const pointsTableUrl = url.replace(
    "full-scorecard",
    "points-table-standings"
  );

  const { data: pointsTable } = useQuery(
    [pointsTableUrl],
    () => fetchCricketMatch(pointsTableUrl),
    {
      enabled: isEnabled,
    }
  );

  const ptDivElement = document.createElement("div");

  ptDivElement.innerHTML = pointsTable?.data.toString() as string;

  const tableSelector = ptDivElement.querySelectorAll(
    ".ds-w-full.ds-table > tbody > tr.ds-text-tight-s"
  );

  const pointsTableArr: PointsTableRow[] = [];

  tableSelector.forEach((tr) => {
    const tdsSelector = tr?.querySelectorAll("td");
    pointsTableArr.push({
      rank: parseInt(tr?.querySelector("td > a span")?.textContent || "0"),
      teamName: modifyTeamName(
        tr?.querySelector("td > a div")?.textContent || ""
      ),
      matches: parseInt(tdsSelector?.item(1).textContent as string),
      won: parseInt(tdsSelector?.item(2).textContent as string),
      lost: parseInt(tdsSelector?.item(3).textContent as string),
      tied: parseInt(tdsSelector?.item(4).textContent as string),
      noResult: parseInt(tdsSelector?.item(5).textContent as string),
      netRR: parseFloat(tdsSelector?.item(7).textContent as string),
      points: parseInt(tdsSelector?.item(6).textContent as string),
    });
  });

  return pointsTableArr;
};

export const useFetchMatchByUrl = (url: string): CricketMatch => {
  const { isLoading, data } = useQuery([url, "match-info"], () =>
    fetchCricketMatch(url)
  );

  const matchSquad = useFetchPlaying11(url, !isLoading);

  const pointsTable = useFetchPointsTable(url, !isLoading);

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const headerData = divElement.querySelector(
    ".ds-w-full .ds-text-compact-xxs"
  );
  const tableData = divElement.querySelector("table.ds-table.ds-table-sm");
  const tableRows = tableData?.querySelectorAll("tr");

  const teamsData = divElement.querySelectorAll(".ds-rounded-lg.ds-mt-2");

  const team1Data = teamsData[0];
  const team2Data = teamsData[1];
  const tablesTeam1Data = team1Data?.querySelectorAll("table.ds-w-full");
  const tablesTeam2Data = team2Data?.querySelectorAll("table.ds-w-full");

  const teamNames = headerData?.querySelectorAll(
    ".ci-team-score > div:first-child"
  );
  const team1Name = modifyTeamName(
    teamNames?.item(0)?.getAttribute("title") || ""
  );
  const team2Name = modifyTeamName(
    teamNames?.item(1)?.getAttribute("title") || ""
  );

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
    if (rowHeader === "Toss" || rowHeader === "टॉस") {
      tossDetail = rowValue;
    }
    if (rowHeader === "Season" || rowHeader === "सत्र") {
      season = rowValue;
    }
    if (rowHeader === "Series" || rowHeader === "सीरीज़") {
      series = rowValue;
    }
    if (rowHeader === "Series result" || rowHeader === "सीरीज़ परिणामx") {
      seriesResult = rowValue?.replace("P1ay-Off", "Play-Off");
    }
    if (
      rowHeader === "Player Of The Match" ||
      rowHeader === "प्लेयर ऑफ़ द मैच"
    ) {
      playerOfTheMatch = rowValue;
      potmHref = tableRow?.querySelector("td a")?.getAttribute("href") || "";
      potmTeamName =
        tableRow?.querySelector("td img")?.getAttribute("alt") || "";
    }
    if (rowHeader === "Match number" || rowHeader === "मैच नंबर") {
      matchNo = rowValue;
    }
    if (rowHeader === "Match days" || rowHeader === "मैच के दिन") {
      matchDays = rowValue;
    }
    if (rowHeader === "TV Umpire" || rowHeader === "टीवी अंपायर") {
      tvUmpire = rowValue;
    }
    if (rowHeader === "Reserve Umpire" || rowHeader === "रिज़र्व अंपायर") {
      reserveUmpire = rowValue;
    }
    if (rowHeader === "Match Referee" || rowHeader === "मैच रेफ़री") {
      matchReferee = rowValue;
    }
    if (rowHeader === "Umpires" || rowHeader === "अंपायर्स") {
      const umpiresRows = tableRow?.querySelectorAll("td span");
      umpiresRows?.forEach(
        (x, i) => i > 0 && umpires.push(x?.textContent as string)
      );
      umpires = Array.from(new Set(umpires));
    }
    if (rowHeader === "T20I debut" || rowHeader === "ODI debut") {
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

  const cricketMatch: CricketMatch = {
    matchUuid: "00000000-0000-0000-0000-000000000000",
    season,
    series,
    seriesResult,
    playerOfTheMatch: {
      playerName: playerOfTheMatch,
      href: potmHref,
      teamName:
        config.language === "hindi"
          ? team1Name?.includes(potmTeamName)
            ? team1Name
            : team2Name
          : team1Name?.includes(potmTeamName)
          ? team1Name?.replaceAll(" ", "-")
          : team2Name?.replaceAll(" ", "-"),
    },
    matchNo:
      matchNo ||
      (divElement?.querySelector("div.ds-p-0 div.ds-truncate")
        ?.textContent as string),
    matchDays,
    matchTitle: `${team1Name} vs ${team2Name}`,
    venue: tableData?.querySelector("span")?.innerHTML as string,
    matchDate: matchDays?.split(" - ")[0],
    tossWinner: modifyTeamName(tossDetail.split(",")[0]),
    tossDecision: tossDetail,
    result: headerData?.querySelector("p > span")?.innerHTML as string,
    matchSquad,
    pointsTable,
    team1: {
      teamName: team1Name,
      team: {
        name: team1Name,
        uuid: "00000000-0000-0000-0000-000000000000",
        logoUrl: `http://localhost:3012/images-team-logos/${
          config.language === "hindi"
            ? teamLogos
                .find((x) => x.hindiTeamName === team1Name)
                ?.teamName?.replaceAll(" ", "-")
            : team1Name?.replaceAll(" ", "-")
        }.png`,
      },
      battingScorecard: [],
      bowlingScorecard: [],
      extras: "",
      fallOfWickets: [],
      didNotBat: [],
      totalScore: "",
    },
    team2: {
      teamName: team2Name,
      team: {
        name: team2Name,
        uuid: "00000000-0000-0000-0000-000000000000",
        logoUrl: `http://localhost:3012/images-team-logos/${
          config.language === "hindi"
            ? teamLogos
                .find((x) => x.hindiTeamName === team2Name)
                ?.teamName?.replaceAll(" ", "-")
            : team2Name?.replaceAll(" ", "-")
        }.png`,
      },
      battingScorecard: [],
      bowlingScorecard: [],
      extras: "",
      fallOfWickets: [],
      didNotBat: [],
      totalScore: "",
    },
    tvUmpire,
    matchReferee,
    reserveUmpire,
    umpires,
    formatDebut,
    internationalDebut,
  };

  const setTeamScoreData = (
    tablesTeamData: NodeListOf<Element>,
    teamName: string
  ) => {
    const teamDetails = [cricketMatch.team1, cricketMatch.team2].find(
      (x) => x.teamName === teamName
    );

    tablesTeamData
      ?.item(0)
      ?.querySelectorAll("tbody tr")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !(pName.includes("Total") || pName === "कुल") &&
          !(
            pName.includes("Fall of wickets:") || pName?.includes("विकेट पतन:")
          ) &&
          !(pName.includes("Extras") || pName.includes("अतिरिक्त")) &&
          !(
            pName.includes("Did not bat:") ||
            pName.includes("बल्लेबाज़ी नहीं की:")
          ) &&
          !pName.includes("Yet to bat:") &&
          pName.length > 0 &&
          teamDetails?.battingScorecard.push({
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

        if ((pName.includes("Total") || pName === "कुल") && teamDetails) {
          teamDetails["totalScore"] = `${
            scoreSelector?.item(2)?.textContent
          }::${scoreSelector?.item(1)?.textContent}`;
        }

        if (
          (pName.includes("Extra") || pName.includes("अतिरिक्त")) &&
          teamDetails
        ) {
          teamDetails["extras"] = scoreSelector?.item(2)?.textContent || "";
        }

        if (
          (pName.includes("Fall of wickets:") ||
            pName?.includes("विकेट पतन:")) &&
          teamDetails
        ) {
          scoreSelector
            ?.item(0)
            ?.querySelectorAll("span")
            .forEach((x, i) => {
              i === 0 &&
                teamDetails["fallOfWickets"].push(x?.textContent as string);
              i > 0 &&
                teamDetails["fallOfWickets"].push(
                  x?.textContent?.slice(2) as string
                );
            });
        }

        if (
          (pName.includes("Did not bat:") ||
            pName.includes("बल्लेबाज़ी नहीं की:") ||
            pName.includes("Yet to bat:")) &&
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
              teamDetails["didNotBat"]
                .map((x) => x.name)
                ?.indexOf(dnpPlayerName) === -1 &&
                teamDetails["didNotBat"].push({
                  name: dnpPlayerName,
                  href,
                });
            });
        }
      });

    tablesTeamData
      ?.item(1)
      ?.querySelectorAll("tbody tr:not(.ds-hidden)")
      .forEach((tr) => {
        const scoreSelector = tr?.querySelectorAll(
          "td"
        ) as NodeListOf<HTMLTableCellElement>;
        const pName = tr?.querySelector("td")?.textContent as string;
        const pHref = tr?.querySelector("td a")?.getAttribute("href") as string;
        !pName.includes("Team:") &&
          teamDetails?.bowlingScorecard.push({
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

  return cricketMatch;
};
