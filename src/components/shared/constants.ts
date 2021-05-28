import {} from './interfaces';

export const GAME_SETTINGS = [
  {
    settingName: 'gameDifficulty',
    options: ['4x4', '6x6', '8x8'],
  },
  {
    settingName: 'cardsType',
    options: ['cars', 'animals', 'programming'],
  },
];

export const DATABASES = {
  users: { name: 'users', keyPath: 'email' },
  currentUser: { name: 'currentUser', keyPath: 'gameName' },
  gameSettings: { name: 'gameSettings', keyPath: 'settingName' },
  gameState: { name: 'gameState', keyPath: 'gameName' },
};

export const GAME_STATES = {
  noUser: { gameName: 'match-match', gameState: 'noUser' },
  onStart: { gameName: 'match-match', gameState: 'onStart' },
  onGame: { gameName: 'match-match', gameState: 'onGame' },
};

export const ROUTE_PATHS = {
  aboutMe: 'about-me',
  gameSettings: 'game-settings',
  bestScore: 'best-score',
  playground: 'playground',
};

export const MM_GAME = { title: 'Match-match game', name: 'match-match' };
