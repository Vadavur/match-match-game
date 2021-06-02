import { CUSTOM_EVENTS, GAME_STATES, MM_GAME, ROUTE_PATHS } from './constants';

export function startGame(): void {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChange, {
      detail: GAME_STATES.onGame,
    })
  );
}

export function stopGame(): void {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChange, {
      detail: GAME_STATES.onStart,
    })
  );
}

export function exitGame(): void {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENTS.gameStateChange, {
      detail: GAME_STATES.noUser,
    })
  );
}
