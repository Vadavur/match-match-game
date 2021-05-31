import { DATABASES, MM_GAME } from './constants';
import {
  CurrentUserInterface,
  IndexedDataType,
  UserInterface,
} from './interfaces';
import { DataBase } from './data-base';
import defaultAvaatarUrl from '../../assets/images/avatar-default.png';

export class UserDataHandler {
  currentUser: CurrentUserInterface;

  constructor() {
    this.currentUser = {
      gameName: MM_GAME.name,
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: defaultAvaatarUrl,
    };
    // document.addEventListener();
  }

  public sendScoreToTable(score: number): void {
    this.currentUser.score = score;
  }

  setCurrentUser(event: CustomEvent): void {
    this.currentUser = event.detail;

    DataBase.putToDB(
      this.currentUser as IndexedDataType,
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath
    );
  }
}

// const user: UserInterface = {
//   email: '',
//   firstName: '',
//   lastName: '',
//   score: 0,
//   avatar: 'src/assets/images/avatar-default.png',
// };
// this.inputsAttributes.forEach((inputAttributes) => {
//   if (inputAttributes.instance) {
//     const input = inputAttributes.instance.element;
//     if (input.tagName === 'INPUT') {
//       const inputElement = input as HTMLInputElement;
//       const inputName: string = inputElement.name;
//       if (inputElement && inputElement.name in user) {
//         user[inputName] = inputElement.value;
//       }
//     }
//   }
// });
// DataBase.putToDB(user, DATABASES.users.name, DATABASES.users.keyPath);

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
