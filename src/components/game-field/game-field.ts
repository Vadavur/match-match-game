import './game-field.scss';
import { BaseComponent } from '../shared/base-component';
import { Game } from '../game/game';

export class GameField extends BaseComponent {
  private readonly currentGame: Game;

  constructor() {
    super('div', ['game-field']);
    this.currentGame = new Game(this.element);
  }
}
