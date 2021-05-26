import './score-field.scss';
import { BaseComponent } from '../shared/base-component';
import { ScoreList } from '../score-list/score-list';

export class ScoreField extends BaseComponent {
  private readonly scoreList: ScoreList;

  constructor() {
    super('div', ['score-field']);
    this.element.innerHTML = `
    <p class="score-field__label">Best players</p>
    `;
    this.scoreList = new ScoreList();
    this.element.appendChild(this.scoreList.element);
  }
}
