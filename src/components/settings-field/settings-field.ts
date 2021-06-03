import './settings-field.scss';
import { SelectInput } from '../select-input/select-input';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { GAME_SETTINGS, DATABASES } from '../shared/constants';

export class SettingsField extends BaseComponent {
  private readonly gameSettingsSelectInputs: SelectInput[] = [];

  constructor() {
    super('div', ['settings-field']);
    Object.entries(GAME_SETTINGS).forEach((setting, index) => {
      this.gameSettingsSelectInputs.push(
        new SelectInput(setting[1].name, setting[1].options, () => {
          this.setGameSettings();
        })
      );
      const settingTitle = document.createElement('p');
      settingTitle.innerHTML = setting[1].dataTitle;
      this.element.appendChild(settingTitle);
      this.element.appendChild(this.gameSettingsSelectInputs[index].element);
    });
  }

  private setGameSettings() {
    this.gameSettingsSelectInputs.forEach((selectInput) => {
      const selectElement = selectInput.element as HTMLSelectElement;
      DataBase.putToDB(
        { name: selectElement.name, option: selectElement.value },
        DATABASES.gameSettings.name,
        DATABASES.gameSettings.keyPath
      );
    });
  }
}
