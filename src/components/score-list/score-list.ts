import './score-list.scss';
import { DataBase } from '../shared/data-base';
import { BaseComponent } from '../shared/base-component';
import { ScoreItem } from '../score-item/score-item';
import { UserInterface } from '../shared/user-interface';
import { ScoreItemInterface } from '../shared/score-item-interface';

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
        avatar: 'src/assets/images/avatar-default.png',
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        score: user.score || 0,
      };
      return newItemSource;
    }

    function addItemSourceFromUserData(users: UserInterface[]) {
      users.forEach((user) => {
        allItemSources.push(getItemSourceFromUserData(user));
      });
      allItemSources.forEach((itemSource) => {
        const item = new ScoreItem(itemSource);
        list.appendChild(item.element);
      });
    }
    DataBase.getAllFromDB('users', addItemSourceFromUserData);
  }
}
