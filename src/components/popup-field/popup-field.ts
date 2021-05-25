import './popup-field.scss';
import { BaseComponent } from '../shared/base-component';
import { removePopup } from '../shared/remove-popup';
import { PopupWindow } from '../popup-window/popup-window';

export class PopupField extends BaseComponent {
  private readonly popupWindow: PopupWindow;

  constructor() {
    super('div', ['popup-field']);

    this.popupWindow = new PopupWindow();
    this.element.appendChild(this.popupWindow.element);
    this.element.addEventListener('click', removePopup);
  }
}
