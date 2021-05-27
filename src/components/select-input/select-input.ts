import './select-input.scss';
import { BaseComponent } from '../shared/base-component';
import { GameField } from '../game-field/game-field';

export class SelectInput extends BaseComponent {
  private readonly gameField: GameField;

  constructor(
    name: string,
    optionValues: string[],
    onChangeFunction: () => void
  ) {
    super('select', ['select-input']);
    this.element.setAttribute('type', 'select');
    this.element.setAttribute('name', name);
    this.gameField = new GameField();
    this.element.appendChild(this.gameField.element);
    this.createOptions(optionValues);
    this.element.addEventListener('change', onChangeFunction);
  }

  createOptions(optionValues: string[]): void {
    optionValues.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerHTML = option;
      this.element.append(optionElement);
    });
  }
}
