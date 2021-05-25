export function getPopupFormData(event: Event): void {
  const elementToRemove: HTMLElement | null =
    document.querySelector(`.popup-field`);
  if (
    elementToRemove &&
    ((event.target as HTMLElement)?.classList.contains('popup-field') ||
      (event.target as HTMLElement)?.classList.contains('button_cancel'))
  ) {
    elementToRemove.remove();
  }
}
