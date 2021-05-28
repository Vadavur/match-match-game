import './header-control-panel.scss';
import { BaseComponent } from '../shared/base-component';
import { CurrentUserAvatar } from '../current-user-avatar/current-user-avatar';
import { Button } from '../button/button';
import { startGame } from '../shared/start-game';
import { stopGame } from '../shared/stop-game';
import { showPopup } from '../shared/show-popup';
import { DataBase } from '../shared/data-base';
import { GameStateInterface, IndexedDataType } from '../shared/interfaces';
import { DATABASES, GAME_STATES, MM_GAME } from '../shared/constants';

export class HeaderControlPanel extends BaseComponent {
  public static controlElement: HTMLElement = new BaseComponent().element;

  constructor() {
    super('div', ['header-control-panel']);
  }

  public static toggleControlPanel(): void {
    HeaderControlPanel.controlElement.className = 'header-control-panel';
    function setControlPanel(gameToggler: IndexedDataType): void {
      switch ((gameToggler as GameStateInterface).gameState) {
        case GAME_STATES.noUser.gameState:
          HeaderControlPanel.createNoPlayerControls();
          break;

        case GAME_STATES.onStart.gameState:
          HeaderControlPanel.createOnStartControls();
          break;

        case GAME_STATES.onGame.gameState:
          HeaderControlPanel.createOnGameControls();
          break;

        default:
          break;
      }
    }

    DataBase.getFromDB(
      MM_GAME.name,
      DATABASES.gameState.name,
      DATABASES.gameState.keyPath,
      setControlPanel
    );
  }

  private static createNoPlayerControls() {
    HeaderControlPanel.controlElement.innerHTML = '';
    HeaderControlPanel.createRegisterButton();
  }

  private static createOnStartControls(): void {
    HeaderControlPanel.controlElement.innerHTML = '';
    HeaderControlPanel.createStartGameButton();
    HeaderControlPanel.createExitGameButton();
    HeaderControlPanel.createUserAvatar();
  }

  private static createOnGameControls(): void {
    HeaderControlPanel.controlElement.innerHTML = '';
    HeaderControlPanel.createStopGameButton();
    HeaderControlPanel.createExitGameButton();
    HeaderControlPanel.createUserAvatar();
  }

  private static createRegisterButton(): void {
    const registerButton = new Button(
      ['button_register-new-player'],
      'register new player',
      showPopup
    );
    HeaderControlPanel.controlElement.appendChild(registerButton.element);
  }

  private static createStartGameButton(): void {
    const startGameButton = new Button(
      ['button_start-game'],
      'start game',
      startGame
    );
    startGameButton.element.setAttribute('data-path', 'playground');
    HeaderControlPanel.controlElement.appendChild(startGameButton.element);
  }

  private static createStopGameButton(): void {
    const stopGameButton = new Button(
      ['button_stop-game'],
      'stop game',
      stopGame
    );
    stopGameButton.element.setAttribute('data-path', 'best-score');
    HeaderControlPanel.controlElement.appendChild(stopGameButton.element);
  }

  private static createExitGameButton(): void {
    function exitGame(): void {}

    const exitGameButton = new Button(['button_exit-game'], 'exit', exitGame);
    exitGameButton.element.setAttribute('data-path', 'about-me');
    HeaderControlPanel.controlElement.appendChild(exitGameButton.element);
  }

  private static createUserAvatar(): void {
    const userAvatar = new CurrentUserAvatar();
    HeaderControlPanel.controlElement.appendChild(userAvatar.element);
  }
}
