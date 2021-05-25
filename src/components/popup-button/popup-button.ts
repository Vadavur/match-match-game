import './header-button.scss';
import { BaseComponent } from '../shared/base-component';

export class HeaderButton extends BaseComponent {
  constructor(buttonText = '', buttonAction: () => void) {
    super('button', ['header-button']);
    this.element.innerHTML = buttonText.toUpperCase();
    // this.element.setAttribute('data-path', dataPath);
    this.element.addEventListener('click', buttonAction);
  }
}
