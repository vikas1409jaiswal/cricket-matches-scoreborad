import { TFunction } from "i18next";
import { config } from "../../configs";
import { PointsTableRow } from "../../models/espn-cricinfo-models/CricketMatchModels";
import { getNameFromHref } from "../../utils/ReusableFuctions";
import { speakText } from "../common/SpeakText";
import {
  TopCatchTaker,
  TopRunScorer,
  TopSixHitter,
  TopWicketTaker,
} from "../../hooks/espn-cricinfo-hooks/useFetchTopPlayers";

export const speeches = {
  "player-score-info": (
    playerName: string,
    runs: number | undefined,
    wickets: number | undefined
  ) => {
    const runSpeech =
      config.language === "hindi"
        ? runs
          ? `${runs} रन`
          : runs === 0
          ? 0
          : "बल्लेबाज़ी नहीं की"
        : runs
        ? `${runs} Runs`
        : runs === 0
        ? 0
        : "did not bat";
    const wickstSpeech =
      config.language === "hindi"
        ? wickets
          ? `${wickets} विकेट`
          : wickets === 0
          ? "0 विकेट"
          : ""
        : wickets
        ? `${wickets} Wickets`
        : wickets === 0
        ? "No Wicket"
        : "";
    speakText(
      `${playerName?.replace("(c)", "captain")}, ${runSpeech}, ${wickstSpeech}`
    );
  },
  "team-total-score-info": (
    teamName: string,
    [total, wickets, overs]: string[]
  ) => {
    if (config.language === "hindi") {
      speakText(
        `${teamName} कुल score,  ${parseFloat(
          overs
        )} ओवर में, ${total} रन, ${wickets} विकेट के नुकसान पर.`
      );
    } else {
      speakText(
        `${teamName} total inning score ${total} at loss of ${wickets} wickets, after ${overs}`
      );
    }
  },
  "match-result": (matchResult: string) => {
    speakText(`${matchResult
      ?.replace("(W)", "Women")
      ?.replace("WMN", "Women")
      ?.replace("S Africa", "South Africa")
      ?.replace("AUS", "Australia")
      ?.replace("NZ", "New Zealand")
      ?.replace("W Indies", "West Indies")}
      .`);
  },
  "potm-performance": (
    potmName: string,
    runs: number,
    balls: number,
    wickets: number,
    conceded: number
  ) => {
    const hasBatted = runs !== 0 && balls !== 0;
    const hasBowled = wickets !== 0 && conceded !== 0;
    if (config.language === "hindi") {
      const batPer = hasBatted ? `${runs} रन बनाये ${balls} गेंद मे` : "";
      const and = hasBatted && hasBowled ? " और " : "";
      const bowPer = hasBowled
        ? `${wickets} विकेट लिए ${conceded} रन देकर.`
        : "";
      speakText(
        `Player of the match, ${potmName}, इन्होने` + batPer + and + bowPer
      );
    } else {
      const batPer = hasBatted ? `${runs} runs in ${balls} balls` : "";
      const and = hasBatted && hasBowled ? " and " : "";
      const bowPer = hasBowled
        ? `${wickets} wickets conceding ${conceded} runs.`
        : "";
      speakText(`Player of the match, ${potmName} for` + batPer + and + bowPer);
    }
  },
  "series-result": (seriesResult: string) => {
    speakText(seriesResult);
  },
  "points-table-info": (pointsTableRows: PointsTableRow[]) => {
    if (config.language === "hindi") {
      speakText(
        `अंक तालिका, ${pointsTableRows[0].teamName} ${pointsTableRows[0].points} अंकों के साथ शीर्ष पर है.`
      );
    } else {
      speakText(
        `Points table, ${pointsTableRows[0].teamName} is at top position with ${pointsTableRows[0].points} Points in ${pointsTableRows[0].matches} matches.`
      );
      speakText(
        "If you liked our content then please like, share and subscribe."
      );
    }
  },
  top_5_run_scorers: (
    tournamentName: string,
    runScorers: TopRunScorer[],
    t: TFunction
  ) => {
    speakText(
      `${tournamentName} ${t("random_words.after_this_match")}, ${t(
        "cricket_terms.top_run_scorer"
      )?.replace("5 ", "")}: ${getNameFromHref(
        runScorers[0]?.player.href,
        "eng",
        30
      )}, ${runScorers[0]?.runs} ${t("cricket_terms.runs")}`
    );
  },
  top_5_wicket_takers: (wicketTakers: TopWicketTaker[], t: TFunction) => {
    speakText(
      `${t("cricket_terms.top_wicket_taker")?.replace(
        "5 ",
        ""
      )}: ${getNameFromHref(wicketTakers[0]?.player.href, "eng", 30)}, ${
        wicketTakers[0]?.wickets
      } ${t("cricket_terms.wickets")}`
    );
  },
  top_5_six_hitters: (mostSixes: TopSixHitter[], t: TFunction) => {
    speakText(
      `${t("cricket_terms.top_six_hitter")?.replace(
        "5 ",
        ""
      )}: ${getNameFromHref(mostSixes[0]?.player.href, "eng", 30)}, ${
        mostSixes[0]?.sixes
      } ${t("cricket_terms.sixes")}`
    );
  },
  top_5_catch_takers: (mostCatches: TopCatchTaker[], t: TFunction) => {
    speakText(
      `${t("cricket_terms.top_catch_taker")?.replace(
        "5 ",
        ""
      )}: ${getNameFromHref(mostCatches[0]?.player.href, "eng", 30)}, ${
        mostCatches[0]?.catches
      } ${t("cricket_terms.catches")}`
    );
  },
};
