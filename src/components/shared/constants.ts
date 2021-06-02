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
  currentUser: { name: 'currentUser', keyPath: 'email' },
  gameSettings: { name: 'gameSettings', keyPath: 'name' },
};

export const GAME_STATES = {
  noUser: 'noUser',
  onStart: 'onStart',
  onGame: 'onGame',
};

export const ROUTE_PATHS = {
  aboutMe: 'about-me',
  gameSettings: 'game-settings',
  bestScore: 'best-score',
  playground: 'playground',
};

export const REGISTER_FORM_INPUTS_ATTRIBUTES = [
  { type: 'text', placeholder: 'First Name', name: 'firstName', required: '' },
  { type: 'text', placeholder: 'Last Name', name: 'lastName', required: '' },
  { type: 'email', placeholder: 'E-mail', name: 'email', required: '' },
  { type: 'file', placeholder: '', name: 'avatar', required: '' },
];

export const CUSTOM_EVENTS = {
  gameStateChange: 'gameStateChange',
  cardPanelsAppend: 'cardPanelsAppend',
  newScoreAcquire: 'newScoreAcquire',
};

export const CARDS_FIELD_GAP = 5; // px

export const FLIPPED_STATE_TIMEOUT = 500; // ms

export const SHOW_CARDS_SECONDS_PERIOD = 3; // sec

export const SCORE_TABLE_LIMIT = 10; // sec

export const TIMER_MESSAGES = {
  loading: 'LOADING...',
  go: 'GO!!!',
};

export const CARDS_CLASS_NAMES = {
  flipped: 'flipped',
  matched: 'matched',
  wronglyMatched: 'wrongly-matched',
};
