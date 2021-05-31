import { TOGGLE_CONTROL_PANEL_EVENT, GAME_STATES } from './constants';

export function stopGame(): void {
  document.dispatchEvent(
    new CustomEvent(TOGGLE_CONTROL_PANEL_EVENT, {
      detail: GAME_STATES.onStart,
    })
  );
}
