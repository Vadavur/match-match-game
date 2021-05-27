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
  gameSettings: { name: 'gameSettings', keyPath: 'settingName' },
  gameState: { name: 'gameState', keyPath: 'gameName' },
};

export const GAME_STATES = {
  noPlayer: 'noPlayer',
  onStart: 'onStart',
  onGame: 'onGame',
};

export const ROUTE_PATHS = {
  aboutMe: 'about-me',
  gameSettings: 'game-settings',
  bestScore: 'best-score',
  playground: 'playground',
};
