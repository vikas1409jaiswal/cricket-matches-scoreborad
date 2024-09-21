export interface MatchesResultSummary {
  team: string;
  span: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  draw: number;
  noResult: number;
  mostRuns: PlayerH2HBattingInfo[];
  mostWickets: PlayerH2HBowlingInfo[];
  hIScores: PlayerH2HHIScoreInfo[];
}

export interface PlayerH2HBattingInfo {
  name: string;
  href: string;
  span: string;
  matches: number;
  innings: number;
  notOut: number;
  runs: number;
  hScore: string;
  bFaced: number;
  sRate: number;
  centuries: number;
  hCenturies: number;
  ducks: number;
  fours: number;
  sixes: number;
}

export interface PlayerH2HBowlingInfo {
  name: string;
  href: string;
  span: string;
  matches: number;
  innings: number;
  balls: number;
  overs: number;
  maidens: number;
  runConceded: number;
  wickets: number;
  bbi: string;
  bbm: string;
  fourWickets: number;
  fiveWickets: number;
  economy: number;
}

export interface PlayerH2HHIScoreInfo {
  name: string;
  teamName: string;
  href: string;
  runs: number;
  balls: number;
  notOut: boolean;
}
