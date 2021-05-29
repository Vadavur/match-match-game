import './game-field.scss';
import { BaseComponent } from '../shared/base-component';
import { TimerField } from '../timer-field/timer-field';
import { CardsField } from '../cards-field/cards-field';

export class GameField extends BaseComponent {
  private readonly timerField: TimerField;

  private readonly cardsField: CardsField;

  constructor() {
    super('div', ['game-field']);
    this.timerField = new TimerField();
    this.cardsField = new CardsField();
    this.element.appendChild(this.timerField.element);
    this.element.appendChild(this.cardsField.element);
  }
}
