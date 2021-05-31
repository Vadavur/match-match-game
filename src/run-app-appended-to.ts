import { PageField } from './components/page-field/page-field';
import { DataBase } from './components/shared/data-base';
import { GameSettingsInterface } from './components/shared/interfaces';
import { DATABASES, GAME_SETTINGS } from './components/shared/constants';

async function setDefaultGameState(): Promise<void> {
  const defaultCardTypeSetting = {
    name: GAME_SETTINGS.cardsType.name,
    option: GAME_SETTINGS.cardsType.options[0],
  };

  DataBase.putToDB(
    defaultCardTypeSetting as GameSettingsInterface,
    DATABASES.gameSettings.name,
    DATABASES.gameSettings.keyPath
  ).then(() => {
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
  });
}

// TODOs:
// refactor runAppAppendedTo func - devide into several more readable little funcs
// refactor start/stop/exitGame funcs - put thim in one entity (func or class?)
// refactor PopUpRegisterForm - take out some funcs
// refactor HeaderControlPanel - take out some funcs
// implement correct navigation tabs selections on page transitions
// don't forget about final magic expelliarmus
// refactor game settings
//    put cardType and gameDifficulty in DB as one object
// implement router ability to reload page correctly
