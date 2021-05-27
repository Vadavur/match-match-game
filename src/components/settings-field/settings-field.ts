import './settings-field.scss';
import { SelectInput } from '../select-input/select-input';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { GAME_SETTINGS, DATABASES } from '../shared/constants';

export class SettingsField extends BaseComponent {
  private readonly gameDifficultySelectInputs: SelectInput[] = [];

  constructor() {
    super('div', ['settings-field']);
    GAME_SETTINGS.forEach((setting, index) => {
      this.gameDifficultySelectInputs.push(
        new SelectInput(
          setting.settingName,
          setting.options,
          SettingsField.setGameSetting
        )
      );
      this.element.appendChild(this.gameDifficultySelectInputs[index].element);
    });
  }

  private static setGameSetting(event: Event) {
    const eventElement = event.target as HTMLSelectElement;
    DataBase.putToDB(
      { settingName: eventElement.name, option: eventElement.value },
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath
    );
  }
}
