export interface UserInterface {
  [index: string]: string | number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  avatar: string;
}

export interface TogglerInterface {
  gameState: 'noPlayer' | 'onStart' | 'onGame';
}

export interface ScoreItemInterface {
  name: string;
  email: string;
  score: number;
  avatar: string;
}
