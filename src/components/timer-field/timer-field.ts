import './timer-field.scss';
import { BaseComponent } from '../shared/base-component';
import { GameField } from '../game-field/game-field';

export class TimerField extends BaseComponent {
  private readonly gameField: GameField;

  constructor() {
    super('div', ['timer-field']);
    this.gameField = new GameField();
    this.element.appendChild(this.gameField.element);
  }
}
