import './header-field.scss';
import mainLogoUrl from '../../assets/images/match-match-logo.png';
import { BaseComponent } from '../shared/base-component';
import { NavField } from '../nav-field/nav-field';
import { HeaderControlPanel } from '../header-control-panel/header-control-panel';
import { TOGGLE_CONTROL_PANEL_EVENT } from '../shared/constants';

export class HeaderField extends BaseComponent {
  private readonly navField: NavField;

  private readonly headerControlPanel: HeaderControlPanel;

  constructor() {
    super('div', ['header-field']);

    this.element.innerHTML = `
    <img
    src="${mainLogoUrl}"
    alt="Match-match logo"
        class="header-field__img"
        >
        `;

    this.navField = new NavField();
    this.headerControlPanel = new HeaderControlPanel();
    this.element.appendChild(this.navField.element);
    this.element.appendChild(this.headerControlPanel.element);
    this.headerControlPanel.toggleControlPanel();
    document.addEventListener(TOGGLE_CONTROL_PANEL_EVENT, () => {
      this.headerControlPanel.toggleControlPanel();
    });
  }
}
