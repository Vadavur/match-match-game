import './about-field.scss';
import { BaseComponent } from '../shared/base-component';

export class AboutField extends BaseComponent {
  constructor() {
    super('div', ['about-field']);
    this.element.innerHTML = `
      <img
        src="src/assets/images/about-me-plug.png"
        alt=""
        class="about-field__plug-img"
      >
  `;
  }
}
