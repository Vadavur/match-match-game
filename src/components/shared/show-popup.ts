import { PopupField } from '../popup-field/popup-field';

export function showPopup(): void {
  document.body.appendChild(new PopupField().element);
}
