import './header-control-panel.scss';
import { BaseComponent } from '../shared/base-component';
import { CurrentUserAvatar } from '../current-user-avatar/current-user-avatar';
import { Button } from '../button/button';
import { startGame } from '../shared/start-game';
import { stopGame } from '../shared/stop-game';
import { exitGame } from '../shared/exit-game';
import { showPopup } from '../shared/show-popup';
import { GAME_STATES, CUSTOM_EVENTS } from '../shared/constants';

export class HeaderControlPanel extends BaseComponent {
  constructor() {
    super('div', ['header-control-panel']);
    this.toggleControlPanel(GAME_STATES.noUser);

    document.addEventListener(CUSTOM_EVENTS.gameStateChange, (event) => {
      this.toggleControlPanel((event as CustomEvent).detail);
    });
  }

  public toggleControlPanel(gameState: string): void {
    switch (gameState) {
      case GAME_STATES.noUser:
        this.createNoUserControls();
        break;

      case GAME_STATES.onStart:
        this.createOnStartControls();
        break;

      case GAME_STATES.onGame:
        this.createOnGameControls();
        break;

      default:
        break;
    }
  }

  private createNoUserControls() {
    this.element.innerHTML = '';
    this.createRegisterButton();
  }

  private createOnStartControls(): void {
    this.element.innerHTML = '';
    this.createStartGameButton();
    this.createExitGameButton();
    this.createUserAvatar();
  }

  private createOnGameControls(): void {
    this.element.innerHTML = '';
    this.createStopGameButton();
    this.createExitGameButton();
    this.createUserAvatar();
  }

  private createRegisterButton(): void {
    const registerButton = new Button(
      ['button_register-new-player'],
      'register new player',
      showPopup
    );
    this.element.appendChild(registerButton.element);
  }

  private createStartGameButton(): void {
    const startGameButton = new Button(
      ['button_start-game'],
      'start game',
      startGame
    );
    startGameButton.element.setAttribute('data-path', 'playground');
    this.element.appendChild(startGameButton.element);
  }

  private createStopGameButton(): void {
    const stopGameButton = new Button(
      ['button_stop-game'],
      'stop game',
      stopGame
    );
    stopGameButton.element.setAttribute('data-path', 'best-score');
    this.element.appendChild(stopGameButton.element);
  }

  private createExitGameButton(): void {
    const exitGameButton = new Button(['button_exit-game'], 'exit', exitGame);
    exitGameButton.element.setAttribute('data-path', 'about-me');
    this.element.appendChild(exitGameButton.element);
  }

  private createUserAvatar(): void {
    const userAvatar = new CurrentUserAvatar();
    this.element.appendChild(userAvatar.element);
  }
}
