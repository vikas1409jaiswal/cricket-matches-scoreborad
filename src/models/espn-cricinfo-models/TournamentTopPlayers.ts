import { Player } from "./CricketMatch";

export interface PlayerStatsTournament {
  player: Player;
  matches: number;
}

export interface TopRunScorerTournament extends PlayerStatsTournament {
  runs: number;
}

export interface TopWicketTakerTournament extends PlayerStatsTournament {
  wickets: number;
}

export interface TopSixHitterTournament extends PlayerStatsTournament {
  sixes: number;
}

export interface TopCatchTakerTournament extends PlayerStatsTournament {
  catches: number;
}

export interface TopPlayers {
  runScorers?: TopRunScorerTournament[];
  wicketTakers?: TopWicketTakerTournament[];
  mostSixes?: TopSixHitterTournament[];
  mostCatches?: TopCatchTakerTournament[];
}
