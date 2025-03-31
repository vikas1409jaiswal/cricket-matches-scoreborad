import { MatchSquad } from "./CricketMatch";
import { PointsTableRow } from "./PointsTable";

export interface CricketMatchBase<T> {
  matchUuid: string;
  season: string;
  series: string;
  seriesResult: string;
  playerOfTheMatch: PlayerOfTheMatch;
  matchNumber: string;
  matchDays: string;
  matchTitle: string;
  venue: string;
  tossWinner: string;
  tossDecision: string;
  result: string;
  matchSquad?: MatchSquad | null;
  pointsTable: PointsTableRow[];
  tvUmpire: string;
  matchReferee: string;
  reserveUmpire: string;
  umpires: string[];
  internationalDebut: string[];
  formatDebut: string[];
  team1: T;
  team2: T;
}

export interface PlayerOfTheMatch {
  playerName: string;
  href: string;
  teamName: string;
}
