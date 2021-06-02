import {
  CUSTOM_EVENTS,
  CARDS_CLASS_NAMES,
  FLIPPED_STATE_TIMEOUT,
  TIMER_MESSAGES,
} from '../shared/constants';
import { TimerField } from '../timer-field/timer-field';
import { CardsField } from '../cards-field/cards-field';
import { GameOverPopup } from '../game-over-popup/game-over-popup';

export class Game {
  private readonly gameFieldElement: HTMLElement;

  private readonly timerField: TimerField;

  private readonly cardsField: CardsField;

  private firstFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private secondFlippedCard: CardsField['cardsPanels'][0]['element'] | null;

  private finalScore = 0;

  private attempts = 0;

  private mismatches = 0;

  private cardsInGame?: number;

  constructor(gameFieldElement: HTMLElement) {
    this.gameFieldElement = gameFieldElement;
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.timerField = new TimerField();
    this.cardsField = new CardsField();
    this.timerField.element.innerHTML = TIMER_MESSAGES.loading;
    this.gameFieldElement.appendChild(this.timerField.element);
    this.gameFieldElement.appendChild(this.cardsField.element);
    this.gameFieldElement.addEventListener(
      CUSTOM_EVENTS.cardPanelsAppend,
      () => {
        this.cardsInGame = this.cardsField.cardsInGame as number;
        this.startGame();
      }
    );
  }

  private async startGame(): Promise<void> {
    this.flipAllCardsImagesUp();
    this.timerField.countDown(() => {
      this.flipAllCardsImagesDown();
      this.timerField.countUp();
      this.activateCardsField();
    });
  }

  private flipAllCardsImagesUp(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.classList.remove(CARDS_CLASS_NAMES.flipped);
    });
  }

  private flipAllCardsImagesDown(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.classList.add(CARDS_CLASS_NAMES.flipped);
    });
  }

  activateCardsField(): void {
    this.cardsField.cardsPanels.forEach((cardPanel) => {
      cardPanel.element.addEventListener('click', () =>
        this.handleCardClickAction(cardPanel.element)
      );
    });
  }

  private handleCardClickAction(card: HTMLElement) {
    if (card.classList.contains(CARDS_CLASS_NAMES.matched)) {
      return;
    }
    if (this.firstFlippedCard === null) {
      card.classList.remove(CARDS_CLASS_NAMES.flipped);
      this.firstFlippedCard = card;
    } else if (
      this.secondFlippedCard === null &&
      this.firstFlippedCard !== card
    ) {
      this.attempts++;
      this.compareFlippedCards(card);
    }
  }

  private compareFlippedCards(card: HTMLElement) {
    card.classList.remove(CARDS_CLASS_NAMES.flipped);
    this.secondFlippedCard = card;
    if (this.gotMatch()) {
      this.handleGameOnMatch();
    } else {
      this.handleGameOnMismatch();
    }
  }

  private handleGameOnMismatch() {
    this.mismatches++;
    this.flippedCardsClassToggle(CARDS_CLASS_NAMES.wronglyMatched);
    setTimeout(() => {
      this.flippedCardsClassToggle(CARDS_CLASS_NAMES.wronglyMatched);
      this.flipCardsBack();
    }, FLIPPED_STATE_TIMEOUT);
  }

  private handleGameOnMatch() {
    this.flippedCardsClassToggle(CARDS_CLASS_NAMES.matched);
    this.resetFlippedCards();
    (this.cardsInGame as number) -= 2;
    if (this.cardsInGame === 0) {
      this.finishGame();
    }
  }

  private finishGame() {
    this.calculateFinalScore();
    document.dispatchEvent(
      new CustomEvent(CUSTOM_EVENTS.newScoreAcquire, {
        detail: this.finalScore,
      })
    );
    const finalPopup = new GameOverPopup(this.finalScore);
    document.body.appendChild(finalPopup.element);
  }

  private calculateFinalScore() {
    const passedTime = Number(this.timerField.element.innerHTML);
    this.timerField.element.innerHTML = `You finished<br>in ${passedTime} seconds`;
    const calculatedScore =
      (this.attempts - this.mismatches) * 100 - passedTime * 10;
    this.finalScore = calculatedScore < 0 ? 0 : calculatedScore;
  }

  private flipCardsBack() {
    this.flippedCardsClassToggle(CARDS_CLASS_NAMES.flipped);
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
