import './settings-field.scss';
import { BaseComponent } from '../shared/base-component';
import { HeaderField } from '../header-field/header-field';
import { GameField } from '../game-field/game-field';

export class SettingsField extends BaseComponent {
  private readonly settingsField: HeaderField;

  private readonly gameField: GameField;

  constructor() {
    super('div', ['settings-field']);
    this.settingsField = new HeaderField();
    this.gameField = new GameField();
    this.element.appendChild(this.settingsField.element);
    this.element.appendChild(this.gameField.element);
  }
}
