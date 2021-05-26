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
    const FORM_NAME = 'registerForm';
    this.popupRegisterForm = new PopupRegisterForm(FORM_NAME);
    this.element.appendChild(this.popupRegisterForm.element);
  }
}
