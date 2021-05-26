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
    async function getData(): Promise<void> {
      const newUser = {
        email: 'email',
        firstName: 'fname',
        lastName: 'sname',
      };
      const DATABASE = 'users';
      await DataBase.putToDB(newUser, DATABASE).then(() =>
        DataBase.getFromDB('email', DATABASE, (a) => console.log(a, '??'))
      );
    }

    function sendInputValuesToDB(event: Event): void {
      event.preventDefault();
      const form = document.forms[0];
      const user: UserInterfase = { email: '', firstName: '', lastName: '' };
      Array.from(form.elements).forEach((element) => {
        if (element.tagName === 'INPUT') {
          const inputElement = element as HTMLInputElement;
          const inputName: string = inputElement.name;
          if (inputElement && inputElement.name in user) {
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
      this.element.appendChild(input.instance.element);
    });
  }

  isValid(): string {
    return this.formName; // plug
  }
}

// class PopUpRegisterForm {
//   constructor() {
//     alert('!!');
//     this.form = document.createElement("form");
//     this.form.style.cssText = `
//       text-align: center;
//     `;
//     this.animalSelectNamesArr = ["Alligator", "Panda", "Eagle", "Gorilla"];
//     this.animalSelectWidth = 470;
//     this.animalSelectHeight = 39;
//     this.animalSelectAdditionalStyle = `background-color: #dff5b0;`;
//     this.animalSelect = new SelectInput(
//       this.animalSelectNamesArr,
//       this.animalSelectWidth,
//       this.animalSelectHeight,
//       this.animalSelectAdditionalStyle
//     );
//     this.currencySelectNamesArr = ["USD", "EUR"];
//     this.currencySelectWidth = 159;
//     this.currencySelectHeight = 39;
//     this.currencySelectAdditionalStyle = `margin: 8px 0; display: inline-block;`;
//     this.currencySelect = new SelectInput(
//       this.currencySelectNamesArr,
//       this.currencySelectWidth,
//       this.currencySelectHeight,
//       this.currencySelectAdditionalStyle
//     );
//     this.amountInputAttributes = {
//       placeholder: "Amount",
//       type: "number",
//       min: "0",
//       max: "9999",
//       maxlength: "4",
//       required: "true",
//     };
//     this.amountInputWidth = 303;
//     this.amountInputHeight = 39;
//     this.amountInputAdditionalStyle = `margin: 8px 8px 0 0; display: inline-block;`;
//     this.amountInput = new AmountInput(
//       this.amountInputAttributes,
//       this.amountInputWidth,
//       this.amountInputHeight,
//       this.amountInputAdditionalStyle
//     );
//     this.textInputAttributes = {
//       placeholder: "Your text here",
//       maxlength: "280",
//     };
//     this.textInputWidth = 470;
//     this.textInputHeight = 85;
//     this.textInputAdditionalStyle = `margin-bottom: 20px; display: inline-block; resize: none;`;
//     this.textInput = new TextArea(
//       this.textInputAttributes,
//       this.textInputWidth,
//       this.textInputHeight,
//       this.textInputAdditionalStyle
//     );
//     this.nextButtonAttributes = {
//       class: "pop-up__next-button",
//       type: "button",
//       onclick: "return false",
//     };
//     this.nextButtonWidth = 168;
//     this.nextButtonHeight = 40;
//     this.nextButtonAdditionalStyle = `margin: 0 auto; display: inline-block;`;
//     this.nextButton = new PopUpSubmitButton(
//       this.nextButtonAttributes,
//       this.nextButtonWidth,
//       this.nextButtonHeight,
//       this.nextButtonAdditionalStyle
//     );
//     this.nextButton.button.textContent = "Next";
//     this.form.append(this.animalSelect.select);
//     this.form.append(this.amountInput.input);
//     this.form.append(this.currencySelect.select);
//     this.form.append(this.textInput.input);
//     this.form.append(this.nextButton.button);
//     this.nextButton.addOpenPopUpCardWindowEventListener();
//   }
// }
