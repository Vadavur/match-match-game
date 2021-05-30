import './cards-field.scss';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { CardPanel } from '../card-panel/card-panel';
import {
  CARDS_FIELD_GAP,
  DATABASES,
  GAME_SETTINGS,
  GAME_DIFFICULTY_DEVIDER,
} from '../shared/constants';
import { GameSettingsInterface, IndexedDataType } from '../shared/interfaces';

interface MatrixSizeInterface {
  rows: number;
  columns: number;
}

export class CardsField extends BaseComponent {
  private cardsFieldMatrixSize?: MatrixSizeInterface;

  private cardPanelSize?: number;

  private cardsQuantity?: number;

  constructor() {
    super('div', ['cards-field']);
    this.prepareGameField();
  }

  prepareGameField(): void {
    DataBase.getFromDB(
      GAME_SETTINGS.gameDifficulty.name,
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath,
      (gameDifficulty: IndexedDataType) =>
        this.putCardsOnField(gameDifficulty as GameSettingsInterface)
    );
  }

  static getCardsFieldMatrixSize(
    gameDifficulty: GameSettingsInterface
  ): MatrixSizeInterface {
    const gameFieldSize = gameDifficulty.option.split(GAME_DIFFICULTY_DEVIDER);
    return {
      rows: +gameFieldSize[0],
      columns: +gameFieldSize[1],
    };
  }

  static getCardsQuantity(gameDifficulty: GameSettingsInterface): number {
    const gameFieldSize = gameDifficulty.option.split(GAME_DIFFICULTY_DEVIDER);
    return +gameFieldSize[0] * +gameFieldSize[1];
  }

  getCardPanelSize(cardsFieldMatrixSize: MatrixSizeInterface): number {
    const cardsFieldWidth = this.element.clientWidth;
    const cardsInRow = cardsFieldMatrixSize.rows;
    const cardMinWidth =
      (cardsFieldWidth - (cardsInRow + 1) * CARDS_FIELD_GAP) / cardsInRow;

    const cardsFieldHeight = this.element.clientHeight;
    const cardsInColumn = cardsFieldMatrixSize.columns;
    const cardMinHeight =
      (cardsFieldHeight - (cardsInColumn + 1) * CARDS_FIELD_GAP) /
      cardsInColumn;
    return Math.min(cardMinWidth, cardMinHeight);
  }

  setNewCardsFieldSize(
    cardsFieldMatrixSize: MatrixSizeInterface,
    cardPanelSize: number
  ): void {
    const cardsInRow = cardsFieldMatrixSize.rows;
    const cardsInColumn = cardsFieldMatrixSize.columns;
    const cardsFieldNewWidth =
      cardPanelSize * cardsInRow + CARDS_FIELD_GAP * (cardsInRow + 1);
    const cardsFieldNewHeight =
      cardPanelSize * cardsInColumn + CARDS_FIELD_GAP * (cardsInColumn + 1);
    this.element.style.width = `${cardsFieldNewWidth + 10}px`;
    this.element.style.height = `${cardsFieldNewHeight + 10}px`;
  }

  putCardsOnField(gameDifficulty: GameSettingsInterface): void {
    this.cardsFieldMatrixSize =
      CardsField.getCardsFieldMatrixSize(gameDifficulty);
    this.cardsQuantity = CardsField.getCardsQuantity(gameDifficulty);
    this.cardPanelSize = this.getCardPanelSize(this.cardsFieldMatrixSize);
    this.setNewCardsFieldSize(this.cardsFieldMatrixSize, this.cardPanelSize);
    for (let i = 0; i < this.cardsQuantity; i++) {
      const cardPanel = new CardPanel(this.cardPanelSize, 'animals', '(2)');
      this.element.appendChild(cardPanel.element);
    }
  }
}
