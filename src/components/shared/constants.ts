export const MM_GAME = { title: 'Match-match game', name: 'match-match' };

export const GAME_DIFFICULTY_DEVIDER = 'x';

export const GAME_SETTINGS = {
  gameDifficulty: {
    name: 'gameDifficulty',
    options: ['4x4', '6x6', '8x8'],
  },
  cardsType: {
    name: 'cardsType',
    options: ['animals', 'cars', 'programming'],
  },
};

export const CARDS_TYPE_QUANTITIES = {
  [GAME_SETTINGS.cardsType.options[0]]: 100,
  [GAME_SETTINGS.cardsType.options[1]]: 99,
  [GAME_SETTINGS.cardsType.options[2]]: 75,
};

export const DATABASES = {
  users: { name: 'users', keyPath: 'email' },
  currentUser: { name: 'currentUser', keyPath: 'gameName' },
  gameSettings: { name: 'gameSettings', keyPath: 'name' },
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

export const REGISTER_FORM_INPUTS_ATTRIBUTES = [
  { placeholder: 'First Name', name: 'firstName' },
  { placeholder: 'Last Name', name: 'lastName' },
  { placeholder: 'E-mail', name: 'email' },
];

export const TOGGLE_CONTROL_PANEL_EVENT = 'toggleControlPanel';

export const CARDS_FIELD_GAP = 5; // px
