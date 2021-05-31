import { CUSTOM_EVENTS, DATABASES } from './constants';
import { IndexedDataType, UserInterface } from './interfaces';
import { DataBase } from './data-base';
import defaultAvatarUrl from '../../assets/images/avatar-default.png';

export class UserDataHandler {
  currentUser: UserInterface;

  constructor(user: UserInterface) {
    this.currentUser = {
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: defaultAvatarUrl,
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

            if (checkedUser.avatar === '') {
              checkedUser.avatar =
                userInDB.avatar !== defaultAvatarUrl
                  ? userInDB.avatar
                  : defaultAvatarUrl;
            }
          }
        }
        UserDataHandler.putUserToDB(checkedUser);
        this.setCurrentUser(checkedUser);
      }
    );
  }

  public handleNewScore(score: number): void {
    if (this.currentUser.score < score) {
      this.currentUser.score = score;
      UserDataHandler.putUserToDB(this.currentUser);
    }
  }

  private setCurrentUser(user: UserInterface) {
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
