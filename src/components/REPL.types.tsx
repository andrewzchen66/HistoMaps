export interface CommandInfo {
  command: string;
  output: string | string[][];
  isBrief: boolean;
}

export interface FetchedAPIData {
  success: boolean;
  message: string | string[][];
}
