import './button.scss';
import { BaseComponent } from '../shared/base-component';

export class Button extends BaseComponent {
  constructor(
    styles: string[],
    buttonText = '',
    buttonAction: (event: Event) => void
  ) {
    super('button', styles);
    this.element.innerHTML = buttonText.toUpperCase();
    // this.element.setAttribute('data-path', dataPath);
    this.element.addEventListener('click', buttonAction);
  }
}
