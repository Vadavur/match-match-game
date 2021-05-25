import './popup-window.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupRegisterForm } from '../popup-register-form/popup-register-form';

export class PopupWindow extends BaseComponent {
  private readonly popupRegisterForm: PopupRegisterForm;

  constructor() {
    super('div', ['popup-window']);
    this.element.innerHTML = `
      <p class="popup-window__header">Register new Player</p>
    `;
    this.popupRegisterForm = new PopupRegisterForm();
    this.element.appendChild(this.popupRegisterForm.element);
  }
}
