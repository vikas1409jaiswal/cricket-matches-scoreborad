import React, { useRef } from "react";
import { CricketMatch } from "../../models/espn-cricinfo-models/CricketMatchModels";

import "./YoutubePlanner.scss";
import { useBestTitle } from "../../hooks/open-ai-hooks/useBestTitle";

interface YoutubePlannerProps {
  matchInfo: CricketMatch;
}

export const YoutubePlanner: React.FC<YoutubePlannerProps> = ({
  matchInfo,
}) => {
  const { bestTitle, fetchBestTitle } = useBestTitle(
    matchInfo.matchTitle,
    matchInfo.team1.teamName,
    matchInfo.team2.teamName
  );
  const titleText = `${matchInfo.matchTitle}`;
  const descText = `${matchInfo.matchTitle}\n\ndesc`;
  const tagsText = `#${matchInfo.team1.teamName
    ?.replaceAll(" ", "")
    ?.toLowerCase()} #${matchInfo.team2.teamName
    ?.replaceAll(" ", "")
    ?.toLowerCase()} #dataplusanimationhd #cricketnewsupdates`;

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const handleCopyToClipboard = (
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (ref.current) {
      ref.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="yt-planner">
      <div className="section">
        <h3>Title</h3>
        <input
          ref={titleRef}
          value={titleText}
          readOnly
          style={{ width: "800px" }}
        />
        <button onClick={async () => await fetchBestTitle()}>
          Fetch Title
        </button>
        <button onClick={() => handleCopyToClipboard(titleRef)}>
          Copy Title
        </button>
      </div>
      <div className="section">
        <h3>Description</h3>
        <textarea
          ref={descRef}
          value={descText}
          readOnly
          style={{ height: "200px", width: "800px" }}
        />
        <button onClick={() => handleCopyToClipboard(descRef)}>
          Copy Description
        </button>
      </div>
      <div className="section">
        <h3>Tags</h3>
        <input
          ref={tagsRef}
          value={tagsText}
          readOnly
          style={{ width: "800px" }}
        />
        <button onClick={() => handleCopyToClipboard(tagsRef)}>
          Copy Tags
        </button>
      </div>
    </div>
  );
};
