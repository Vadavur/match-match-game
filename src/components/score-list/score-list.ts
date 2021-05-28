import './score-list.scss';
import { DataBase } from '../shared/data-base';
import { BaseComponent } from '../shared/base-component';
import { ScoreItem } from '../score-item/score-item';
import {
  UserInterface,
  ScoreItemInterface,
  IndexedDataType,
} from '../shared/interfaces';
import { DATABASES } from '../shared/constants';

export class ScoreList extends BaseComponent {
  constructor() {
    super('ul', ['score-list']);

    this.setScoreItems();
  }

  setScoreItems(): void {
    const allItemSources: ScoreItemInterface[] = [];
    const list = this.element;

    function getItemSourceFromUserData(
      user: UserInterface
    ): ScoreItemInterface {
      const newItemSource: ScoreItemInterface = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        score: user.score,
        avatar: user.avatar,
      };
      return newItemSource;
    }

    function addItemSourceFromUserData(users: IndexedDataType[]) {
      users.forEach((user) => {
        allItemSources.push(getItemSourceFromUserData(user as UserInterface));
      });
      allItemSources.forEach((itemSource) => {
        const item = new ScoreItem(itemSource);
        list.appendChild(item.element);
        const horizontalLine = new ScoreItem(itemSource);
        horizontalLine.element.innerHTML =
          '<hr class="score-item__break-line">';
        horizontalLine.element.className = 'score-item_break';
        list.appendChild(horizontalLine.element);
      });
    }
    DataBase.getAllFromDB(
      DATABASES.users.name,
      DATABASES.users.keyPath,
      addItemSourceFromUserData
    );
  }
}
