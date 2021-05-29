import './select-input.scss';
import { BaseComponent } from '../shared/base-component';

export class SelectInput extends BaseComponent {
  constructor(
    name: string,
    optionValues: string[],
    onChangeFunction: (event: Event) => void
  ) {
    super('select', ['select-input']);
    this.element.setAttribute('type', 'select');
    this.element.setAttribute('name', name);
    this.createOptions(optionValues);
    this.element.addEventListener('change', onChangeFunction);
  }

  createOptions(optionValues: string[]): void {
    optionValues.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerHTML = option;
      this.element.append(optionElement);
    });
  }
}
