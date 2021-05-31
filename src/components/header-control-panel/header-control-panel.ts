import './header-control-panel.scss';
import { BaseComponent } from '../shared/base-component';
import { CurrentUserAvatar } from '../current-user-avatar/current-user-avatar';
import { Button } from '../button/button';
import { startGame } from '../shared/start-game';
import { stopGame } from '../shared/stop-game';
import { exitGame } from '../shared/exit-game';
import { showPopup } from '../shared/show-popup';
import { DataBase } from '../shared/data-base';
import { GameStateInterface, IndexedDataType } from '../shared/interfaces';
import { DATABASES, GAME_STATES, MM_GAME } from '../shared/constants';

export class HeaderControlPanel extends BaseComponent {
  // public static controlElement: HTMLElement = new BaseComponent().element;

  constructor() {
    super('div', ['header-control-panel']);
  }

  public toggleControlPanel(): void {
    this.element.className = 'header-control-panel';

    DataBase.getFromDB(
      MM_GAME.name,
      DATABASES.gameState.name,
      DATABASES.gameState.keyPath,
      (gameToggler: IndexedDataType) => {
        switch ((gameToggler as GameStateInterface).gameState) {
          case GAME_STATES.noUser.gameState:
            this.createNoUserControls();
            break;

          case GAME_STATES.onStart.gameState:
            this.createOnStartControls();
            break;

          case GAME_STATES.onGame.gameState:
            this.createOnGameControls();
            break;

          default:
            break;
        }
      }
    );
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
