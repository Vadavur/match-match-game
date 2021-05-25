import './nav-item.scss';
import { BaseComponent } from '../shared/base-component';

export class NavItem extends BaseComponent {
  constructor(imgSource = '', labelText = '', dataPath = '') {
    super('li', ['nav-item']);
    this.element.setAttribute('data-path', dataPath);
    this.element.innerHTML = `
      <img src="${imgSource}" alt="" class="nav-item__img">
      <p class="nav-item__label">${labelText}</p>
    `;
  }
}
