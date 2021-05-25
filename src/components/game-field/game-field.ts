import './game-field.scss';
import { BaseComponent } from '../shared/base-component';

export class GameField extends BaseComponent {
  constructor() {
    super('div', ['game-field']);
  }
}
