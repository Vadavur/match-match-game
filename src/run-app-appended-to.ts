import { PageField } from './components/page-field/page-field';
import { Router } from './components/shared/router';
import { DataBase } from './components/shared/data-base';
import {
  GameStateInterface,
  GameSettingsInterface,
} from './components/shared/interfaces';
import {
  GAME_STATES,
  DATABASES,
  MM_GAME,
  ROUTE_PATHS,
  GAME_SETTINGS,
} from './components/shared/constants';

async function setDefaultGameState(): Promise<void> {
  DataBase.putToDB(
    GAME_STATES.noUser as GameStateInterface,
    DATABASES.gameState.name,
    DATABASES.gameState.keyPath
  )
    .then(() => {
      const defaultCardTypeSetting = {
        name: GAME_SETTINGS.cardsType.name,
        option: GAME_SETTINGS.cardsType.options[0],
      };

      DataBase.putToDB(
        defaultCardTypeSetting as GameSettingsInterface,
        DATABASES.gameSettings.name,
        DATABASES.gameSettings.keyPath
      );
    })
    .then(() => {
      const defaultGameDifficultySetting = {
        name: GAME_SETTINGS.gameDifficulty.name,
        option: GAME_SETTINGS.gameDifficulty.options[0],
      };

      DataBase.putToDB(
        defaultGameDifficultySetting as GameSettingsInterface,
        DATABASES.gameSettings.name,
        DATABASES.gameSettings.keyPath
      );
    });
}

export function runAppAppendedTo(rootElement: HTMLElement): void {
  setDefaultGameState().then(() => {
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
// NB!!! Refactor app state handling:
//    don't use DB for app state keeping,
//    use custom events inner data ({ detail: data } new event param)
//    to pass app state directly to toggleControlPanel function
// refactor runAppAppendedTo func - devide into several more readable little funcs
// refactor start/stop/exitGame funcs - put thim in one entity (func or class?)
// refactor PopUpRegisterForm - take out some funcs
// refactor HeaderControlPanel - take out some funcs
// implement correct navigation tabs selections on page transitions
// don't forget about final magic expelliarmus
// refactor game settings
//    put cardType and gameDifficulty in DB as one object
// implement router ability to reload page correctly
