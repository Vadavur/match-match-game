import './popup-input.scss';
import { BaseComponent } from '../shared/base-component';

export class PopupImageInput extends BaseComponent {
  constructor(placeHolder = '') {
    super('input', ['popup-input']);
    this.element.setAttribute('placeholder', placeHolder);
    this.element.setAttribute('type', 'file');
  }
}
