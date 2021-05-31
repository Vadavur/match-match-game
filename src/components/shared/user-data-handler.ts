import { CUSTOM_EVENTS, DATABASES, MM_GAME } from './constants';
import { IndexedDataType, UserInterface } from './interfaces';
import { DataBase } from './data-base';
import defaultAvaatarUrl from '../../assets/images/avatar-default.png';

export class UserDataHandler {
  currentUser: UserInterface;

  constructor() {
    this.currentUser = {
      gameName: MM_GAME.name,
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: defaultAvaatarUrl,
    };
    document.addEventListener(CUSTOM_EVENTS.gameStateChange, (event) => {
      this.setCurrentUser((event as CustomEvent).detail);
    });
  }

  public sendScoreToTable(score: number): void {
    this.currentUser.score = score;
  }

  private setCurrentUser(event: CustomEvent) {
    this.currentUser = event.detail;

    DataBase.putToDB(
      this.currentUser as IndexedDataType,
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath
    );
  }

  private static createNewUser(event: CustomEvent) {
    const user: UserInterface = event.detail;
    DataBase.putToDB(user, DATABASES.users.name, DATABASES.users.keyPath);
  }
}

// DataBase.getFromDB(
//   GAME_SETTINGS.cardsType.name,
//   DATABASES.gameSettings.name,
//   DATABASES.gameSettings.keyPath,
//   (cardsType: IndexedDataType) =>
//     callback(cardsType as GameSettingsInterface)
// );
// gameName: string;
// email: string;
// firstName: string;
// lastName: string;
// score: number;
// avatar: string;
