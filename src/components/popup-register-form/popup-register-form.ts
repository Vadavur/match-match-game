import './popup-register-form.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupInput } from '../popup-input/popup-input';
import { Button } from '../button/button';
import { removePopup } from '../shared/remove-popup';
import { DataBase } from '../shared/data-base';
// import { getPopupFormData } from './get-popup-form-data';
import { UserInterface } from '../shared/user-interface';

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

  constructor(name: string) {
    super('form', ['popup-register-form']);

    this.formName = name;
    this.inputsAttributes = [
      { placeholder: 'First Name', name: 'firstName' },
      { placeholder: 'Last Name', name: 'lastName' },
      { placeholder: 'E-mail', name: 'email' },
    ];

    this.element.setAttribute('name', name);

    this.setPopupInputs();

    this.addUserButton = new Button(
      ['button_add-user'],
      'add user'.toUpperCase(),
      (event: Event) => this.sendInputValuesToDB(event)
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
    this.inputsAttributes.forEach((input) => {
      input.instance = new PopupInput(input.placeholder);
      input.instance.element.setAttribute('type', 'text');
      input.instance.element.setAttribute('name', input.name);
      this.element.appendChild(input.instance.element);
    });
  }

  isValid(): string {
    return this.formName; // plug
  }

  sendInputValuesToDB(event: Event): void {
    event.preventDefault();
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
    const USERS_DATABASE = 'users';
    DataBase.putToDB(user, USERS_DATABASE);
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
