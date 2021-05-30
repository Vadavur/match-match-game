import { DataBase } from '../shared/data-base';
import { GameSettingsInterface } from '../shared/interfaces';
import {
  DATABASES,
  GAME_SETTINGS,
  CARDS_TYPE_QUANTITIES,
} from '../shared/constants';

export class Game {
  public static getCardsType(): void {
    DataBase.getFromDB(
      GAME_SETTINGS.cardsType.name,
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath,
      (result) => {}
    );
  }
}
