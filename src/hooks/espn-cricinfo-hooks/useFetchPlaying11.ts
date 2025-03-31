import { useQuery } from "react-query";
import { MatchSquad } from "../../models/espn-cricinfo-models/CricketMatch";
import { SetTeamLogoUrl } from "./useFetchMatchByUrl";
import { fetchESPNCricInfoContent } from "./fetcherFunctions";

export const useFetchPlaying11 = (url: string, isEnabled: boolean) => {
  const playing11Url = `${url}/match-playing-xi`;

  const { data: playing11Data } = useQuery(
    [playing11Url, "match-playing-xi"],
    () => fetchESPNCricInfoContent(playing11Url),
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
  const team1Name = thSelector?.item(1)?.textContent;
  const team2Name = thSelector?.item(2)?.textContent;

  const matchSquad: MatchSquad = {
    team1SquadInfo: {
      teamName: team1Name || "",
      teamLogoUrl: SetTeamLogoUrl(team1Name || ""),
      teamSquad: [],
    },
    team2SquadInfo: {
      teamName: team2Name || "",
      teamLogoUrl: SetTeamLogoUrl(team2Name || ""),
      teamSquad: [],
    },
  };

  trSelector?.forEach((tr) => {
    const team1PlayerAnchor = tr
      ?.querySelectorAll("td")
      .item(1)
      ?.querySelector("a");
    matchSquad.team1SquadInfo.teamSquad.push({
      player: {
        name: team1PlayerAnchor?.textContent?.trim() || "unknown",
        href: team1PlayerAnchor?.getAttribute("href") || "",
      },
      role: tr?.querySelectorAll("td p").item(0)?.textContent || "",
    });

    const team2PlayerAnchor = tr
      ?.querySelectorAll("td")
      .item(2)
      ?.querySelector("a");

    matchSquad.team2SquadInfo.teamSquad.push({
      player: {
        name: team2PlayerAnchor?.textContent?.trim() || "unknown",
        href: team2PlayerAnchor?.getAttribute("href") || "",
      },
      role: tr?.querySelectorAll("td p").item(1)?.textContent || "",
    });
  });

  return matchSquad;
};
