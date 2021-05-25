import './page-field.scss';
import { BaseComponent } from '../shared/base-component';
import { HeaderField } from '../header-field/header-field';
import { RootField } from '../root-field/root-field';

export class PageField extends BaseComponent {
  private readonly headerField: HeaderField;

  private readonly rootField: RootField;

  constructor() {
    super('div', ['page-field']);
    this.headerField = new HeaderField();
    this.rootField = new RootField();
    this.element.appendChild(this.headerField.element);
    this.element.appendChild(this.rootField.element);
  }
}
