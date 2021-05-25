import './header-field.scss';
import { BaseComponent } from '../shared/base-component';
import { PopupField } from '../popup-field/popup-field';
import { NavField } from '../nav-field/nav-field';
import { Button } from '../button/button';

export class HeaderField extends BaseComponent {
  private readonly navField: NavField;

  private readonly headerButton: Button;

  MAIN_LOGO_URL = 'src/assets/images/match-match-logo.png';

  constructor() {
    super('div', ['header-field']);

    const showPopup = (): void => {
      document.body.appendChild(new PopupField().element);
    };

    this.navField = new NavField();
    this.headerButton = new Button(
      ['button_register-new-player'],
      'register new player',
      showPopup
    );

    this.element.innerHTML = `
      <img
        src="src/assets/images/match-match-logo.png"
        alt="Match-match logo"
        class="header-field__img"
      >
    `;

    this.element.appendChild(this.navField.element);
    this.element.appendChild(this.headerButton.element);
  }
}
