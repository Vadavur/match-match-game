import { PageField } from './components/page-field/page-field';
import { Router } from './components/shared/router';
import { DataBase } from './components/shared/data-base';
import { GameTogglerInterface } from './components/shared/interfaces';

export class App {
  private readonly pageField: PageField;

  constructor(private readonly rootElement: HTMLElement) {
    this.pageField = new PageField();
    this.rootElement.appendChild(this.pageField.element);
    window.history.pushState('about-me', 'Match-match game', 'about-me');

    const gameToggler = {
      gameName: 'match-match',
      gameState: 'noPlayer',
    };

    const GAME_STATE_DATABASE = 'gameState';
    const KEY_PATH = 'gameName';
    DataBase.putToDB(
      gameToggler as GameTogglerInterface,
      GAME_STATE_DATABASE,
      KEY_PATH
    ).then(() => {
      const router = new Router();
    });
  }
}
