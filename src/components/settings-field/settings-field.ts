import './settings-field.scss';
import { BaseComponent } from '../shared/base-component';
import { SelectInput } from '../select-input/select-input';
import { GAME_SETTINGS } from '../shared/constants';

export class SettingsField extends BaseComponent {
  private readonly gameDifficultySelectInputs: SelectInput[] = [];

  constructor() {
    super('div', ['settings-field']);
    GAME_SETTINGS.forEach((setting, index) => {
      this.gameDifficultySelectInputs.push(
        new SelectInput(
          setting.name,
          setting.options,
          SettingsField.setGameSetting
        )
      );
      this.element.appendChild(this.gameDifficultySelectInputs[index].element);
    });
  }

  public static setGameSetting() {}
}
