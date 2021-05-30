import './cards-field.scss';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { CardPanel } from '../card-panel/card-panel';
import {
  CARDS_FIELD_GAP,
  DATABASES,
  GAME_SETTINGS,
  GAME_DIFFICULTY_DEVIDER,
  CARDS_TYPE_QUANTITIES,
  CLASS_NAMES,
  CARD_PANELS_APPENDED_EVENT,
} from '../shared/constants';
import { GameSettingsInterface, IndexedDataType } from '../shared/interfaces';

interface MatrixSizeInterface {
  rows: number;
  columns: number;
}

export class CardsField extends BaseComponent {
  cardsPanels: CardPanel[] = [];

  constructor() {
    super('div', ['cards-field']);
    this.setGameField();
  }

  setGameField(): void {
    DataBase.getFromDB(
      GAME_SETTINGS.gameDifficulty.name,
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath,
      (gameDifficulty: IndexedDataType) =>
        this.putCardsOnField(gameDifficulty as GameSettingsInterface)
    );
  }

  putCardsOnField(gameDifficulty: GameSettingsInterface): void {
    const cardsFieldMatrixSize =
      CardsField.getCardsFieldMatrixSize(gameDifficulty);
    const cardsInGame = CardsField.getCardsQuantity(gameDifficulty);
    const cardPanelSize = this.getCardPanelSize(cardsFieldMatrixSize);
    this.setNewCardsFieldSize(cardsFieldMatrixSize, cardPanelSize);
    CardsField.setCards((cardsType) => {
      const imagesNames: string[] = CardsField.getImagesNames(
        cardsType,
        cardsInGame
      );
      imagesNames.forEach((imageName) => {
        const currentCardPanel = new CardPanel(
          cardPanelSize,
          cardsType.option,
          imageName
        );
        currentCardPanel.element.classList.add(CLASS_NAMES.flipped);
        this.cardsPanels.push(currentCardPanel);
        this.element.appendChild(currentCardPanel.element);
      });
      this.element.dispatchEvent(
        new Event(CARD_PANELS_APPENDED_EVENT, {
          bubbles: true,
        })
      );
    });
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

  static setCards(callback: (cardsType: GameSettingsInterface) => void): void {
    DataBase.getFromDB(
      GAME_SETTINGS.cardsType.name,
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath,
      (cardsType: IndexedDataType) =>
        callback(cardsType as GameSettingsInterface)
    );
  }

  static getImagesNames(
    cardsType: GameSettingsInterface,
    cardsInGame: number
  ): string[] {
    const currentTypeCardsAwailable = CARDS_TYPE_QUANTITIES[cardsType.option];
    const awailableImagesNames: string[] = [''];
    for (let i = 0; i < currentTypeCardsAwailable; i++) {
      awailableImagesNames[i] = `(${i + 1})`;
    }
    awailableImagesNames.sort(() => Math.random() - 0.5);
    const inGameImagesNames: string[] = [];
    for (let i = 0; i < cardsInGame / 2; i++) {
      inGameImagesNames.push(awailableImagesNames.pop() as string);
    }

    return inGameImagesNames
      .concat(inGameImagesNames)
      .sort(() => Math.random() - 0.5);
  }
}
