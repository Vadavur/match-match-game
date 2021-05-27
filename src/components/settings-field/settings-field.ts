import './settings-field.scss';
import { BaseComponent } from '../shared/base-component';
import { GameField } from '../game-field/game-field';

export class SettingsField extends BaseComponent {
  private readonly gameField: GameField;

  constructor() {
    super('div', ['settings-field']);
    this.gameField = new GameField();
    this.element.appendChild(this.gameField.element);
  }
}
