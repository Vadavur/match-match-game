import './timer-field.scss';
import { BaseComponent } from '../shared/base-component';
import { SHOW_CARDS_SECONDS_PERIOD } from '../shared/constants';

export class TimerField extends BaseComponent {
  constructor() {
    super('div', ['timer-field']);
  }

  public async countDown(proceedOnTimesUp: () => void): Promise<void> {
    let timeLeft: number = SHOW_CARDS_SECONDS_PERIOD;
    const myfunc = setInterval(() => {
      this.element.innerHTML = `${timeLeft} seconds left!`;
      if (timeLeft <= 0) {
        clearInterval(myfunc);
        this.element.innerHTML = 'GO!!!';
        proceedOnTimesUp();
      }
      timeLeft--;
    }, 1000);
  }

  public async countUp(): Promise<void> {
    let secondsPassed = 0;
    const myfunc = setInterval(() => {
      if (this.element.innerHTML.length > 15) {
        clearInterval(myfunc);
      } else {
        this.element.innerHTML = `${secondsPassed}`;
        secondsPassed++;
      }
    }, 1000);
  }
}
