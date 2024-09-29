import React, { Dispatch, SetStateAction, useState } from "react";
import { Format } from "../models/enums/CricketFormat";

import "./MatchConfigurations.scss";

enum SeriesType {
  BILATERAL = "bi-lateral",
  TOURNAMENT = "tournament",
}

const domesticTournaments: string[] = [
  "Caribbean premier league 2024",
  "Big bash league 2024/25",
  "Indian premier league 2025",
  "Pakistan super league 2025",
  "SA20 league 2025",
  "Lanka premier league 2025",
];

const internationalODITournaments: string[] = [
  "ICC Men's Cricket World Cup League 2 2023-2027",
];

const internationalT20Tournaments: string[] = ["Canada T20 Tri-Series"];

const venueCountries = [
  "Australia",
  "Bangladesh",
  "Canada",
  "England",
  "India",
  "Ireland",
  "Namibia",
  "New Zealand",
  "Pakistan",
  "South Africa",
  "Sri Lanka",
  "UAE",
  "USA",
  "West Indies",
];

export interface MatchConfigs {
  matchUrl: string;
  format: Format;
  seriesType: SeriesType;
  numberOfMatches: number;
  currMatchNumber: number;
  domesticTournament: string;
  matchBrief: string;
  venueCountry: string;
  matchSpeech: string;
}

interface MatchConfigurationsProps {
  setMatchConfigs: Dispatch<SetStateAction<MatchConfigs[]>>;
}

export const MatchConfigurations: React.FC<MatchConfigurationsProps> = ({
  setMatchConfigs,
}) => {
  const [matchUrl, setMatchUrl] = useState<string>();
  const [format, setFormat] = useState<Format>(Format.ODI);
  const [seriesType, setSeriesType] = useState<SeriesType>(
    SeriesType.BILATERAL
  );
  const [numberOfMatches, setNumberOfMatches] = useState<number>(3);
  const [domesticTournament, setDomesticTournament] = useState<string>(
    domesticTournaments[0]
  );
  const [internationalODITournament, setInternationalODITournament] =
    useState<string>(internationalODITournaments[0]);
  const [internationalT20Tournament, setInternationalT20Tournament] =
    useState<string>(internationalT20Tournaments[0]);
  const [venueCountry, setVenueCountry] = useState<string>(venueCountries[0]);
  const [currMatchNumber, setCurrMatchNumber] = useState<string>("1");

  const handleSubmit = () => {
    const formatBriefs = new Map<Format, string>([
      [Format.ODI, "ODI"],
      [Format.T20_INTERNATIONAL, "T20I"],
      [Format.TEST_CRICKET, "Test"],
      [Format.T20_DOMESTIC, "T20"],
    ]);
    const unitPlace = parseInt(currMatchNumber) % 10;
    let currMatchNumberSuffix = "th";
    switch (unitPlace) {
      case 1:
        currMatchNumberSuffix = "st";
        break;
      case 2:
        currMatchNumberSuffix = "nd";
        break;
      case 3:
        currMatchNumberSuffix = "rd";
        break;
    }
    const matchBrief = `${currMatchNumber}${currMatchNumberSuffix} ${formatBriefs.get(
      format
    )} Match`;
    const matchSpeech =
      seriesType === SeriesType.BILATERAL
        ? `${matchBrief} of ${numberOfMatches} match series`
        : "";
    const pSelector = document.getElementById("json-data");
    if (pSelector) {
      const json: MatchConfigs = {
        matchUrl: matchUrl as string,
        format,
        seriesType,
        numberOfMatches,
        currMatchNumber: parseInt(currMatchNumber),
        domesticTournament,
        matchBrief,
        matchSpeech,
        venueCountry: venueCountry === "West Indies" ? "" : `(${venueCountry})`,
      };
      setMatchConfigs([json]);
      pSelector.innerHTML = JSON.stringify(json);
    }
  };

  return (
    <div className="match-config-container">
      <div>
        <label>Match Url</label>
        <input value={matchUrl} onChange={(e) => setMatchUrl(e.target.value)} />
      </div>
      <div>
        <label>Format</label>
        <select
          onChange={(e) => {
            if (e.target.value === Format.T20_DOMESTIC) {
              setSeriesType(SeriesType.TOURNAMENT);
            }
            setFormat(e.target.value as Format);
          }}
          value={format}
        >
          <option value={Format.T20_INTERNATIONAL}>T20 International</option>
          <option value={Format.T20_DOMESTIC}>T20 Domestic</option>
          <option value={Format.ODI}>One-day International</option>
          <option value={Format.TEST_CRICKET}>Test Cricket</option>
        </select>
      </div>
      <div>
        <label>Series Type</label>
        <select
          onChange={(e) => setSeriesType(e.target.value as SeriesType)}
          value={seriesType}
        >
          {format !== Format.T20_DOMESTIC && (
            <option value={SeriesType.BILATERAL}>Bi-lateral</option>
          )}
          <option value={SeriesType.TOURNAMENT}>Tournament</option>
        </select>
      </div>
      {seriesType === SeriesType.BILATERAL && (
        <div>
          <label>Number of Matches</label>
          <select
            onChange={(e) => setNumberOfMatches(parseInt(e.target.value))}
            value={numberOfMatches}
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
      )}
      <div>
        <label>Current Match No.</label>
        <input
          onChange={(e) => setCurrMatchNumber(e.target.value)}
          value={currMatchNumber}
        />
      </div>
      {seriesType === SeriesType.TOURNAMENT &&
        format === Format.T20_DOMESTIC && (
          <div>
            <label>Tournaments</label>
            <select
              onChange={(e) => setDomesticTournament(e.target.value)}
              value={domesticTournament}
            >
              {domesticTournaments.map((t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      {seriesType === SeriesType.TOURNAMENT && format === Format.ODI && (
        <div>
          <label>Tournaments</label>
          <select
            onChange={(e) => setInternationalODITournament(e.target.value)}
            value={internationalODITournament}
          >
            {internationalODITournaments.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}
      {seriesType === SeriesType.TOURNAMENT &&
        format === Format.T20_INTERNATIONAL && (
          <div>
            <label>Tournaments</label>
            <select
              onChange={(e) => setInternationalT20Tournament(e.target.value)}
              value={internationalT20Tournament}
            >
              {internationalT20Tournaments.map((t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      <div>
        <label>Venue Country</label>
        <select
          onChange={(e) => setVenueCountry(e.target.value)}
          value={venueCountry}
        >
          {venueCountries.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
      </div>
      <button className="commit-config" onClick={handleSubmit}>
        Commit Configurations
      </button>
      <p id="json-data"></p>
    </div>
  );
};
