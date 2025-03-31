import React, { useState } from "react";
import { CricketMatchDetails } from "./CricketMatchDetails";
import $ from "jquery";
import { TestCricketMatchDetails } from "./TestCricketMatchDetails";
import { MatchConfigs, MatchConfigurations } from "./MatchConfigurations";
import { Format } from "../models/enums/CricketFormat";

interface CricketMatchHomePageProps {
  format: Format;
}

export const CricketMatchHomePage: React.FC<CricketMatchHomePageProps> = ({
  format,
}) => {
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
      if (event.originalEvent?.key === "Enter" && matchConfigs.length > 0) {
        setDisplayInfo(true);
      }

      if (event.originalEvent?.key === "p") {
        setSelectedScreenIndex(10);
      }

      if (event.originalEvent?.key === "t") {
        setSelectedScreenIndex(11);
      }

      if (event.originalEvent?.key === "u") {
        setSelectedScreenIndex(0);
      }
    },
  });

  return (
    <>
      {!isDisplayInfo && (
        <MatchConfigurations setMatchConfigs={setMatchConfigs} />
      )}
      {isDisplayInfo && format === Format.TEST_CRICKET && (
        <TestCricketMatchDetails
          selectedScreenIndex={selectedScreenIndex}
          matchConfigs={matchConfigs[0]}
        />
      )}
      {isDisplayInfo &&
        (format === Format.ODI || format === Format.T20_INTERNATIONAL) && (
          <CricketMatchDetails
            selectedScreenIndex={selectedScreenIndex}
            format={format}
            matchConfigs={matchConfigs[0]}
          />
        )}
    </>
  );
};
