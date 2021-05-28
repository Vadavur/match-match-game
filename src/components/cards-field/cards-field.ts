import './cards-field.scss';
import { BaseComponent } from '../shared/base-component';
import { TimerField } from '../timer-field/timer-field';

export class CardsField extends BaseComponent {
  private readonly timerField: TimerField;

  constructor() {
    super('div', ['cards-field']);
    this.timerField = new TimerField();
    this.element.appendChild(this.timerField.element);
  }
}
