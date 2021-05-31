import { CUSTOM_EVENTS, DATABASES } from './constants';
import { IndexedDataType, UserInterface } from './interfaces';
import { DataBase } from './data-base';
import defaultAvaatarUrl from '../../assets/images/avatar-default.png';

export class UserDataHandler {
  currentUser: UserInterface;

  constructor(user: UserInterface) {
    this.currentUser = {
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: defaultAvaatarUrl,
    };
    document.addEventListener(CUSTOM_EVENTS.gameStateChange, (event) => {
      this.setCurrentUser((event as CustomEvent).detail);
    });
    this.addUserDataToDB(user);
  }

  private addUserDataToDB(user: UserInterface) {
    const checkedUser = user;
    DataBase.getFromDB(
      checkedUser.email,
      DATABASES.users.name,
      DATABASES.users.keyPath,
      (result: IndexedDataType | null) => {
        if (result !== null) {
          const userInDB = result as UserInterface;
          if (
            userInDB.firstName === checkedUser.firstName &&
            userInDB.lastName === checkedUser.lastName
          ) {
            checkedUser.score = userInDB.score;

            if (checkedUser.avatar === '') {
              checkedUser.avatar =
                userInDB.avatar !== defaultAvaatarUrl
                  ? userInDB.avatar
                  : defaultAvaatarUrl;
            }
          }
          UserDataHandler.putUserToDB(checkedUser);
          this.setCurrentUser(checkedUser);
        }
      }
    );
  }

  public sendScoreToTable(score: number): void {
    this.currentUser.score = score;
  }

  private setCurrentUser(user: CustomEvent['detail']) {
    this.currentUser = user;

    DataBase.putToDB(
      this.currentUser as IndexedDataType,
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath
    );
  }

  private static putUserToDB(user: CustomEvent['detail']) {
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
