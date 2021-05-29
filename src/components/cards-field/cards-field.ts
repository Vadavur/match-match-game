import './cards-field.scss';
import { BaseComponent } from '../shared/base-component';
import { DataBase } from '../shared/data-base';
import { CardPanel } from '../card-panel/card-panel';
import { cardsFieldGap, DATABASES, GAME_SETTINGS } from '../shared/constants';
import { GameSettingsInterface } from '../shared/interfaces';

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
    this.setCardsFieldMatrixSize();
  }

  setCardsFieldMatrixSize(): void {
    DataBase.getFromDB(
      GAME_SETTINGS.gameDifficulty.name,
      DATABASES.gameSettings.name,
      DATABASES.gameSettings.keyPath,
      (result) => {
        this.cardsFieldMatrixSize = {
          rows: +(result as GameSettingsInterface).option[0], // remove magic number later!!!
          columns: +(result as GameSettingsInterface).option[2], // remove magic number later!!!
        };
        this.cardsQuantity =
          this.cardsFieldMatrixSize.rows * this.cardsFieldMatrixSize.columns;
        this.setNewCardPanelAndCardsFieldSizes();
        if (this.cardPanelSize) {
          for (let i = 0; i < this.cardsQuantity; i++) {
            const cardPanel = new CardPanel(this.cardPanelSize);
            this.element.appendChild(cardPanel.element);
          }
        }
      }
    );
  }

  setNewCardPanelAndCardsFieldSizes(): void {
    if (this.cardsFieldMatrixSize) {
      const cardsFieldWidth = this.element.clientWidth;
      const cardsInRow = this.cardsFieldMatrixSize.rows;
      const cardMinWidth =
        (cardsFieldWidth - (cardsInRow + 1) * cardsFieldGap) / cardsInRow;

      const cardsFieldHeight = this.element.clientHeight;
      const cardsInColumn = this.cardsFieldMatrixSize.columns;
      const cardMinHeight =
        (cardsFieldHeight - (cardsInColumn + 1) * cardsFieldGap) /
        cardsInColumn;
      this.cardPanelSize = Math.min(cardMinWidth, cardMinHeight);

      const cardsFieldNewWidth =
        this.cardPanelSize * cardsInRow + cardsFieldGap * (cardsInRow + 1);
      const cardsFieldNewHeight =
        this.cardPanelSize * cardsInColumn +
        cardsFieldGap * (cardsInColumn + 1);
      this.element.style.width = `${cardsFieldNewWidth + 10}px`;
      this.element.style.height = `${cardsFieldNewHeight + 10}px`;
    }
  }
}
