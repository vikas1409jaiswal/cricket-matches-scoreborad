import React, { useEffect } from "react";
import { TeamSquadInfo } from "../../../models/espn-cricinfo-models/CricketMatchModels";
import { config } from "../../../configs";

interface ThumbnailRenderProps {
  matchTitle: string;
  team1SquadInfo: TeamSquadInfo;
  team2SquadInfo: TeamSquadInfo;
}

export const ThumbnailRender: React.FC<ThumbnailRenderProps> = ({
  matchTitle,
  team1SquadInfo,
  team2SquadInfo,
}) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const c = canvas?.getContext("2d") as CanvasRenderingContext2D;

  const captainImageUrl = (teamSquadInfo: TeamSquadInfo) => {
    return `http://localhost:3012/images/${teamSquadInfo.teamName
      ?.toLowerCase()
      ?.replaceAll(" ", "-")}/${
      teamSquadInfo.teamSquad
        .find((x) => x.player.name.includes("(c)"))
        ?.player.href?.split("/")[2]
    }.png`;
  };

  const teamImageUrl = (teamName: string) =>
    `http://localhost:3012/images-team-logos/${teamName?.replaceAll(
      " ",
      "-"
    )}.png`;

  if (c) {
    canvas.width = config.pageSize.width;
    canvas.height = config.pageSize.height;

    addLinearGradient(c, canvas, 90);
    addTitle(c, matchTitle);

    //PlayerImages
    addImageToCanvas(c, captainImageUrl(team1SquadInfo), -50, 300, 600, 700);
    addImageToCanvas(c, captainImageUrl(team2SquadInfo), 975, 300, 600, 700);

    const teamImageSize = {
      height: 350,
      width: 350,
    };

    //TeamImages
    addImageToCanvas(
      c,
      teamImageUrl(team1SquadInfo.teamName),
      500,
      500,
      teamImageSize.width,
      teamImageSize.height
    );
    addImageToCanvas(
      c,
      teamImageUrl(team2SquadInfo.teamName),
      800,
      500,
      teamImageSize.width,
      teamImageSize.height
    );
  }

  return <canvas width={300} height={200}></canvas>;
};

const addLinearGradient = (
  c: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  angleInDegrees: number
) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  const x1 = canvas.width * Math.cos(angleInRadians);
  const y1 = canvas.height * Math.sin(angleInRadians);

  const gradient = c.createLinearGradient(0, 0, x1, y1);
  gradient.addColorStop(1, "darkblue");
  gradient.addColorStop(0, "cyan");

  c.fillStyle = gradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const addTitle = (c: CanvasRenderingContext2D, matchTitle: string) => {
  const [line1Text, line2Text] = matchTitle.toUpperCase().split("VS");

  const marginTop = 120;

  c.font = "110px Arial Black";
  c.fillStyle = "#fff";
  c.shadowColor = "black";
  c.shadowBlur = 20;
  c.shadowOffsetX = 10;
  c.shadowOffsetY = 10;
  c.fillText(`${line1Text} vs`, 60, marginTop);
  c.fillText(line2Text, 30, marginTop + 140);
};

const addImageToCanvas = (
  c: CanvasRenderingContext2D,
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const image = new Image();

  image.src = imageUrl;

  // Draw the image onto the canvas once it's loaded
  image.onload = () => {
    c.shadowColor = "white";
    c.shadowBlur = 30;
    c.shadowOffsetX = 10;
    c.shadowOffsetY = 10;
    c.drawImage(image, x, y, width, height);
  };
};
