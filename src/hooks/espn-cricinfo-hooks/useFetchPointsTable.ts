import { useQuery } from "react-query";
import { PointsTableRow } from "../../models/espn-cricinfo-models/PointsTable";
import { fetchESPNCricInfoContent } from "./fetcherFunctions";

const contentSelector = {
  mainTable: ".ds-w-full.ds-table > tbody > tr.ds-text-tight-s",
};

export const useFetchPointsTable = (url: string, isEnabled: boolean) => {
  const pointsTableUrl = `${url}/points-table-standings`;

  const { data: pointsTable } = useQuery(
    [pointsTableUrl, "points-table-standings"],
    () => fetchESPNCricInfoContent(pointsTableUrl),
    {
      enabled: isEnabled,
    }
  );

  const ptDivElement = document.createElement("div");

  ptDivElement.innerHTML = pointsTable?.data.toString() as string;

  const tableSelector = ptDivElement.querySelectorAll(
    contentSelector.mainTable
  );

  const pointsTableArr: PointsTableRow[] = [];

  tableSelector.forEach((tr) => {
    const tdsSelector = tr?.querySelectorAll("td");
    pointsTableArr.push({
      rank: parseInt(tr?.querySelector("td > a span")?.textContent || "0"),
      teamName: tr?.querySelector("td > a div")?.textContent || "",
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
