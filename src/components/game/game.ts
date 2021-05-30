import { DataBase } from '../shared/data-base';
import {
  DATABASES,
  CARD_PANELS_APPENDED_EVENT,
  CLASS_NAMES,
  FLIPPED_STATE_TIMEOUT,
  TIMER_MESSAGES,
} from '../shared/constants';
import { TimerField } from '../timer-field/timer-field';
import { CardsField } from '../cards-field/cards-field';

export class Game {
  private readonly gameFieldElement: HTMLElement;

  private readonly timerField: TimerField;

  private readonly cardsField: CardsField;

  private firstFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private secondFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private readonly onLoadingTitle = TIMER_MESSAGES.loading;

  constructor(gameFieldElement: HTMLElement) {
    this.gameFieldElement = gameFieldElement;
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.timerField = new TimerField();
    this.cardsField = new CardsField();
    this.timerField.element.innerHTML = this.onLoadingTitle;
    this.gameFieldElement.appendChild(this.timerField.element);
    this.gameFieldElement.appendChild(this.cardsField.element);

    this.gameFieldElement.addEventListener(CARD_PANELS_APPENDED_EVENT, () => {
      this.startGame();
    });
  }

  private async startGame(): Promise<void> {
    this.flipAllCardsImagesUp();
    this.timerField.countDown(() => {
      this.flipAllCardsImagesDown();
      this.setCardsFlipping();
      this.timerField.countUp(() => {});
    });
  }

  private flipAllCardsImagesUp(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.classList.remove(CLASS_NAMES.flipped);
    });
  }

  private flipAllCardsImagesDown(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.classList.add(CLASS_NAMES.flipped);
    });
  }

  setCardsFlipping(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.addEventListener('click', () =>
        this.toggleFlipState(cardPanel.element)
      );
    });
  }

  private toggleFlipState(cardPanel: HTMLElement) {
    if (cardPanel.classList.contains(CLASS_NAMES.matched)) {
      return;
    }
    if (this.firstFlippedCard === null) {
      cardPanel.classList.remove(CLASS_NAMES.flipped);
      this.firstFlippedCard = cardPanel;
    } else if (
      this.secondFlippedCard === null &&
      this.firstFlippedCard !== cardPanel
    ) {
      cardPanel.classList.remove(CLASS_NAMES.flipped);
      this.secondFlippedCard = cardPanel;
      if (this.gotMatch()) {
        this.flippedCardsClassToggle(CLASS_NAMES.matched);
        this.resetFlippedCards();
      } else {
        this.flippedCardsClassToggle(CLASS_NAMES.wronglyMatched);
        setTimeout(() => {
          this.flippedCardsClassToggle(CLASS_NAMES.wronglyMatched);
          this.flipCardsBack();
        }, FLIPPED_STATE_TIMEOUT);
      }
    }
  }

  private flipCardsBack() {
    this.flippedCardsClassToggle(CLASS_NAMES.flipped);
    this.resetFlippedCards();
  }

  private flippedCardsClassToggle(className: string) {
    this.firstFlippedCard?.classList.toggle(className);
    this.secondFlippedCard?.classList.toggle(className);
  }

  private resetFlippedCards(): void {
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
  }

  private gotMatch(): boolean {
    if (this.firstFlippedCard?.innerHTML === this.secondFlippedCard?.innerHTML)
      return true;
    return false;
  }
}
