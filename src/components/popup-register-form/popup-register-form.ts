import './popup-register-form.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupInput } from '../popup-input/popup-input';
import { Button } from '../button/button';
import { removePopup } from '../shared/remove-popup';
import { UserInterface } from '../shared/interfaces';
import {
  REGISTER_FORM_INPUTS_ATTRIBUTES,
  CUSTOM_EVENTS,
  GAME_STATES,
} from '../shared/constants';
import { UserDataHandler } from '../shared/user-data-handler';

interface InputAttributesInterface {
  placeholder: string;
  name: string;
  instance?: PopupInput;
}

export class PopupRegisterForm extends BaseComponent {
  private readonly inputsAttributes: InputAttributesInterface[];

  private readonly addUserButton: Button;

  private readonly cancelButton: Button;

  private readonly formName: string;

  private userDataHandler?: UserDataHandler;

  constructor(name: string) {
    super('form', ['popup-register-form']);

    this.formName = name;
    this.inputsAttributes = REGISTER_FORM_INPUTS_ATTRIBUTES;
    this.element.setAttribute('name', name);
    this.setPopupInputs();

    this.addUserButton = new Button(
      ['button_add-user'],
      'add user'.toUpperCase(),
      (event: Event) => this.submitUserData(event)
    );
    this.cancelButton = new Button(
      ['button_cancel'],
      'cancel'.toUpperCase(),
      (event) => {
        event.preventDefault();
        removePopup(event);
      }
    );

    this.element.appendChild(this.addUserButton.element);
    this.element.appendChild(this.cancelButton.element);
  }

  setPopupInputs(): void {
    this.inputsAttributes.forEach((input) => {
      input.instance = new PopupInput(input.placeholder);
      input.instance.element.setAttribute('type', 'text');
      input.instance.element.setAttribute('name', input.name);
      this.element.appendChild(input.instance.element);
    });
  }

  isValid(): boolean {
    const a = 'plug';
    return !!this.formName; // plug
  }

  showNotValidError(): boolean {
    const a = 'plug';
    return !!this.formName; // plug
  }

  submitUserData(event: Event): void {
    event.preventDefault();
    if (this.isValid()) {
      this.sendInputValuesToDB();
      document.dispatchEvent(
        new CustomEvent(CUSTOM_EVENTS.gameStateChange, {
          detail: GAME_STATES.onStart,
        })
      );
      removePopup(event);
    } else {
      this.showNotValidError();
    }
  }

  sendInputValuesToDB(): void {
    const user: UserInterface = {
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: 'src/assets/images/avatar-default.png',
    };
    this.inputsAttributes.forEach((inputAttributes) => {
      if (inputAttributes.instance) {
        const input = inputAttributes.instance.element;
        if (input.tagName === 'INPUT') {
          const inputElement = input as HTMLInputElement;
          const inputName: string = inputElement.name;
          if (inputElement && inputElement.name in user) {
            user[inputName] = inputElement.value;
          }
        }
      }
    });
    this.userDataHandler = new UserDataHandler(user);
  }
}
