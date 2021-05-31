export class UserDataHandler {
  currentUser = '';

  constructor() {
    this.currentUser = 'dd';
  }

  public sendScoreToTable(score: number): void {
    this.currentUser = String(score);
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
