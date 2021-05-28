import './current-user-avatar.scss';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { DATABASES, MM_GAME } from '../shared/constants';
import { IndexedDataType, CurrentUserInterface } from '../shared/interfaces';

export class CurrentUserAvatar extends BaseComponent {
  constructor() {
    super('img', ['current-user-avatar']);

    this.getCurrentUserAvatarFromDB();
  }

  private getCurrentUserAvatarFromDB() {
    let src: string;
    src = 'd';
    src = 'd';
    DataBase.getFromDB(
      MM_GAME.name,
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath,
      (request: IndexedDataType) => {
        const currentUser = request as CurrentUserInterface;
        const imageElement = this.element as HTMLImageElement;
        imageElement.src = currentUser.avatar;
        imageElement.alt = `${currentUser.firstName} ${currentUser.lastName} avatar`;
      }
    );
    return src;
  }
}
