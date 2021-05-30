import { DataBase } from '../shared/data-base';
import {
  DATABASES,
  CARD_PANELS_APPENDED_EVENT,
  CLASS_NAMES,
  FLIPPED_STATE_TIMEOUT,
} from '../shared/constants';
import { TimerField } from '../timer-field/timer-field';
import { CardsField } from '../cards-field/cards-field';

export class Game {
  private readonly gameFieldElement: HTMLElement;

  private readonly timerField: TimerField;

  private readonly cardsField: CardsField;

  private firstFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private secondFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private readonly onDomLoadingTitle = 'LOADING...';

  constructor(gameFieldElement: HTMLElement) {
    this.gameFieldElement = gameFieldElement;
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.timerField = new TimerField();
    this.cardsField = new CardsField();
    this.timerField.element.innerHTML = this.onDomLoadingTitle;
    this.gameFieldElement.appendChild(this.timerField.element);
    this.gameFieldElement.appendChild(this.cardsField.element);
    this.timerField.element.innerHTML = 'GO!!!';
    this.setCardsFlipping();
    this.cardsField.element.onload = () => this.startGame();
  }

  setCardsFlipping(): void {
    this.gameFieldElement.addEventListener(CARD_PANELS_APPENDED_EVENT, () => {
      this.cardsField.cardsPanels.forEach((cardPanel) => {
        const flipToggle = () => this.toggleFlipState(cardPanel.element);
        cardPanel.element.addEventListener('click', flipToggle);
      });
    });
  }

  private startGame() {
    console.log(this.timerField.element.innerHTML);
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
        this.firstFlippedCard?.classList.add(CLASS_NAMES.matched);
        this.secondFlippedCard?.classList.add(CLASS_NAMES.matched);
        this.resetFlippedCards();
      } else {
        this.firstFlippedCard?.classList.add(CLASS_NAMES.wronglyMatched);
        this.secondFlippedCard?.classList.add(CLASS_NAMES.wronglyMatched);
        setTimeout(() => {
          this.firstFlippedCard?.classList.remove(CLASS_NAMES.wronglyMatched);
          this.secondFlippedCard?.classList.remove(CLASS_NAMES.wronglyMatched);
          this.flipCardsBack();
        }, FLIPPED_STATE_TIMEOUT);
      }
    }
  }

  private flipCardsBack() {
    this.firstFlippedCard?.classList.add(CLASS_NAMES.flipped);
    this.secondFlippedCard?.classList.add(CLASS_NAMES.flipped);
    this.resetFlippedCards();
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
