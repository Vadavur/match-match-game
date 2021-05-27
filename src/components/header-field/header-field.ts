import './header-field.scss';
import { BaseComponent } from '../shared/base-component';
import { NavField } from '../nav-field/nav-field';
import { HeaderControlPanel } from '../header-control-panel/header-control-panel';

export class HeaderField extends BaseComponent {
  private readonly navField: NavField;

  MAIN_LOGO_URL = 'src/assets/images/match-match-logo.png';

  constructor() {
    super('div', ['header-field']);

    this.navField = new NavField();

    this.element.innerHTML = `
      <img
        src="src/assets/images/match-match-logo.png"
        alt="Match-match logo"
        class="header-field__img"
      >
    `;

    this.element.appendChild(this.navField.element);
    this.element.appendChild(HeaderControlPanel.controlElement);
    HeaderControlPanel.toggleControlPanel();
  }
}
