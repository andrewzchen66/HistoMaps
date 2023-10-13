export type TableOutput = {
  data : string[][];
  hasHeader: boolean;
}

export interface CommandInfo {
  command: string;
  output: string | TableOutput;
  isBrief: boolean;
}

export interface FetchedAPIData {
  success: boolean;
  message: string | string[][];
}
