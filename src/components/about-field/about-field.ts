import './about-field.scss';
import { BaseComponent } from '../shared/base-component';
import { GameField } from '../game-field/game-field';

export class AboutField extends BaseComponent {
  private readonly gameField: GameField;

  constructor() {
    super('div', ['about-field']);
    this.gameField = new GameField();
    this.element.appendChild(this.gameField.element);
    this.element.innerHTML = `
      <img
        src="src/assets/images/about-me-plug.png"
        alt=""
        class="about-field__plug-img"
      >
  `;
  }
}
