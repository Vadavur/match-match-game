import { CurrentUserInterface } from './interfaces';
import {
  DATABASES,
  TOGGLE_CONTROL_PANEL_EVENT,
  GAME_STATES,
  MM_GAME,
} from './constants';
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
    new CustomEvent(TOGGLE_CONTROL_PANEL_EVENT, {
      detail: GAME_STATES.noUser,
    })
  );
}
