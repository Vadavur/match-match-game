import { PageField } from './components/page-field/page-field';
import { Router } from './components/shared/router';
import { DataBase } from './components/shared/data-base';
import { GameStateInterface } from './components/shared/interfaces';
import {
  GAME_STATES,
  DATABASES,
  MM_GAME,
  ROUTE_PATHS,
} from './components/shared/constants';

export class App {
  constructor(private readonly rootElement: HTMLElement) {
    DataBase.putToDB(
      GAME_STATES.noUser as GameStateInterface,
      DATABASES.gameState.name,
      DATABASES.gameState.keyPath
    ).then(() => {
      const pageField = new PageField();
      this.rootElement.appendChild(pageField.element);
      window.history.pushState(
        ROUTE_PATHS.aboutMe,
        MM_GAME.title,
        ROUTE_PATHS.aboutMe
      );
      const router = new Router();
      router.changeRootField();
    });
  }
}
