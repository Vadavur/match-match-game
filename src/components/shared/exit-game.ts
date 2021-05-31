import { CUSTOM_EVENTS, GAME_STATES } from './constants';

export function exitGame(): void {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChange, {
      detail: GAME_STATES.noUser,
    })
  );
}
