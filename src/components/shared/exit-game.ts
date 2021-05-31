import { CurrentUserInterface } from './interfaces';
import { DATABASES, CUSTOM_EVENTS, GAME_STATES, MM_GAME } from './constants';
import { DataBase } from './data-base';

function resetCurrentUser(): void {
  const currentUser: CurrentUserInterface = {
    gameName: MM_GAME.name,
    email: '',
    firstName: '',
    lastName: '',
    score: 0,
    avatar: 'src/assets/images/avatar-default.png',
  };
  DataBase.putToDB(
    currentUser,
    DATABASES.currentUser.name,
    DATABASES.currentUser.keyPath
  );
}

export function exitGame(): void {
  resetCurrentUser();
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChanged, {
      detail: GAME_STATES.noUser,
    })
  );
}
