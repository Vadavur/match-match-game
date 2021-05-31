import { CUSTOM_EVENTS, GAME_STATES } from './constants';

export function startGame(): void {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChanged, {
      detail: GAME_STATES.onGame,
    })
  );
}
