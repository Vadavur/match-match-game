import './card-panel.scss';
import { BaseComponent } from '../shared/base-component';

export class CardPanel extends BaseComponent {
  constructor(size?: number) {
    super('div', ['card-panel']);
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
  }
}
