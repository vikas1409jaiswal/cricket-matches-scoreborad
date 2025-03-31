import { CricketMatchBase } from "./CricketMatchBase";

//A single match of two inning
export interface CricketMatch extends CricketMatchBase<TeamScoreBoard> {
  playerReplacement: Replacement[];
}

//A single match of four innings
export interface CricketMatchTest
  extends CricketMatchBase<TestTeamScoreBoard> {}

export interface TeamShortInfo {
  name: string;
  uuid: string;
  logoUrl: string;
}

export interface TeamScoreBoard {
  teamName: string;
  team: TeamShortInfo;
  battingScorecard: Batsman[];
  bowlingScorecard: Bowler[];
  extras: string;
  fallOfWickets: string[];
  didNotBat: Player[];
  totalScore: string;
}

export interface TestTeamScoreBoard {
  teamName: string;
  team: TeamShortInfo;
  inning1: InningDetail;
  inning2: InningDetail;
}

export interface Replacement {
  teamName: string;
  inPlayerHref: string;
  outPlayerHref: string;
}

export interface InningDetail {
  battingScorecard: Batsman[];
  bowlingScorecard: Bowler[];
  extras: string;
  fallOfWickets: string[];
  didNotBat: Player[];
  totalScore: string;
}

export interface Player {
  name: string;
  href: string;
}

export interface Batsman {
  playerName: Player;
  outStatus: string;
  runsScored: number;
  ballsFaced: number;
  minutes: number;
  fours: number;
  sixes: number;
}

export interface Bowler {
  playerName: Player;
  oversBowled: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  wideBall: number;
  noBall: number;
  dots: number;
  fours: number;
  sixes: number;
}

export interface MatchSquad {
  team1SquadInfo: TeamSquadInfo;
  team2SquadInfo: TeamSquadInfo;
}

export interface TeamSquadInfo {
  teamName: string;
  teamLogoUrl: string;
  teamSquad: TeamSquad[];
}

export interface TeamSquad {
  player: Player;
  role: string;
}
