//Matches List By Season
export interface CricketMatchesBySeason {
  season: number;
  matchDetails: CricketMatchDetail[];
}

export interface CricketMatchDetail {
  team1: string;
  team2: string;
  winner: string;
  margin: string;
  ground: string;
  matchDate: string;
  matchNo: string;
  href: string;
}

//A single match of two inning
export interface CricketMatch {
  matchUuid: string;
  season: string;
  series: string;
  seriesResult: string;
  playerOfTheMatch: PlayerOfTheMatch;
  matchNo: string;
  matchDays: string;
  matchTitle: string;
  venue: string;
  matchDate: string;
  tossWinner: string;
  tossDecision: string;
  result: string;
  matchSquad?: MatchSquad | null;
  pointsTable: PointsTableRow[];
  team1: Team;
  team2: Team;
  tvUmpire: string;
  matchReferee: string;
  reserveUmpire: string;
  umpires: string[];
  internationalDebut: string[];
  formatDebut: string[];
}

//A single match of four innings
export interface CricketMatchTest {
  matchUuid: string;
  season: string;
  series: string;
  seriesResult: string;
  playerOfTheMatch: PlayerOfTheMatch;
  matchNo: string;
  matchDays: string;
  matchTitle: string;
  venue: string;
  matchDate: string;
  tossWinner: string;
  tossDecision: string;
  result: string;
  matchSquad?: MatchSquad | null;
  pointsTable: PointsTableRow[];
  team1: TestTeam;
  team2: TestTeam;
  tvUmpire: string;
  matchReferee: string;
  reserveUmpire: string;
  umpires: string[];
  internationalDebut: string[];
  formatDebut: string[];
}

export interface PlayerOfTheMatch {
  playerName: string;
  href: string;
  teamName: string;
}

export interface Team {
  teamName: string;
  team: { name: string; uuid: string; logoUrl: string };
  battingScorecard: Batsman[];
  bowlingScorecard: Bowler[];
  extras: string;
  fallOfWickets: string[];
  didNotBat: Player[];
  totalScore: string;
}

export interface TestTeam {
  teamName: string;
  team: { name: string; uuid: string; logoUrl: string };
  inning1: InningDetail;
  inning2: InningDetail;
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

interface TeamSquad {
  player: Player;
  role: string;
}

export interface PointsTableRow {
  rank: number;
  teamName: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRR: number;
}

export interface CricketMatchGraph {
  manhattan: JSX.Element;
}
