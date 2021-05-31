export interface UserInterface {
  [index: string]: string | number;
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface GameSettingsInterface {
  name: string;
  option: string;
}

export type IndexedDataType = UserInterface | GameSettingsInterface;

export interface ScoreItemInterface {
  name: string;
  email: string;
  score: number;
  avatar: string;
}
