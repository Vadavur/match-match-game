import './score-item.scss';
import { BaseComponent } from '../shared/base-component';
import { ScoreItemInterface } from '../shared/interfaces';

export class ScoreItem extends BaseComponent {
  constructor(itemSource: ScoreItemInterface) {
    super('li', ['score-item']);
    this.element.innerHTML = `
      <img class="score-item__avatar" src="${itemSource.avatar}" alt="${itemSource.name}'s avatar">
      <p class="score-item__name">${itemSource.name}</p>
      <p class="score-item__email">${itemSource.email}</p>
      <p class="score-item__score">
        Score
        <span class="score-item__score_value">${itemSource.score}</span>
      </p>
    `;
  }
}
