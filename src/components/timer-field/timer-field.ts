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

  public async countUp(proceedOnTimesUp: () => void): Promise<void> {
    let secondsPassed = 0;
    const myfunc = setInterval(() => {
      this.element.innerHTML = `${secondsPassed} seconds passed!`;
      secondsPassed++;
      if (secondsPassed <= 0) {
        clearInterval(myfunc);
        this.element.innerHTML = 'GO!!!';
        proceedOnTimesUp();
      }
    }, 1000);
  }
}
