export function setImageAsBackGround(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const file = (inputElement.files as FileList)[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (readerEvent) => {
    inputElement.style.backgroundImage = `url(${readerEvent?.target?.result})`;
    const nextReader = new FileReader();
    nextReader.readAsBinaryString(file);
    nextReader.onload = (nextReaderEvent) => {
      inputElement.innerHTML = nextReaderEvent?.target?.result as string;
    };
  };
}

export function exportImageToString(
  inputElement: HTMLInputElement,
  setImageStringValue: (stringImage: string) => void
): void {
  const file = (inputElement.files as FileList)[0];
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (readerEvent) => {
    setImageStringValue(readerEvent?.target?.result as string);
  };
}
