import './about-field.scss';
import aboutImageUrl from '../../assets/images/about-me-plug.png';
import { BaseComponent } from '../shared/base-component';

export class AboutField extends BaseComponent {
  constructor() {
    super('div', ['about-field']);
    this.element.innerHTML = `
      <img
        src="${aboutImageUrl}"
        alt=""
        class="about-field__plug-img"
      >
  `;
  }
}
