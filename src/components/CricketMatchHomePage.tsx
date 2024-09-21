import React, { useState } from "react";
import { useFetchMatchesBySeason } from "./../hooks/espn-cricinfo-hooks/useFetchMatchesBySeason";
import { CricketMatch } from "./CricketMatch";
import $ from "jquery";
import { TestCricketMatch } from "./TestCricketMatch";
import { MatchConfigs, MatchConfigurations } from "./MatchConfigurations";
import { Format } from "../models/enums/CricketFormat";

interface CricketMatchHomePageProps {
  format: Format;
}

export const CricketMatchHomePage: React.FC<CricketMatchHomePageProps> = ({
  format,
}) => {
  const { allLoaded, cricketMatchesAll } = useFetchMatchesBySeason(format, [
    2023,
  ]);

  const allMatches = cricketMatchesAll[0]?.matchDetails;

  const [selectedMatchIndex, setSelectedMatchIndex] = useState(166);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [isDisplayInfo, setDisplayInfo] = useState(false);
  const [matchConfigs, setMatchConfigs] = useState<MatchConfigs[]>([]);

  // // Press => for next player & <= for previous player.
  $(document).on({
    keydown: (event) => {
      if (
        event.originalEvent?.key === "ArrowRight" &&
        selectedScreenIndex < 15
      ) {
        selectedScreenIndex !== 100
          ? setSelectedScreenIndex(selectedScreenIndex + 1)
          : setSelectedScreenIndex(selectedScreenIndex + 2);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "ArrowLeft" && selectedScreenIndex > 0) {
        setSelectedScreenIndex(selectedScreenIndex - 1);
        event.preventDefault();
      }
      if (
        event.originalEvent?.key === "ArrowUp" &&
        selectedMatchIndex < allMatches.length
      ) {
        setSelectedMatchIndex(selectedMatchIndex + 1);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "ArrowDown" && selectedMatchIndex > 0) {
        setSelectedMatchIndex(selectedMatchIndex - 1);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "Enter" && selectedMatchIndex > 0) {
        setDisplayInfo(true);
      }
    },
  });
  return (
    <>
      {allLoaded && !isDisplayInfo && (
        <MatchConfigurations setMatchConfigs={setMatchConfigs} />
      )}
      {isDisplayInfo && allLoaded && format === Format.TEST_CRICKET && (
        <TestCricketMatch
          selectedMatchUrl={allMatches[selectedMatchIndex]?.href}
          selectedScreenIndex={selectedScreenIndex}
          matchConfigs={matchConfigs[0]}
        />
      )}
      {isDisplayInfo &&
        allLoaded &&
        (format === Format.ODI || format === Format.T20_INTERNATIONAL) && (
          <CricketMatch
            selectedMatchUrl={allMatches[selectedMatchIndex]?.href}
            selectedScreenIndex={selectedScreenIndex}
            format={format}
            matchConfigs={matchConfigs[0]}
          />
        )}
    </>
  );
};
