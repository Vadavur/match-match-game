import './game-over-popup.scss';
import '../popup-field/popup-field.scss';
import { BaseComponent } from '../shared/base-component';
import { removePopup } from '../shared/remove-popup';
import { Button } from '../button/button';
import { stopGame } from '../shared/game-controls';

export class GameOverPopup extends BaseComponent {
  private readonly popupWindow: HTMLElement;

  private readonly popupText: HTMLElement;

  private readonly popupButton: Button;

  constructor(score: number) {
    super('div', ['popup-field', 'game-over-popup']);

    this.popupWindow = document.createElement('div');
    this.popupWindow.classList.add('game-over-popup_window');
    this.popupText = document.createElement('p');
    this.popupText.innerHTML = `Congrats! Your score is ${score}!`;
    this.element.addEventListener('click', removePopup);
    this.popupButton = new Button(
      ['game-over-popup__btn'],
      'Ok',
      GameOverPopup.endGameSession
    );
    this.popupButton.element.setAttribute('data-path', 'best-score');
    this.popupWindow.appendChild(this.popupText);
    this.popupWindow.appendChild(this.popupButton.element);
    this.element.appendChild(this.popupWindow);
  }

  private static endGameSession(event: Event) {
    stopGame();
    removePopup(event);
  }
}
