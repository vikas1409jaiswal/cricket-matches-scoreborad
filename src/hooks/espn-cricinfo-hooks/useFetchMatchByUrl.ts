import { useQuery } from "react-query";
import {
  Batsman,
  Bowler,
  CricketMatch,
  Replacement,
  TeamScoreBoard,
} from "../../models/espn-cricinfo-models/CricketMatch";
import { config, Language } from "../../configs";
import teamLogos from "./../../data/StaticData/teamLogos.json";
import { useFetchPlaying11 } from "./useFetchPlaying11";
import { useFetchPointsTable } from "./useFetchPointsTable";
import { fetchESPNCricInfoContent } from "./fetcherFunctions";
import { ApiData } from "../../models/Api";
import { AxiosResponse } from "axios";
import { PlayerOfTheMatch } from "../../models/espn-cricinfo-models/CricketMatchBase";

const contentSelector = {
  matchBriefInfo: ".ds-w-full .ds-text-compact-xxs",
  matchDetailsInfo: "table.ds-table.ds-table-sm",
  inningScoreBoard: ".ds-rounded-lg.ds-mt-2",
};

export const SetTeamLogoUrl = (teamName: string) => {
  let modTeamName = teamName;

  if (config.language === Language.Hindi) {
    modTeamName =
      teamLogos.find((x) => x.hindiTeamName === teamName)?.teamName || "";
  }

  return `http://localhost:3012/images-team-logos/${modTeamName?.replaceAll(
    " ",
    "-"
  )}.png`;
};

const useHtmlContent = (data: AxiosResponse<ApiData, any> | undefined) => {
  const divElement = document.createElement("div");
  divElement.innerHTML = data?.data.toString() as string;

  const matchBriefInfoData = divElement.querySelector(
    contentSelector.matchBriefInfo
  );

  const matchDetailsInfoData = divElement.querySelector(
    contentSelector.matchDetailsInfo
  );

  const matchDetailsInfoRows = matchDetailsInfoData?.querySelectorAll("tr");

  const inningScoreBoardsData = divElement.querySelectorAll(
    contentSelector.inningScoreBoard
  );

  return {
    divElement,
    matchBriefInfoData,
    matchDetailsInfoData,
    matchDetailsInfoRows,
    inningScoreBoardsData,
  };
};

const useMatchDetailsHtmlContent = (
  matchDetailsInfoRows: NodeListOf<HTMLTableRowElement> | undefined
) => {
  type MatchDetailElement<T> = {
    value: T;
    rowHeader: string[];
  };

  type MatchDetailsData = {
    tossDetail: MatchDetailElement<string>;
    season: MatchDetailElement<string>;
    series: MatchDetailElement<string>;
    seriesResult: MatchDetailElement<string>;
    matchNo: MatchDetailElement<string>;
    matchDays: MatchDetailElement<string>;
    tvUmpire: MatchDetailElement<string>;
    matchReferee: MatchDetailElement<string>;
    reserveUmpire: MatchDetailElement<string>;
  };

  type MatchDetailsDataExtended = {
    playerOfTheMatch: MatchDetailElement<PlayerOfTheMatch>;
    umpires: MatchDetailElement<string[]>;
    formatDebut: MatchDetailElement<string[]>;
    internationalDebut: MatchDetailElement<string[]>;
    playerReplacement: MatchDetailElement<Replacement[]>;
  };

  const matchDetailsData: MatchDetailsData = {
    tossDetail: {
      value: "",
      rowHeader: ["Toss", "टॉस"],
    },
    season: {
      value: "",
      rowHeader: ["Season", "सत्र"],
    },
    series: {
      value: "",
      rowHeader: ["Series", "सीरीज़"],
    },
    seriesResult: {
      value: "",
      rowHeader: ["Series result", "सीरीज़ परिणाम"],
    },
    matchNo: {
      value: "",
      rowHeader: ["Match number", "मैच नंबर"],
    },
    matchDays: {
      value: "",
      rowHeader: ["Match days", "मैच के दिन"],
    },
    tvUmpire: {
      value: "",
      rowHeader: ["TV Umpire", "टीवी अंपायर"],
    },
    matchReferee: {
      value: "",
      rowHeader: ["Match Referee", "मैच रेफ़री"],
    },
    reserveUmpire: {
      value: "",
      rowHeader: ["Reserve Umpire", "रिज़र्व अंपायर"],
    },
  };

  const matchDetailsDataExtended: MatchDetailsDataExtended = {
    playerOfTheMatch: {
      value: {
        playerName: "",
        teamName: "",
        href: "",
      },
      rowHeader: ["Player Of The Match", "प्लेयर ऑफ़ द मैच"],
    },
    umpires: {
      value: [],
      rowHeader: ["Umpires", "अंपायर्स"],
    },
    formatDebut: {
      value: [],
      rowHeader: ["T20 debut"],
    },
    internationalDebut: {
      value: [],
      rowHeader: ["T20I debut", "ODI debut"],
    },
    playerReplacement: {
      value: [],
      rowHeader: ["Player Replacement", "प्लेयर रिप्लेसमेंट"],
    },
  };

  for (let i = 1; i < (matchDetailsInfoRows?.length as number); i++) {
    const tableRow = matchDetailsInfoRows?.item(i);
    const rowHeader = tableRow?.querySelectorAll("td span")[0]
      ?.innerHTML as string;
    const rowValue = tableRow?.querySelectorAll("td span")[1]
      ?.textContent as string;

    Object.keys(matchDetailsData).forEach((key) => {
      const fieldKey = key as keyof typeof matchDetailsData;
      const field = matchDetailsData[fieldKey];

      if (field?.rowHeader?.includes(rowHeader as string)) {
        matchDetailsData[fieldKey] = {
          ...field,
          value: rowValue as string,
        };
      }
    });

    if (
      matchDetailsDataExtended.playerOfTheMatch.rowHeader.includes(rowHeader)
    ) {
      let teamName = tableRow?.querySelector("td img")?.getAttribute("alt");
      teamName = teamLogos.find((x) => x.shortName === teamName)
        ?.teamName as string;

      matchDetailsDataExtended.playerOfTheMatch.value = {
        playerName: rowValue,
        href: tableRow?.querySelector("td a")?.getAttribute("href") || "",
        teamName,
      };
    }

    [
      matchDetailsDataExtended.umpires,
      matchDetailsDataExtended.internationalDebut,
      matchDetailsDataExtended.formatDebut,
    ].forEach((arr) => {
      if (arr.rowHeader.includes(rowHeader)) {
        const xRows = tableRow?.querySelectorAll("td span");
        xRows?.forEach(
          (x, i) => i > 0 && arr.value.push(x?.textContent as string)
        );
        arr.value = Array.from(new Set(arr.value));
      }
    });

    if (
      matchDetailsDataExtended.playerReplacement.rowHeader.some((pr) =>
        rowHeader.includes(pr)
      )
    ) {
      const playerHrefs = tableRow?.querySelectorAll("a");
      matchDetailsDataExtended.playerReplacement.value.push({
        teamName: rowHeader.split("-->")[0],
        inPlayerHref: playerHrefs?.item(0)?.getAttribute("href") as string,
        outPlayerHref: playerHrefs?.item(1)?.getAttribute("href") as string,
      });
    }
  }

  return {
    ...matchDetailsData,
    ...matchDetailsDataExtended,
  };
};

const setTeamScoreData = (
  tablesTeamData: NodeListOf<Element>,
  teamDetails: TeamScoreBoard
) => {
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
          pName.includes("Did not bat:") || pName.includes("बल्लेबाज़ी नहीं की:")
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
        teamDetails["totalScore"] = `${scoreSelector?.item(2)?.textContent}::${
          scoreSelector?.item(1)?.textContent
        }`;
      }

      if (
        (pName.includes("Extra") || pName.includes("अतिरिक्त")) &&
        teamDetails
      ) {
        teamDetails["extras"] = scoreSelector?.item(2)?.textContent || "";
      }

      if (
        (pName.includes("Fall of wickets:") || pName?.includes("विकेट पतन:")) &&
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

export const useFetchMatchByUrl = (url: string): CricketMatch => {
  const { isLoading, data } = useQuery([url, "full-scoreboard"], () =>
    fetchESPNCricInfoContent(`${url}/full-scorecard`)
  );

  const matchSquad = useFetchPlaying11(url, !isLoading);

  const pointsTable = useFetchPointsTable(url, !isLoading);

  const {
    divElement,
    matchBriefInfoData,
    matchDetailsInfoData,
    matchDetailsInfoRows,
    inningScoreBoardsData,
  } = useHtmlContent(data);

  const {
    season,
    series,
    seriesResult,
    playerOfTheMatch,
    matchNo,
    matchDays,
    tossDetail,
    tvUmpire,
    reserveUmpire,
    matchReferee,
    umpires,
    formatDebut,
    internationalDebut,
    playerReplacement,
  } = useMatchDetailsHtmlContent(matchDetailsInfoRows);

  const firstTeamISBData = inningScoreBoardsData[0];
  const secondTeamISBData = inningScoreBoardsData[1];

  const firstTeamISBTable =
    firstTeamISBData?.querySelectorAll("table.ds-w-full");
  const secondTeamISBTable =
    secondTeamISBData?.querySelectorAll("table.ds-w-full");

  const teamNames = matchBriefInfoData?.querySelectorAll(
    ".ci-team-score > div:first-child"
  );

  const team1Name = teamNames?.item(0)?.getAttribute("title") as string;
  const team2Name = teamNames?.item(1)?.getAttribute("title") as string;

  const cricketMatch: CricketMatch = {
    matchUuid: "9faaf4c6-9446-47b2-b6db-7f84ca6c9c31",
    season: season.value,
    series: series.value,
    seriesResult: seriesResult.value,
    playerOfTheMatch: playerOfTheMatch.value,
    matchNumber:
      matchNo.value ||
      (divElement?.querySelector("div.ds-p-0 div.ds-truncate")
        ?.textContent as string),
    matchDays: matchDays.value,
    matchTitle: `${team1Name} vs ${team2Name}`,
    venue: matchDetailsInfoData?.querySelector("span")?.innerHTML as string,
    tossWinner: tossDetail.value.split(",")[0],
    tossDecision: tossDetail.value,
    result: matchBriefInfoData?.querySelector("p > span")?.innerHTML as string,
    matchSquad,
    pointsTable,
    team1: {
      teamName: team1Name,
      team: {
        name: team1Name,
        uuid: "292de29f-cca2-4762-a477-dec18a698d08",
        logoUrl: SetTeamLogoUrl(team1Name),
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
        uuid: "6e2f86fb-1432-4954-a9eb-fb771b7158d6",
        logoUrl: SetTeamLogoUrl(team2Name),
      },
      battingScorecard: [],
      bowlingScorecard: [],
      extras: "",
      fallOfWickets: [],
      didNotBat: [],
      totalScore: "",
    },
    tvUmpire: tvUmpire.value,
    matchReferee: matchReferee.value,
    reserveUmpire: reserveUmpire.value,
    umpires: umpires.value,
    formatDebut: formatDebut.value,
    internationalDebut: internationalDebut.value,
    playerReplacement: playerReplacement.value,
  };

  setTeamScoreData(firstTeamISBTable, cricketMatch.team1);
  setTeamScoreData(secondTeamISBTable, cricketMatch.team2);

  return cricketMatch;
};
