import { CUSTOM_EVENTS, DATABASES } from './constants';
import { IndexedDataType, UserInterface } from './interfaces';
import { DataBase } from './data-base';

export class UserDataHandler {
  currentUser: UserInterface;

  constructor(user: UserInterface) {
    this.currentUser = {
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: 'defaultAvatar',
    };
    document.addEventListener(CUSTOM_EVENTS.newScoreAcquire, (event) => {
      this.handleNewScore((event as CustomEvent).detail);
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
        if (result !== null && result !== undefined) {
          const userInDB = result as UserInterface;
          if (
            userInDB.firstName === checkedUser.firstName &&
            userInDB.lastName === checkedUser.lastName
          ) {
            checkedUser.score = userInDB.score;

            if (checkedUser.avatar === '' || checkedUser.avatar === undefined) {
              checkedUser.avatar =
                userInDB.avatar !== 'defaultAvatar'
                  ? 'defaultAvatar' // userInDB.avatar
                  : 'defaultAvatar';
            }
          }
        }
        UserDataHandler.putUserToDB(checkedUser);
        this.setCurrentUser(checkedUser);
      }
    );
  }

  public handleNewScore(score: number): void {
    DataBase.getAllFromDB(
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath,
      (request: IndexedDataType[]) => {
        const currentUser = request[0] as UserInterface;
        if (currentUser.score < score) {
          currentUser.score = score;
          UserDataHandler.putUserToDB(currentUser);
          this.setCurrentUser(currentUser);
        }
      }
    );
  }

  private setCurrentUser(user: UserInterface) {
    this.currentUser = user;

    DataBase.clearDB(
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath,
      () => {
        DataBase.putToDB(
          this.currentUser as IndexedDataType,
          DATABASES.currentUser.name,
          DATABASES.currentUser.keyPath
        );
      }
    );
  }

  private getCurrentUser(user: UserInterface) {
    this.currentUser = user;

    DataBase.putToDB(
      this.currentUser as IndexedDataType,
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath
    );
  }

  private static putUserToDB(user: UserInterface) {
    DataBase.putToDB(user, DATABASES.users.name, DATABASES.users.keyPath);
  }
}
