import './popup-register-form.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupInput } from '../popup-input/popup-input';
import { Button } from '../button/button';
import { removePopup } from '../shared/remove-popup';
import { putToDB } from '../shared/put-to-db';
import { getFromDB } from '../shared/get-from-db';
// import { getPopupFormData } from './get-popup-form-data';

export class PopupRegisterForm extends BaseComponent {
  private readonly popupInputs: {
    placeholder: string;
    instance?: PopupInput;
  }[];

  private readonly addUserButton: Button;

  private readonly cancelButton: Button;

  constructor() {
    super('div', ['popup-register-form']);

    this.popupInputs = [
      { placeholder: 'First Name' },
      { placeholder: 'Last Name' },
      { placeholder: 'E-mail' },
    ];

    this.setPopupInputs();

    function getData(): void {
      const newUser = {
        eMail: 'email',
        name: { first: 'fname', last: 'sname' },
      };
      putToDB(newUser);
      getFromDB('email', (a) => console.log(a));
    }

    this.addUserButton = new Button(
      ['button_add-user'],
      'add user'.toUpperCase(),
      () => getData()
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
