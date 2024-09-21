import { useQuery } from "react-query";
import { ApiData } from "../../models/Api";
import {
  Batsman,
  Bowler,
  CricketMatch,
} from "../../models/espn-cricinfo-models/CricketMatchModels";
import axios, { AxiosResponse } from "axios";

const fetchCricketMatchStats = (
  url: string
): Promise<AxiosResponse<ApiData>> => {
  return axios.get(`https://stats.espncricinfo.com${url}`);
};

export const useFetchMatchStatsByUrl = (url: string) => {
  const statsUrl = url.replace("full-scorecard", "match-overs-comparison");
  const { data } = useQuery([statsUrl], () => fetchCricketMatchStats(statsUrl));

  const divElement = document.createElement("div");

  divElement.innerHTML = data?.data.toString() as string;

  const chartsSelector = divElement.querySelectorAll(
    ".ds-fill-[transparent] .ds-stroke-ui-stroke .ds-stroke-1"
  );

  console.log(chartsSelector.item(0)?.innerHTML);

  return divElement;
};
