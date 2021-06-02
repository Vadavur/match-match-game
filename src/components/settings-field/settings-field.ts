import './settings-field.scss';
import { SelectInput } from '../select-input/select-input';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { GAME_SETTINGS, DATABASES } from '../shared/constants';

export class SettingsField extends BaseComponent {
  private readonly gameDifficultySelectInputs: SelectInput[] = [];

  constructor() {
    super('div', ['settings-field']);
    Object.entries(GAME_SETTINGS).forEach((setting, index) => {
      this.gameDifficultySelectInputs.push(
        new SelectInput(setting[1].name, setting[1].options, () => {
          this.setGameSettings();
        })
      );
      this.element.appendChild(this.gameDifficultySelectInputs[index].element);
    });
  }

  private setGameSettings() {
    this.gameDifficultySelectInputs.forEach((selectInput) => {
      const selectElement = selectInput.element as HTMLSelectElement;
      DataBase.putToDB(
        { name: selectElement.name, option: selectElement.value },
        DATABASES.gameSettings.name,
        DATABASES.gameSettings.keyPath
      );
    });
  }
}
