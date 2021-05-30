import './card-panel.scss';
import img from '../../assets/images/card-back.png';
import { BaseComponent } from '../shared/base-component';

export class CardPanel extends BaseComponent {
  constructor(size: number, imageType: string, image: string) {
    super('div', ['card-panel']);
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
    this.element.innerHTML = `
      <div
        class="card-panel__back"
        style="background-image: url('./public/images/${imageType}/${image}.png')">
        </div>
        <div
        class="card-panel__front"
        style="background-image: url('${img}')">
        </div>
        `;
    this.element.addEventListener('click', () => this.toggleFlipState());
  }

  private toggleFlipState() {
    this.element.classList.toggle('flipped');
  }
}

// style="background-image: url('./${imageType}/${image}.png')">
