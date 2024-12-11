import moment from 'moment';

export interface HighScoreData {
  rank: number;
  username: string;
  score: number;
  timestamp: EpochTimeStamp;
}

export function getFormattedDate(timestamp: EpochTimeStamp) {
  return moment(timestamp).format("l");
}