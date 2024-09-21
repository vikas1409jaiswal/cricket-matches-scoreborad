import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ApiData, ApiResponse } from "../../models/Api";

interface ESPNPlayerInfo {
  name: string;
  fullName: string;
  href: string;
  birth: string;
  died: string;
  teamNames: string[];
  battingStyle: string;
  bowlingStyle: string;
  playingRole: string;
  height: string;
  education: string;
}

const fetchESPNPlayeInfo = async (
  href: string
): Promise<AxiosResponse<ApiData>> => {
  return await axios.get(`https://www.espncricinfo.com${href}`);
};

export const useESPNPlayerInfo = (href: string): ESPNPlayerInfo => {
  const { data } = useQuery(["player-data", href], () =>
    fetchESPNPlayeInfo(href)
  );

  const divElement = document.createElement("div");
  divElement.innerHTML = (data as ApiResponse)?.data.toString() as string;

  const infoGridRows = divElement.querySelectorAll(".ds-p-4 .ds-grid > div");
  const teamNames = divElement
    .querySelectorAll(".ds-p-4 > div > div")
    ?.item(1)
    ?.querySelectorAll("a");

  const p: ESPNPlayerInfo = {
    name: "",
    fullName: "",
    href: "",
    birth: "",
    died: "",
    battingStyle: "",
    bowlingStyle: "",
    playingRole: "",
    height: "",
    education: "",
    teamNames: [],
  };

  infoGridRows.forEach((r) => {
    const pSelector = r.querySelector("p")?.textContent;
    const spanSelector = r.querySelector("span")?.textContent as string;
    if (pSelector === "Full Name") {
      p.fullName = spanSelector;
    }
    if (pSelector === "Born") {
      p.birth = spanSelector;
    }
    if (pSelector === "Died") {
      p.died = spanSelector;
    }
    if (pSelector === "Batting Style") {
      p.battingStyle = spanSelector;
    }
    if (pSelector === "Bowling Style") {
      p.bowlingStyle = spanSelector;
    }
    if (pSelector === "Playing Role") {
      p.playingRole = spanSelector;
    }
    if (pSelector === "Height") {
      p.height = spanSelector;
    }
    if (pSelector === "Education") {
      p.education = spanSelector;
    }
  });

  teamNames?.forEach((x) => p.teamNames.push(x?.textContent as string));

  let name = href?.split("/")[2]?.split("-");

  name?.pop();

  return {
    name: name?.join(" "),
    fullName: p.fullName,
    href,
    birth: p.birth,
    died: p.died,
    battingStyle: p.battingStyle,
    bowlingStyle: p.bowlingStyle,
    playingRole: p.playingRole,
    height: p.height,
    education: p.education,
    teamNames: p.teamNames,
  };
};
