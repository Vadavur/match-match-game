import './card-panel.scss';
import { BaseComponent } from '../shared/base-component';
import { TimerField } from '../timer-field/timer-field';

export class TemplateField extends BaseComponent {
  private readonly timerField: TimerField;

  constructor() {
    super('div', ['card-panel']);
    this.timerField = new TimerField();
    this.element.appendChild(this.timerField.element);
  }
}
