import { config } from "../configs";
import etohjson from "./../../src/data/StaticData/englishToHindi.json";

export const toCapitalCase = (inputString: string) => {
  let words = inputString?.split(" ");

  let capitalizedWords = words?.map((word) => {
    if (word.length > 0) {
      return word[0]?.toUpperCase() + word?.slice(1)?.toLowerCase();
    } else {
      return "";
    }
  });

  return capitalizedWords?.join(" ");
};

const playerArr: string[] = [];

export const getNameFromHref = (
  href: string,
  lang: string = config.language,
  splitLength?: number
) => {
  const nameStr = href?.split("/")[2];
  const nameArr = nameStr?.split("-");
  nameArr?.pop();
  const engName =
    nameArr?.length > 0
      ? nameArr
          .map((x, i, a) =>
            i !== a?.length - 1 && a.join(" ")?.length > (splitLength || 14)
              ? `${x[0]}.`
              : x
          )
          ?.join(" ")
      : "";

  const hindiName = (etohjson as any)[nameArr?.join(" ")];

  hindiName === undefined && playerArr.push(nameArr?.join(" "));

  return (lang === "hindi" ? hindiName : toCapitalCase(engName)) as string;
};

export const downloadImage = (url: string, filename: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();

      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Error downloading the image:", error.message);
    });
};
