import './popup-input.scss';
import { BaseComponent } from '../shared/base-component';

export class PopupInput extends BaseComponent {
  constructor(attributes: { [type: string]: string }) {
    super('input', ['popup-input']);
    Object.entries(attributes).forEach((attr) => {
      this.element.setAttribute(attr[0], attr[1]);
    });
  }
}
