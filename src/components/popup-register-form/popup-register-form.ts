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
  FORBIDDEN_NAME_SYMBOLS_REGEXP,
  CORRECT_EMAIL_NAME_REGEXP,
} from '../shared/constants';
import { UserDataHandler } from '../shared/user-data-handler';

interface InputAttributesInterface {
  [type: string]: string | PopupInput;
}

export class PopupRegisterForm extends BaseComponent {
  private readonly inputsAttributes: InputAttributesInterface[];

  private readonly formName: string;

  private userDataHandler?: UserDataHandler;

  private addUserButton?: Button;

  private cancelButton?: Button;

  constructor(name: string) {
    super('form', ['popup-register-form']);

    this.formName = name;
    this.inputsAttributes = REGISTER_FORM_INPUTS_ATTRIBUTES;
    this.element.setAttribute('name', name);
    this.setPopupInputs();
    this.setButtons();
  }

  private setButtons() {
    this.addUserButton = new Button(
      ['button_add-user'],
      'add user'.toUpperCase(),
      (event: Event) => this.submitUserData(event)
    );
    this.addUserButton.element.setAttribute('type', 'submit');
    this.addUserButton.element.setAttribute('disabled', '');

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

  private setPopupInputs() {
    this.inputsAttributes.forEach((input) => {
      input.instance = new PopupInput(
        input as {
          [type: string]: string;
        }
      );
      input.instance.element.addEventListener('blur', (event) =>
        this.checkValidity(event)
      );
      const newDiv = document.createElement('div');
      newDiv.classList.add('input-area');
      this.element.appendChild(newDiv);
      newDiv.appendChild(input.instance.element);
    });
  }

  private checkValidity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputArea = inputElement.parentElement;
    if (
      (inputElement.getAttribute('type') === 'text' &&
        (inputElement.value.length > 30 ||
          inputElement.value.length === 0 ||
          FORBIDDEN_NAME_SYMBOLS_REGEXP.test(inputElement.value))) ||
      (inputElement.getAttribute('type') === 'email' &&
        (inputElement.value.length < 5 || !inputElement.checkValidity()))
    ) {
      inputArea?.classList.remove('input-area_correct');
      inputArea?.classList.add('input-area_incorrect');
    } else {
      inputArea?.classList.remove('input-area_incorrect');
      inputArea?.classList.add('input-area_correct');
    }
    let allInputsAreValid = true;

    this.inputsAttributes.forEach((input) => {
      const checkedInput = (input.instance as PopupInput).element;
      const checkedInputArea = checkedInput.parentElement;
      if (
        !checkedInputArea?.classList.contains('input-area_correct') &&
        checkedInput.getAttribute('type') !== 'file'
      ) {
        allInputsAreValid = false;
      }
    });

    if (allInputsAreValid) {
      this.addUserButton?.element.removeAttribute('disabled');
    }
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
      document.querySelector(`.popup-field`)?.remove();
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
      avatar: 'defaultAvatar',
    };
    this.inputsAttributes.forEach((inputAttributes) => {
      if (inputAttributes.instance) {
        const input = (inputAttributes.instance as PopupInput).element;
        if (input.tagName === 'INPUT') {
          const inputElement = input as HTMLInputElement;
          const inputName: string = inputElement.name;
          if (inputElement.value && inputName in user) {
            user[inputName] = inputElement.value;
          }
        }
      }
    });
    this.userDataHandler = new UserDataHandler(user);
  }
}
