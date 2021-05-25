import './root-field.scss';
import { BaseComponent } from '../shared/base-component';

export class RootField extends BaseComponent {
  private static rootElement: HTMLElement;

  constructor() {
    super('div', ['root-field']);
    RootField.rootElement = this.element;
  }

  public static changeField(newField: BaseComponent): void {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(newField.element);
  }
}
