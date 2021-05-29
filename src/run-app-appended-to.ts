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

export function runAppAppendedTo(rootElement: HTMLElement): void {
  DataBase.putToDB(
    GAME_STATES.noUser as GameStateInterface,
    DATABASES.gameState.name,
    DATABASES.gameState.keyPath
  ).then(() => {
    const pageField = new PageField();
    rootElement.appendChild(pageField.element);
    window.history.pushState(
      ROUTE_PATHS.aboutMe,
      MM_GAME.title,
      ROUTE_PATHS.aboutMe
    );
    const router = new Router();
    router.changeRootField();
  });
}

// TODOs:
// NB!!! Refactor header control panel changing completely:
//    don't use DB for app state keeping,
//    use custom events inner data ({ detail: data } new event param)
//    to pass app state directly to toggleControlPanel function
// NB!!! Refactor CardField class completely. Total mess...
// refactor runAppAppendedTo func - devide into several more readable little funcs
// refactor start/stop/exitGame funcs - put thim in one entity (func or class?)
// refactor PopUpRegisterForm - take out some funcs
// refactor HeaderControlPanel - take out some funcs
// implement correct navigation tabs visual selections on toggle transitions
// don't forget about final magic expelliarmus
