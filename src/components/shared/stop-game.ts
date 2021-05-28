import { GameStateInterface } from './interfaces';
import {
  DATABASES,
  TOGGLE_CONTROL_PANEL_EVENT,
  GAME_STATES,
} from './constants';
import { DataBase } from './data-base';

export function stopGame(): void {
  const toggleControlEvent = new Event(TOGGLE_CONTROL_PANEL_EVENT, {
    bubbles: true,
  });
  DataBase.putToDB(
    GAME_STATES.onStart as GameStateInterface,
    DATABASES.gameState.name,
    DATABASES.gameState.keyPath
  ).then(() => {
    document.dispatchEvent(toggleControlEvent);
  });
}
