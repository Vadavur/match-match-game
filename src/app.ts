import { PageField } from './components/page-field/page-field';
import { Router } from './components/shared/router';
import { DataBase } from './components/shared/data-base';
import { GameTogglerInterface } from './components/shared/interfaces';

export class App {
  constructor(private readonly rootElement: HTMLElement) {
    const GAME_TOGGLER = {
      gameName: 'match-match',
      gameState: 'noPlayer',
    };

    const GAME_STATE_DATABASE = 'gameState';
    const KEY_PATH = 'gameName';
    DataBase.putToDB(
      GAME_TOGGLER as GameTogglerInterface,
      GAME_STATE_DATABASE,
      KEY_PATH
    ).then(() => {
      const pageField = new PageField();
      this.rootElement.appendChild(pageField.element);
      window.history.pushState('about-me', 'Match-match game', 'about-me');
      const router = new Router();
      router.changeRootField();
    });
  }
}
