import './current-user-avatar.scss';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { DATABASES } from '../shared/constants';
import { IndexedDataType, UserInterface } from '../shared/interfaces';

export class CurrentUserAvatar extends BaseComponent {
  constructor() {
    super('img', ['current-user-avatar']);

    this.getCurrentUserAvatarFromDB();
  }

  private getCurrentUserAvatarFromDB() {
    let src: string;
    src = 'd';
    src = 'd';
    DataBase.getAllFromDB(
      DATABASES.currentUser.name,
      DATABASES.currentUser.keyPath,
      (request: IndexedDataType[]) => {
        const currentUser = request[0] as UserInterface;
        const imageElement = this.element as HTMLImageElement;
        imageElement.src = currentUser.avatar;
        imageElement.alt = `${currentUser.firstName} ${currentUser.lastName} avatar`;
        imageElement.title = `Hello, ${currentUser.firstName} ${currentUser.lastName}!`;
      }
    );
    return src;
  }
}
