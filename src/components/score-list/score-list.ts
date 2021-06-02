import './score-list.scss';
import { DataBase } from '../shared/data-base';
import { BaseComponent } from '../shared/base-component';
import { ScoreItem } from '../score-item/score-item';
import {
  UserInterface,
  ScoreItemInterface,
  IndexedDataType,
} from '../shared/interfaces';
import { DATABASES, SCORE_TABLE_LIMIT } from '../shared/constants';
import defaultAvatarUrl from '../../assets/images/avatar-default.png';

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
      allItemSources.sort((a, b) => b.score - a.score);
      const winnersQuantity = Math.min(
        SCORE_TABLE_LIMIT,
        allItemSources.length
      );
      for (let i = 0; i < winnersQuantity; i++) {
        const item = new ScoreItem(allItemSources[i]);
        list.appendChild(item.element);
        const horizontalLine = new ScoreItem(allItemSources[i]);
        horizontalLine.element.innerHTML =
          '<hr class="score-item__break-line">';
        horizontalLine.element.className = 'score-item_break';
        list.appendChild(horizontalLine.element);
      }
    }
    DataBase.getAllFromDB(
      DATABASES.users.name,
      DATABASES.users.keyPath,
      addItemSourceFromUserData
    );
  }
}
