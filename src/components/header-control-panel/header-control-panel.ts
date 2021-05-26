import './header-control-panel.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupField } from '../popup-field/popup-field';
import { Button } from '../button/button';
import { startGame } from '../shared/start-game';
import { DataBase } from '../shared/data-base';
import { TogglerInterface, UserInterface } from '../shared/interfaces';

export class HeaderControlPanel extends BaseComponent {
  public static controlElement: HTMLElement = new BaseComponent().element;

  constructor() {
    super('div', ['header-control-panel']);
  }

  public static toggleControls(): void {
    function setControlPanel(
      gameState: TogglerInterface | UserInterface
    ): void {
      switch (gameState as TogglerInterface) {
        case { gameState: 'noPlayer' }:
          HeaderControlPanel.createNoPlayerControls();
          break;

        case { gameState: 'onStart' }:
          HeaderControlPanel.createOnStartControls();
          break;

        case { gameState: 'onGame' }:
          HeaderControlPanel.createOnGameControls();
          break;

        default:
          break;
      }
    }
    const GAME_STATE_DATABASE = 'gameState';
    const KEY_PATH = 'gameState';
    DataBase.getFromDB(
      'gameState',
      KEY_PATH,
      GAME_STATE_DATABASE,
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
    HeaderControlPanel.createPlayerAvatar();
  }

  private static createOnGameControls(): void {
    HeaderControlPanel.controlElement.innerHTML = '';
    HeaderControlPanel.createStopGameButton();
    HeaderControlPanel.createExitGameButton();
    HeaderControlPanel.createPlayerAvatar();
  }

  private static createRegisterButton(): void {
    function showPopup(): void {
      document.body.appendChild(new PopupField().element);
    }
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
    function stopGame(): void {}

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

  private static createPlayerAvatar(): void {
    function stopGame(): void {}

    const exitGameButton = new Button(
      ['button_stop-game'],
      'stop game',
      stopGame
    );

    HeaderControlPanel.controlElement.appendChild(exitGameButton.element);
  }
}
