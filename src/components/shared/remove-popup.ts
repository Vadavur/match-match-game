export function removePopup(event: Event): void {
  const elementToRemove: HTMLElement | null =
    document.querySelector(`.popup-field`);
  if (
    elementToRemove &&
    ((event.target as HTMLElement)?.classList.contains('popup-field') ||
      (event.target as HTMLElement)?.classList.contains('button_cancel') ||
      (event.target as HTMLElement)?.classList.contains('button_add-user'))
  ) {
    elementToRemove.remove();
  }
}
