export interface UserInterface {
  [index: string]: string | number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface CurrentPlayerInterface {
  gameName: 'match-match';
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface GameTogglerInterface {
  gameName: 'match-match';
  gameState: 'noPlayer' | 'onStart' | 'onGame';
}

export interface ScoreItemInterface {
  name: string;
  email: string;
  score: number;
  avatar: string;
}

export interface GameSettingsInterface {
  settingName: string;
  option: string;
}

export type IndexedDataType =
  | GameSettingsInterface
  | UserInterface
  | GameTogglerInterface;
