import './popup-register-form.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupInput } from '../popup-input/popup-input';
import { Button } from '../button/button';
import { removePopup } from '../shared/remove-popup';
import { DataBase } from '../shared/data-base';
// import { getPopupFormData } from './get-popup-form-data';

interface PopupInputInterface {
  placeholder: string;
  name: string;
  instance?: PopupInput;
}

interface UserInterfase {
  [index: string]: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class PopupRegisterForm extends BaseComponent {
  private readonly popupInputs: PopupInputInterface[];

  private readonly addUserButton: Button;

  private readonly cancelButton: Button;

  private readonly formName: string;

  constructor(name: string) {
    super('form', ['popup-register-form']);

    this.formName = name;
    this.popupInputs = [
      { placeholder: 'First Name', name: 'firstName' },
      { placeholder: 'Last Name', name: 'lastName' },
      { placeholder: 'E-mail', name: 'email' },
    ];

    this.element.setAttribute('name', name);

    this.setPopupInputs();

    function sendInputValuesToDB(event: Event): void {
      event.preventDefault();
      const form = document.forms[0];
      const user: UserInterfase = { email: '', firstName: '', lastName: '' };
      Array.from(form.elements).forEach((element) => {
        if (element.tagName === 'INPUT') {
          const inputElement = element as HTMLInputElement;
          const inputName: string = inputElement.name;
          if (inputElement) {
            // && inputElement.name in user
            user[inputName] = inputElement.value;
          }
        }
      });
      const USERS_DATABASE = 'users';
      DataBase.putToDB(user, USERS_DATABASE);
    }

    this.addUserButton = new Button(
      ['button_add-user'],
      'add user'.toUpperCase(),
      (event: Event) => sendInputValuesToDB(event)
    );
    this.cancelButton = new Button(
      ['button_cancel'],
      'cancel'.toUpperCase(),
      () => removePopup
    );

    this.element.appendChild(this.addUserButton.element);
    this.element.appendChild(this.cancelButton.element);
  }

  setPopupInputs(): void {
    this.popupInputs.forEach((input) => {
      input.instance = new PopupInput(input.placeholder);
      input.instance.element.setAttribute('type', 'text');
      input.instance.element.setAttribute('name', input.name);
      this.element.appendChild(input.instance.element);
    });
  }

  isValid(): string {
    return this.formName; // plug
  }
}

// async function getData(): Promise<void> {
//   const newUser = {
//     email: 'email',
//     firstName: 'fname',
//     lastName: 'sname',
//   };
//   const DATABASE = 'users';
//   await DataBase.putToDB(newUser, DATABASE).then(() =>
//     DataBase.getFromDB('email', DATABASE, (a) => console.log(a, '??'))
//   );
// }
