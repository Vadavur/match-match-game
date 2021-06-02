import './game-over-popup.scss';
import { BaseComponent } from '../shared/base-component';
import { removePopup } from '../shared/remove-popup';
import { Button } from '../button/button';
import { stopGame } from '../shared/game-controls';

export class GameOverPopup extends BaseComponent {
  private readonly popupText: HTMLElement;

  private readonly popupButton: Button;

  constructor(score: number) {
    super('div', ['game-over-popup']);

    this.popupText = document.createElement('p');
    this.popupText.innerHTML = `Congrats! Your score is ${score}!`;
    this.element.appendChild(this.popupText);
    this.element.addEventListener('click', removePopup);
    this.popupButton = new Button(['game-over-popup__btn'], 'Ok', stopGame);
  }
}
