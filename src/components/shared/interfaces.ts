export interface UserInterface {
  [index: string]: string | number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface CurrentUserInterface {
  [index: string]: string | number;
  gameName: string;
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface GameStateInterface {
  gameName: string;
  gameState: 'noUser' | 'onStart' | 'onGame';
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
  | CurrentUserInterface
  | GameStateInterface;
